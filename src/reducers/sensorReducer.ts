import { Sensor, SensorAction } from "../types/types";

export function sensorReducer(state: Sensor[], action: SensorAction): Sensor[] {
  switch (action.type) {
    case "set_all":
      return action.payload;

    case "update": {
      const index = state.findIndex((s) => s.id === action.payload.id);
      if (index !== -1) {
        const updated = [...state];
        updated[index] = action.payload;
        return updated;
      }
      return [...state, action.payload];
    }

    default:
      return state;
  }
}
