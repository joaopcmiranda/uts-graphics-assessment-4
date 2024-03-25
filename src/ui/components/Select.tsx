import React, { FC } from "react";
import styles from "./Select.module.scss";

type Props = {
  label: string;
  options: {
    label: string,
    value: any
  }[];
  value: any;
  onChange: (value: any) => void;
  isTabbed?: boolean;
}

export const Select: FC<Props> = ({ label, options, isTabbed, value, onChange }) => {
  return <div  className={styles.select}>
    <label>{label}</label>
    {
      isTabbed
        ? (<>
          <br />
          {(options.map((option, index) => {
            return (
              <button
                style={value.toString() === option.value.toString() ? { background: "#bbb", color: "#333" } : { background: "none" }}
                key={index}
                onClick={() => onChange(option.value)}>
                {option.label}
              </button>
            )
          }))}
        </>)
        : (
          <select value={value} onChange={(event) => onChange(event.target.value)}>
            {options.map((option, index) => {
              return (
                <option key={index} value={option.value}>{option.label}</option>
              )
            })}
          </select>
        )
    }
  </div>
}
