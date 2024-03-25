import React from "react";
import { FC } from "react";
import styles from './Optional.module.scss';

type Props = {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

export const Checkbox: FC<Props> = ({ label, value, onChange }) => {
  return (
    <div className={styles.optional}>
      <input type="checkbox" checked={value} onChange={(event) => onChange(event.target.checked)} />
      <label>{label}</label>
    </div>
  );
}
