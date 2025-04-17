import { useState } from "react";
import { useWebSocket } from "../hooks/useWebsocket";
import { Sensor } from "../types/types";
import SensorGauge from "./SensorGauge";
import ConnectionToggle from "./ConnectionToggle";
import ReconnectingOverlay from "./ReconnectingOverlay";

export const Dashboard = () => {
  const { sensors, sendCommand, wsState } = useWebSocket();
  const [showConnectedOnly, setShowConnectedOnly] = useState(false);

  const filteredSensors = showConnectedOnly
    ? sensors.filter((s) => s.connected)
    : sensors;

  return (
    <> 
      <ReconnectingOverlay isReconnecting={wsState.isConnecting} />
      <div className="p-6">
        <h1 className="text-white text-2xl font-bold mb-4">IoT Sensor Dashboard</h1>

        <label className="text-[#e5e5e5] mb-4 block">
          <input
            type="checkbox"
            className="checkbox-input mr-2"
            checked={showConnectedOnly}
            onChange={(e) => setShowConnectedOnly(e.target.checked)}
          />
          Show connected only
        </label>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSensors.map((sensor: Sensor) => (
            <div
              key={sensor.id}
              className="bg-[#2d2d2d] border border-[#404040] rounded p-4 shadow"
            >
              <div className="flex justify-end">
                <ConnectionToggle
                  onToggle={(connected) =>
                    sendCommand(connected ? "disconnect" : "connect", sensor.id)
                  }
                  defaultValue={sensor.connected}
                />
              </div>
              <SensorGauge key={sensor.id} sensor={sensor} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
