import React from "react";
import ReactSpeedometer from "react-d3-speedometer";
import { Sensor } from "../types/types";

type Props = {
  sensor: Sensor;
};

const getMaxValue = (name: string): number => {
  switch (name) {
    case "Temperature":
      return 50;
    case "Pressure":
      return 120;
    case "Humidity":
      return 100;
    case "PM2.5":
    case "PM10":
      return 100;
    case "Wind":
      return 20;
    default:
      return 100;
  }
};

const SensorGauge: React.FC<Props> = ({ sensor }) => {
  const maxValue = getMaxValue(sensor.name);
  const currentValue = parseFloat(sensor.value);

  if (!sensor.connected) {
    return (
      <div className="text-center text-gray-500 italic flex items-center justify-center h-[200px] md:h-[240px]" >
        {sensor.name} (disconnected)
      </div>
    );
  }

  return (<>
    <div className="w-full flex justify-center items-center">
      <div className="w-[240px] h-[170px] md:w-[300px] md:h-[200px]">
        <ReactSpeedometer
          value={currentValue}
          minValue={0}
          maxValue={maxValue}
          currentValueText={`${sensor.value} ${sensor.unit}`}
          needleColor="#ffffff"
          startColor="#22c55e"
          endColor="#ef4444"
          segments={3}
          height={200}
          ringWidth={20}
          needleHeightRatio={0.9}
          needleTransitionDuration={1000}
          fluidWidth={true}
          valueTextFontSize={'20px'}
          labelFontSize={'0'}
          textColor="#ffffff"
        />
      </div>
    </div>

    <div className="text-xl md:text-2xl font-semibold text-gray-300">{sensor.name}</div>
    </>
  );
};

export default SensorGauge;
