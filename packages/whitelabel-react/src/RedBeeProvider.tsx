import { IDeviceInfo, ExposureApi, LoginResponse } from "@ericssonbroadcastservices/exposure-sdk";
import { DeviceGroup, WhiteLabelService, WLConfig } from "@ericssonbroadcastservices/whitelabel-sdk";
import React, { Dispatch, useContext, useReducer, useMemo } from "react";
import { QueryClientProvider } from "react-query";
import { useFetchConfig } from "./hooks/useConfig";
import { queryClient } from "./util/react-query";
import { IStorage } from "./types/storage";
import { StorageContext, StorageProvider } from "./StorageProvider";
export interface IRedBeeState {
  loading: string[];
  storage: IStorage | null;
  device: IDeviceInfo;
  session: LoginResponse | null;
  config: WLConfig | null;
  selectedLanguage: string | null;
  customer: string;
  businessUnit: string;
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

// default state will be overwritten by proper values in RedBeeProvider, hence faulty values here.
export const RedBeeContext = React.createContext<[IRedBeeState, Dispatch<TAction>]>([{} as IRedBeeState, () => ({})]);

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

export function useRedBeeState(): IRedBeeState {
  const [state] = useContext(RedBeeContext);
  return state;
}

export function useRedBeeStateDispatch() {
  const [, dispatch] = useContext(RedBeeContext);
  return dispatch;
}

function ChildrenRenderer({ children, autoFetchConfig }: { children?: React.ReactNode; autoFetchConfig: boolean }) {
  // disable config fetching until storage has been initialised. This means we use the correct locale for the initial config call.
  useFetchConfig(!autoFetchConfig);
  return <>{children}</>;
}

interface IRedBeeProvider {
  customer?: string;
  businessUnit?: string;
  exposureBaseUrl: string;
  internalApiUrl: string;
  children?: React.ReactNode;
  deviceGroup: DeviceGroup;
  storage?: IStorage;
  device: IDeviceInfo;
  autoFetchConfig?: boolean;
}

function RedBeeStateHolder({
  children,
  customer,
  businessUnit,
  exposureBaseUrl,
  internalApiUrl,
  deviceGroup,
  storage,
  device,
  autoFetchConfig = false
}: IRedBeeProvider) {
  if (!customer || !businessUnit) {
    throw "customer and businessUnit are required";
  }
  if (!exposureBaseUrl || !internalApiUrl || !deviceGroup || !device) {
    throw `Missing required prop in RedBeeProvider. You provided: exposureBaseUrl: ${exposureBaseUrl}, internalApiUrl: ${internalApiUrl}, deviceGroup: ${deviceGroup}, device: ${device}`;
  }
  if (!storage) {
    console.warn("not providing a storage module means no data will be persisted between session");
  }
  const storageState = useContext(StorageContext);
  const initialState: IRedBeeState = useMemo(() => {
    const authHeader = () =>
      storageState.session ? { Authorization: `Bearer ${storageState.session.sessionToken}` } : undefined;
    const exposureApi = new ExposureApi({
      customer,
      businessUnit,
      authHeader,
      baseUrl: exposureBaseUrl
    });
    return {
      session: storageState.session,
      selectedLanguage: storageState.locale,
      config: null,
      loading: [],
      customer,
      businessUnit,
      exposureBaseUrl,
      internalApiUrl,
      deviceGroup,
      storage: storage || null,
      device,
      exposureApi,
      whiteLabelApi: new WhiteLabelService({
        exposureApi,
        authHeader,
        deviceGroup,
        customer,
        businessUnit,
        baseUrl: internalApiUrl
      })
    };
  }, []);
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <QueryClientProvider client={queryClient}>
      <RedBeeContext.Provider value={[state, dispatch]}>
        <ChildrenRenderer autoFetchConfig={autoFetchConfig}>{children}</ChildrenRenderer>
      </RedBeeContext.Provider>
    </QueryClientProvider>
  );
}

export function RedBeeProvider(props: IRedBeeProvider) {
  return (
    <StorageProvider storage={props.storage}>
      <RedBeeStateHolder {...props} />
    </StorageProvider>
  );
}
