import {
  WhiteLabelService as AppService,
  DeviceGroup,
  EssentialAppData,
  GetEssentialAppDataByOriginOptions
} from "@ericssonbroadcastservices/app-sdk";
import { DeviceRegistration, ServiceContext } from "@ericssonbroadcastservices/rbm-ott-sdk";
import React, { Dispatch, useContext, useReducer } from "react";
import { QueryClientProvider } from "react-query";
import { queryClient } from "./util/react-query";
import { IStorage } from "./types/storage";
import { InitialPropsContext, InitialPropsProvider } from "./InitialPropsProvider";
import { Session } from "./Session";

export interface IRedBeeState {
  essentialAppData: EssentialAppData | null;
  loading: string[];
  storage: IStorage | null;
  deviceRegistration: Required<DeviceRegistration>;
  session: Session | null;
  selectedLanguage: string | null;
  customer: string;
  baseUrl: string;
  businessUnit: string;
  serviceContext: ServiceContext;
  appService: AppService;
  deviceGroup: DeviceGroup;
  unavailable: boolean;
}

export enum ActionType {
  SET_ESSENTIAL_APP_DATA = "setEssentialAppData",
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
  data: EssentialAppData;
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
      async function getAuthToken() {
        return session?.sessionToken;
      }
      const appService = new AppService({ ...ctx, deviceGroup: state.deviceGroup, getAuthToken });
      return {
        ...state,
        session: session && new Session(session),
        appService
      };
    }
    case ActionType.SET_ESSENTIAL_APP_DATA:
      const data = (action as ISetConfigAction).data;
      const {
        config: { customer, businessUnit }
      } = data;
      return {
        ...state,
        customer,
        businessUnit,
        essentialAppData: data,
        selectedLanguage: state.selectedLanguage || data.systemConfig.localization.defaultLocale
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

function ChildrenRenderer({ children }: { children?: React.ReactNode }) {
  return <>{children}</>;
}

interface IRedBeeProvider {
  baseUrl: string;
  customer?: string;
  businessUnit?: string;
  origin?: GetEssentialAppDataByOriginOptions;
  children?: React.ReactNode;
  deviceGroup: DeviceGroup;
  storage?: IStorage;
  deviceRegistration: Required<DeviceRegistration>;
  /** optionally pass in a sessionToken to restore a session created elsewhere */
  sessionToken?: string;
  /** Listen for any errors when initially verifying the session.
   * Should session validation fail for any unknown reason, for example network error, the apps should retry validation.
   * When this is triggered, the current session will not have been cleared from storage, but it will also not be passed to the RedBee state
   */
  onSessionValidationError?: (err: unknown) => void;
}

function RedBeeStateHolder({ children }: { children?: React.ReactNode }) {
  const initialState = useContext(InitialPropsContext);
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <QueryClientProvider client={queryClient}>
      <RedBeeContext.Provider value={[state, dispatch]}>
        <ChildrenRenderer>{children}</ChildrenRenderer>
      </RedBeeContext.Provider>
    </QueryClientProvider>
  );
}

export function RedBeeProvider({
  storage,
  customer,
  businessUnit,
  origin,
  deviceRegistration,
  deviceGroup,
  baseUrl,
  children,
  onSessionValidationError,
  sessionToken
}: IRedBeeProvider) {
  if ((!customer || !businessUnit) && !origin) {
    throw new Error("customer and businessUnit, or origin, are required");
  }
  if ((!baseUrl && !origin) || !deviceGroup || !deviceRegistration) {
    throw new Error(
      `Missing required prop in RedBeeProvider. You provided: baseUrl: ${baseUrl}, deviceGroup: ${deviceGroup}, deviceRegistration: ${deviceRegistration}`
    );
  }
  if (!storage) {
    console.warn("[RedBeeProvider] not providing a storage module means no data will be persisted between sessions");
  }
  return (
    <InitialPropsProvider
      storage={storage}
      customer={customer}
      businessUnit={businessUnit}
      origin={origin}
      deviceRegistration={deviceRegistration}
      deviceGroup={deviceGroup}
      baseUrl={baseUrl}
      onSessionValidationError={onSessionValidationError}
      sessionToken={sessionToken}
    >
      <RedBeeStateHolder>{children}</RedBeeStateHolder>
    </InitialPropsProvider>
  );
}
