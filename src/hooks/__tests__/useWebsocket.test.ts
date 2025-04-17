import '@testing-library/jest-dom';
import { renderHook, act } from '@testing-library/react';
import { useWebSocket } from '../useWebsocket';
import WS from 'jest-websocket-mock';

const WS_URL = 'ws://localhost:6060/ws';
jest.mock('../useWebsocket', () => {
  const originalModule = jest.requireActual('../useWebsocket');
  return {
    ...originalModule,
    WS_URL
  };
});

describe('useWebSocket', () => {
  let server: WS;

  beforeEach(() => {
    server = new WS(WS_URL);
  });

  afterEach(() => {
    WS.clean();
  });

  it('should connect to WebSocket server', async () => {
    const { result } = renderHook(() => useWebSocket());
    
    await server.connected;
    expect(result.current.wsState.isConnected).toBe(true);
    expect(result.current.wsState.isConnecting).toBe(false);
  });

  it('should handle sensor data updates', async () => {
    const { result } = renderHook(() => useWebSocket());
    await server.connected;

    const testData = { id: '1', name: 'Temperature', value: '25.5', unit: '°C', connected: true };
    
    act(() => {
      server.send(JSON.stringify(testData));
    });

    expect(result.current.sensors).toContainEqual(testData);
  });

  it('should handle disconnection', async () => {
    const { result } = renderHook(() => useWebSocket());
    await server.connected;

    act(() => {
      server.close();
    });

    expect(result.current.wsState.isDisconnected).toBe(true);
    expect(result.current.wsState.isConnected).toBe(false);
  });
}); 