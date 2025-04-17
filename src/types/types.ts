export type Sensor = {
    id: string;
    name: string;
    connected: boolean;
    unit: string;
    value: string;
  };
  
  export type SensorAction =
    | { type: "set_all"; payload: Sensor[] }
    | { type: "update"; payload: Sensor };

export interface WebsocketState {
  isConnecting: boolean;
  isConnected: boolean;
  isDisconnected: boolean;
}

export type WebsocketAction = 
  | { type: "connecting" }
  | { type: "connected" }
  | { type: "disconnected" };