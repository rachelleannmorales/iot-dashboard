import { useCallback, useEffect, useReducer, useRef } from "react";
import { sensorReducer } from "../reducers/sensorReducer";
import { websocketReducer } from "../reducers/websocketReducer";
import { WS_URL } from "../config";

const initialWebsocketState = {
  isConnecting: false,
  isConnected: false,
  isDisconnected: false
};

export function useWebSocket() {
  const [sensors, sensorDispatch] = useReducer(sensorReducer, []);
  const [wsState, wsDispatch] = useReducer(websocketReducer, initialWebsocketState);
  const socketRef = useRef<WebSocket | null>(null);

  const connect = useCallback(() => {
    console.log('Connecting to:', WS_URL);
    wsDispatch({ type: "connecting" });
    const socket = new WebSocket(WS_URL);
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("WebSocket connected to:", WS_URL);
      wsDispatch({ type: "connected" });
    };
  
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (Array.isArray(data)) {
        sensorDispatch({ type: "set_all", payload: data });
      } else {
        sensorDispatch({ type: "update", payload: data });
      }
    };

    socket.onclose = () => {
      console.log(`WebSocket disconnected, trying to reconnect to: ${WS_URL}`);
      wsDispatch({ type: "disconnected" });
      setTimeout(() => {
        if (socketRef.current?.readyState !== WebSocket.OPEN) {
          wsDispatch({ type: "connecting" });
          connect();
        }
      }, 1000);
    };
  
    socket.onerror = (err) => {
      console.error("WebSocket error:", err);
      wsDispatch({ type: "disconnected" });
    };

    return socket;
  }, []);

  useEffect(() => {
    const socket = connect();

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        console.log('Tab became active, checking connection...');
        if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) {
          wsDispatch({ type: "connecting" });
          console.log('Reconnecting...');
          connect();
        }
      }
    };

    const handleOnline = () => {
      console.log('Network connection restored, reconnecting...');
      wsDispatch({ type: "connecting" });
      connect();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('online', handleOnline);
  
    return () => {
      socket.close();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('online', handleOnline);
    };
  }, [connect]);
  
  const sendCommand = (command: "connect" | "disconnect", id: string) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      const message = JSON.stringify({ command, id });
      socketRef.current.send(message);
    } else {
      console.warn("WebSocket is not open. Can't send command.");
    }
  };

  return {
    sensors,
    sendCommand,
    wsState
  };
}

export default useWebSocket;
