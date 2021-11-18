import { deserialize, DeviceType, ExposureApi, LoginResponse } from "@ericssonbroadcastservices/exposure-sdk";
import { DeviceGroup, WhiteLabelService, WLConfig } from "@ericssonbroadcastservices/whitelabel-sdk";
import React, { Dispatch, useContext, useEffect, useReducer, useMemo } from "react";
import { QueryClientProvider } from "react-query";
import { useFetchConfig } from ".";
import { queryClient } from "./util/react-query";
import { StorageKey } from "./util/storageKeys";
export interface IStorage {
  getItem: (key: string) => Promise<string | null>;
  removeItem: (key: string) => Promise<void>;
  setItem: (key: string, value: any) => Promise<void>;
}
export interface IDevice {
  deviceId: string;
  name: string;
  type: DeviceType;
}

export interface IRedBeeState {
  loading: string[];
  storage: IStorage | null;
  device: IDevice | null;
  session: LoginResponse | null;
  config: WLConfig | null;
  selectedLanguage: string | null;
  customer?: string;
  businessUnit?: string;
  origin?: string;
  exposureBaseUrl: string;
  internalApiUrl: string;
  deviceGroup: DeviceGroup;
  exposureApi: ExposureApi;
  whiteLabelApi: WhiteLabelService;
}

export enum ActionType {
  SET_CONFIG = "setConfig",
  SET_SESSION = "setSession",
  SET_SELECTED_LANGUAGE = "setSelectedLanguage",
  START_LOADING = "startLoading",
  STOP_LOADING = "stopLoading"
}

interface IAction {
  type: ActionType;
}

interface ISetConfigAction extends IAction {
  config: WLConfig;
}

interface ISetSessionAction extends IAction {
  session: LoginResponse | null;
}

interface ISetSelectedLanguageAction extends IAction {
  language: string;
}

interface ILoadingAction extends IAction {
  id: string;
}

type TAction = ISetConfigAction | ISetSessionAction | ISetSelectedLanguageAction | ILoadingAction;

const defaultExposureApi = new ExposureApi({ authHeader: () => undefined });

const defaultState: IRedBeeState = {
  loading: [],
  device: null,
  storage: null,
  session: null,
  config: null,
  selectedLanguage: null,
  exposureBaseUrl: "",
  internalApiUrl: "",
  deviceGroup: "" as DeviceGroup,
  // these default values will be directly overwritten when initialising the context. This is not very pretty, i know...
  whiteLabelApi: new WhiteLabelService({
    authHeader: () => undefined,
    exposureApi: defaultExposureApi,
    deviceGroup: DeviceGroup.TV
  }),
  exposureApi: defaultExposureApi
};

export const RedBeeContext = React.createContext<[IRedBeeState, Dispatch<TAction>]>([defaultState, () => ({})]);

function reducer(state: IRedBeeState, action: TAction): IRedBeeState {
  switch (action.type) {
    case ActionType.START_LOADING:
      return {
        ...state,
        loading: [...state.loading.filter(i => i !== (action as ILoadingAction).id), (action as ILoadingAction).id]
      };
    case ActionType.STOP_LOADING:
      return { ...state, loading: state.loading.filter(i => i !== (action as ILoadingAction).id) };
    case ActionType.SET_SELECTED_LANGUAGE:
      return { ...state, selectedLanguage: (action as ISetSelectedLanguageAction).language };
    case ActionType.SET_SESSION:
      const getAuthHeader = () => {
        if ((action as ISetSessionAction).session?.sessionToken) {
          return { Authorization: `Bearer ${(action as ISetSessionAction).session?.sessionToken}` };
        }
        return undefined;
      };
      const exposureApi = new ExposureApi({
        baseUrl: state.exposureBaseUrl,
        customer: state.customer,
        businessUnit: state.businessUnit,
        authHeader: getAuthHeader
      });
      return {
        ...state,
        session: (action as ISetSessionAction).session,
        // The only time we need to update the exposure api is when setting a new session
        exposureApi,
        whiteLabelApi: new WhiteLabelService({
          baseUrl: state.internalApiUrl,
          customer: state.customer,
          businessUnit: state.businessUnit,
          deviceGroup: state.deviceGroup,
          exposureApi,
          authHeader: getAuthHeader
        })
      };
    case ActionType.SET_CONFIG:
      const config = (action as ISetConfigAction).config;
      const { customer, businessUnit } = config;
      return {
        ...state,
        customer,
        businessUnit,
        config,
        selectedLanguage: state.selectedLanguage || config.systemConfig.defaultLocale
      };
    default:
      return state;
  }
}

function ChildrenRenderer({ children, autoFetchConfig }: { children?: React.ReactNode; autoFetchConfig: boolean }) {
  useFetchConfig(!autoFetchConfig);
  return <>{children}</>;
}

interface IRedBeeProvider {
  customer?: string;
  businessUnit?: string;
  origin?: string;
  exposureBaseUrl: string;
  internalApiUrl: string;
  children?: React.ReactNode;
  deviceGroup: DeviceGroup;
  storage?: IStorage;
  device: IDevice;
  autoFetchConfig?: boolean;
}

export function RedBeeProvider({
  children,
  customer,
  businessUnit,
  exposureBaseUrl,
  internalApiUrl,
  origin,
  deviceGroup,
  storage,
  device,
  autoFetchConfig = false
}: IRedBeeProvider) {
  if (!(customer && businessUnit) && !origin) {
    throw "Either customer and businessUnit or origin is required";
  }
  if (!exposureBaseUrl || !internalApiUrl || !deviceGroup || !device) {
    throw "Missing required prop in RedBeeProvider";
  }
  if (!storage) {
    console.warn("not providing a storage module means no data will be persisted between session");
  }
  const initialState = useMemo(() => {
    const exposureApi = new ExposureApi({
      customer,
      businessUnit,
      authHeader: () => undefined,
      baseUrl: exposureBaseUrl
    });
    return {
      ...initialState,
      loading: [],
      customer,
      businessUnit,
      origin,
      exposureBaseUrl,
      internalApiUrl,
      deviceGroup,
      storage: storage || null,
      device,
      exposureApi,
      whiteLabelApi: new WhiteLabelService({
        exposureApi,
        authHeader: () => undefined,
        deviceGroup,
        customer,
        businessUnit,
        baseUrl: internalApiUrl
      })
    };
  }, []);
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    async function initStorage() {
      if (!storage) return;
      const persistedSessionJSON = await storage.getItem(StorageKey.SESSION);
      const persistedSelectedLanguage = await storage.getItem(StorageKey.LOCALE);
      if (persistedSessionJSON) {
        const parsed = JSON.parse(persistedSessionJSON);
        dispatch({ type: ActionType.SET_SESSION, session: deserialize(LoginResponse, parsed) });
      }
      if (persistedSelectedLanguage) {
        dispatch({ type: ActionType.SET_SELECTED_LANGUAGE, language: persistedSelectedLanguage });
      }
    }
    initStorage();
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <RedBeeContext.Provider value={[state, dispatch]}>
        <ChildrenRenderer autoFetchConfig={autoFetchConfig}>{children}</ChildrenRenderer>
      </RedBeeContext.Provider>
    </QueryClientProvider>
  );
}

export function useRedBeeState(): IRedBeeState {
  const [state] = useContext(RedBeeContext);
  return state;
}

export function useRedBeeStateDispatch() {
  const [, dispatch] = useContext(RedBeeContext);
  return dispatch;
}
