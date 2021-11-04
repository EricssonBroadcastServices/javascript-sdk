import { deserialize, DeviceType, LoginResponse } from "@ericssonbroadcastservices/exposure-sdk";
import { DeviceGroup, WLConfig } from "@ericssonbroadcastservices/whitelabel-sdk";
import React, { Dispatch, useContext, useEffect, useReducer } from "react";
import { QueryClientProvider } from "react-query";
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
  customer: string;
  businessUnit: string;
  baseUrl: string;
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
  customer: "",
  businessUnit: "",
  baseUrl: "",
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
      return { ...state, config: (action as ISetConfigAction).config };
    default:
      return state;
  }
}

interface IRedBeeProvider {
  customer: string;
  businessUnit: string;
  baseUrl: string;
  children: React.ReactNode;
  deviceGroup: DeviceGroup;
  storage?: IStorage;
  device: IDevice;
}

export function RedBeeProvider({
  children,
  customer,
  businessUnit,
  baseUrl,
  deviceGroup,
  storage,
  device
}: IRedBeeProvider) {
  if (!customer || !businessUnit || !baseUrl || !deviceGroup || !device) {
    throw "Missing required prop in RedBeeProvider";
  }
  if (!storage) {
    console.warn("not providing a storage module means no data will be persisted between session");
  }
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    customer,
    businessUnit,
    baseUrl,
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
      <RedBeeContext.Provider value={[state, dispatch]}>{children}</RedBeeContext.Provider>
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
