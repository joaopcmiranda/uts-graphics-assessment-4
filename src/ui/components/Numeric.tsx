import React, { FC, useEffect } from "react";
import styles from './Input.module.scss';

type Props = {
  label?: string;
  value: number;
  onChange: (value: number) => void;
}

export const Numeric: FC<Props> = ({ label, value: overrideValue, onChange }) => {
  const [value, setValue] = React.useState((overrideValue ?? 0).toString());
  useEffect(() => {
    setValue((overrideValue ?? 0).toString());
  }, [overrideValue]);
  useEffect(() => {
    const parsed = Number.parseFloat(value);
    if (!isNaN(parsed) && parsed !== overrideValue) {
      onChange(parsed);
    }
  }, [value]);

  return (
    <div className={styles.input}>
      {label && <label>{label}</label>}
      <input type="number" value={value} onChange={(event) => setValue(event.target.value)} />
    </div>
  );
}
