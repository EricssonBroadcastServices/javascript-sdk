import { ExposureApi as DeprecatedExposureApi } from "@ericssonbroadcastservices/exposure-sdk";
import {
  DeviceGroup as DeprecatedDeviceGroup,
  WhiteLabelService as DeprecatedWLService,
  WLConfig as DeprecatedWLConfig
} from "@ericssonbroadcastservices/whitelabel-sdk";
import { WhiteLabelService as AppService } from "@ericssonbroadcastservices/app-sdk";
import { DeviceRegistration, ServiceContext } from "@ericssonbroadcastservices/rbm-ott-sdk";
import React, { Dispatch, useContext, useReducer } from "react";
import { QueryClientProvider } from "react-query";
import { useFetchConfig } from "./hooks/useConfig";
import { queryClient } from "./util/react-query";
import { IStorage } from "./types/storage";
import { InitialPropsContext, InitialPropsProvider } from "./InitialPropsProvider";
import { Session } from "./Session";
export interface IRedBeeState {
  loading: string[];
  storage: IStorage | null;
  deviceRegistration: Required<DeviceRegistration>;
  session: Session | null;
  config: DeprecatedWLConfig | null;
  selectedLanguage: string | null;
  customer: string;
  baseUrl: string;
  businessUnit: string;
  serviceContext: ServiceContext;
  appService: AppService;
  deviceGroup: DeprecatedDeviceGroup;
  deprecatedExposureApi: DeprecatedExposureApi;
  deprecatedWhiteLabelApi: DeprecatedWLService;
  unavailable: boolean;
}

export enum ActionType {
  SET_CONFIG = "setConfig",
  SET_SESSION = "setSession",
  SET_SELECTED_LANGUAGE = "setSelectedLanguage",
  START_LOADING = "startLoading",
  STOP_LOADING = "stopLoading",
  SET_APP_UNAVAILABLE = "setUnavailable"
}

interface IAction {
  type: ActionType;
}

interface ISetConfigAction extends IAction {
  config: DeprecatedWLConfig;
}

interface ISetSessionAction extends IAction {
  session: Session | null;
}

interface ISetSelectedLanguageAction extends IAction {
  language: string;
}

interface ILoadingAction extends IAction {
  id: string;
}

type TAction = ISetConfigAction | ISetSessionAction | ISetSelectedLanguageAction | ILoadingAction | IAction;

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
    case ActionType.SET_SESSION: {
      const { session } = action as ISetSessionAction;
      const { customer, businessUnit, baseUrl } = state;
      const ctx = { baseUrl, customer, businessUnit };
      const appService = new AppService({
        ...ctx,
        deviceGroup: state.deviceGroup,
        async getAuthToken() {
          return session?.sessionToken;
        }
      });
      const deprecatedGetAuthHeader = () => {
        if (session?.sessionToken) {
          return { Authorization: `Bearer ${session?.sessionToken}` };
        }
        return undefined;
      };
      const deprecatedExposureApi = new DeprecatedExposureApi({ ...ctx, authHeader: deprecatedGetAuthHeader });
      const deprecatedWhiteLabelApi = new DeprecatedWLService({
        ...ctx,
        deviceGroup: state.deviceGroup,
        exposureApi: deprecatedExposureApi,
        authHeader: deprecatedGetAuthHeader
      });
      return {
        ...state,
        session: session && new Session(session),
        appService,
        // The only time we need to update the exposure api is when setting a new session
        deprecatedExposureApi,
        deprecatedWhiteLabelApi
      };
    }
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
    case ActionType.SET_APP_UNAVAILABLE:
      return {
        ...state,
        unavailable: true
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
  useFetchConfig(!autoFetchConfig);
  return <>{children}</>;
}

interface IRedBeeProvider {
  baseUrl: string;
  customer: string;
  businessUnit: string;
  children?: React.ReactNode;
  deviceGroup: DeprecatedDeviceGroup;
  storage?: IStorage;
  deviceRegistration: Required<DeviceRegistration>;
  autoFetchConfig?: boolean;
  /** Listen for any errors when initially verifying the session.
   * Should session validation fail for any unknown reason, for example network error, the apps should retry validation.
   * When this is triggered, the current session will not have been cleared from storage, but it will also not be passed to the RedBee state
   */
  onSessionValidationError?: (err: unknown) => void;
}

function RedBeeStateHolder({
  children,
  autoFetchConfig = false
}: {
  autoFetchConfig: boolean;
  children?: React.ReactNode;
}) {
  const initialState = useContext(InitialPropsContext);
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <QueryClientProvider client={queryClient}>
      <RedBeeContext.Provider value={[state, dispatch]}>
        <ChildrenRenderer autoFetchConfig={autoFetchConfig}>{children}</ChildrenRenderer>
      </RedBeeContext.Provider>
    </QueryClientProvider>
  );
}

export function RedBeeProvider({
  storage,
  customer,
  businessUnit,
  deviceRegistration,
  deviceGroup,
  baseUrl,
  children,
  autoFetchConfig,
  onSessionValidationError
}: IRedBeeProvider) {
  if (!customer || !businessUnit) {
    throw "customer and businessUnit are required";
  }
  if (!baseUrl || !deviceGroup || !deviceRegistration) {
    throw `Missing required prop in RedBeeProvider. You provided: baseUrl: ${baseUrl}, deviceGroup: ${deviceGroup}, deviceRegistration: ${deviceRegistration}`;
  }
  if (!storage) {
    console.warn("[RedBeeProvider] not providing a storage module means no data will be persisted between sessions");
  }
  return (
    <InitialPropsProvider
      storage={storage}
      customer={customer}
      businessUnit={businessUnit}
      deviceRegistration={deviceRegistration}
      deviceGroup={deviceGroup}
      baseUrl={baseUrl}
      onSessionValidationError={onSessionValidationError}
    >
      <RedBeeStateHolder autoFetchConfig={!!autoFetchConfig}>{children}</RedBeeStateHolder>
    </InitialPropsProvider>
  );
}
