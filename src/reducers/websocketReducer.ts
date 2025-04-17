import { WebsocketAction, WebsocketState } from "../types/types";

export function websocketReducer(state: WebsocketState, action: WebsocketAction): WebsocketState {
  switch (action.type) {
    case "connecting":
      return { ...state, isConnecting: true, isConnected: false, isDisconnected: false };

    case "connected":
      return { ...state, isConnected: true, isConnecting: false, isDisconnected: false };

    case "disconnected":
      return { ...state, isDisconnected: true, isConnected: false, isConnecting: false };

    default:
      return state;
  }
} 