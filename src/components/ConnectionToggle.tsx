import { useState } from "react";

export default function ConnectionToggle({ onToggle, defaultValue }: { onToggle: (connected: boolean) => void, defaultValue: boolean }) {
  const [connected, setConnected] = useState(defaultValue);

  const handleToggle = () => {
    setConnected(!connected);
    onToggle(connected);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <button
        onClick={handleToggle}
        className={`w-10 h-5 flex items-center rounded-full p-1 transition-colors duration-300
          ${connected ? "bg-green-500" : "bg-red-500"}
        `}
      >
        <div
          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300
            ${connected ? "translate-x-5" : "translate-x-0"}
          `}
        />
      </button>
      <p className="text-xs font-semibold text-white">
        {connected ? "Connected" : "Disconnected"}
      </p>
    </div>
  );
}
