import React, { FC } from 'react';
import styles from "./Input.module.scss";

type Props = {
  label?: string;
  min: number;
  max: number;
  scale?: number;
  value: number;
  precision?: number;
  onChange: (value: number) => void;
};

export const Range: FC<Props> = ({ label, min, max, scale, value, onChange, precision }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseFloat(event.target.value);
    const precisionCorrectedValue = clampPrecision(scaleToValue(value), precision ?? 0);
    onChange(precisionCorrectedValue);
  };

  const scaleToValue = (scaleValue: number) => {
    if (scale === undefined) {
      return scaleValue;
    }
    return (scaleValue / scale) * (max - min);
  }

  const valueToScale = (value: number) => {
    if (scale === undefined) {
      return value;
    }
    return (value / (max - min)) * scale;
  }

  return (
    <div  className={styles.input}>
      {label && <label>{label}</label>}
      <input type="range"
             min={scale ? 0 : min}
             max={scale ? scale : max}
             step="any"
             value={valueToScale(value)}
             onChange={handleChange} />
      <input type="number" value={Number(value.toFixed(precision))}
             onChange={(event) => onChange(clampPrecision(Number.parseFloat(event.target.value), precision ?? 0))} min={min} max={max} />

    </div>
  );
}

const clampPrecision = (value: number, precision: number) => {
  if (value === undefined) return value;
  const factor = Math.pow(10, precision);
  return Math.round(value * factor) / factor;
}
