import { deserialize, DeviceType, LoginResponse } from "@ericssonbroadcastservices/exposure-sdk";
import { DeviceGroup, WLConfig } from "@ericssonbroadcastservices/whitelabel-sdk";
import React, { Dispatch, useContext, useEffect, useReducer } from "react";
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

interface IRedBeeState {
  storage: IStorage | null;
  device: IDevice | null;
  session: LoginResponse | null;
  config: WLConfig | null;
  // TODO: locale should be allowed to be null. Not doable right now, since it's not allowed when fetching config.
  selectedLanguage: string;
  customer?: string;
  businessUnit?: string;
  origin?: string;
  exposureBaseUrl: string;
  internalApiUrl: string;
  deviceGroup: DeviceGroup;
}

export enum ActionType {
  SET_CONFIG = "setConfig",
  SET_SESSION = "setSession",
  SET_SELECTED_LANGUAGE = "setSelectedLanguage",
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

type TAction = ISetConfigAction | ISetSessionAction | ISetSelectedLanguageAction;

const initialState: IRedBeeState = {
  device: null,
  storage: null,
  session: null,
  config: null,
  selectedLanguage: "en",
  exposureBaseUrl: "",
  internalApiUrl: "",
  deviceGroup: "" as DeviceGroup,
};

export const RedBeeContext = React.createContext<[IRedBeeState, Dispatch<TAction>]>([initialState, () => ({})]);

function reducer(state: IRedBeeState, action: TAction): IRedBeeState {
  switch (action.type) {
    case ActionType.SET_SELECTED_LANGUAGE:
      return { ...state, selectedLanguage: (action as ISetSelectedLanguageAction).language };
    case ActionType.SET_SESSION:
      return { ...state, session: (action as ISetSessionAction).session };
    case ActionType.SET_CONFIG:
      const config = (action as ISetConfigAction).config;
      const { customer, businessUnit } = config;
      return { ...state, customer, businessUnit, config };
    default:
      return state;
  }
}

function ChildrenRenderer({ children, autoFetchConfig }: { children?: React.ReactNode, autoFetchConfig: boolean }) {
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
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    customer,
    businessUnit,
    origin,
    exposureBaseUrl,
    internalApiUrl,
    deviceGroup,
    storage: storage || null,
    device
  });
  useEffect(() => {
    async function initStorage() {
      if (!storage) return;
      const persistedSessionJSON = await storage.getItem(StorageKey.SESSION);
      if (persistedSessionJSON) {
        const parsed = JSON.parse(persistedSessionJSON);
        dispatch({ type: ActionType.SET_SESSION, session: deserialize(LoginResponse, parsed) });
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

export function useRedBeeStateDispatch() {
  const [, dispatch] = useContext(RedBeeContext);
  return dispatch;
}

export function useSelectedLanguage() {
  const [state] = useContext(RedBeeContext);
  return state.selectedLanguage;
}
