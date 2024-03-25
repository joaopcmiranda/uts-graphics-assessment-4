import React, { ReactNode, useEffect } from "react";
import styles from "./Optional.module.scss";

type Props<ValueType> = {
  label?: string;
  value: ValueType | undefined;
  onChange: (value: ValueType | undefined) => void;
  content: (value: ValueType, onChange: (value: ValueType) => void) => ReactNode;
}

export const Optional = <ValueType extends any>({ label, value, onChange, content }: Props<ValueType>) => {
  const [selected, setSelected] = React.useState(value !== undefined);
  useEffect(() => {
    setSelected(value !== undefined);
  }, [value]);
  const [internalValue, setInternalValue] = React.useState(value);
  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  return (
    <div className={styles.optional}>
      <input type="checkbox" checked={selected} onChange={(event) => {
        setSelected(event.target.checked);
        if (!event.target.checked) {
          onChange(undefined);
        } else {
          onChange(internalValue);
        }
      }} />
      <label>{label}</label>
      {selected && content(internalValue as ValueType, (newValue) => {
        setInternalValue(newValue);
        onChange(newValue);
      })}
    </div>
  );
}
