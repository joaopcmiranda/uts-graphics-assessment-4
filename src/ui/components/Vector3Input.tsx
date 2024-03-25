import React, { FC, useEffect } from "react";
import { Vector3 } from "three";
import styles from "./Vector3Input.module.scss";

type Props = {
  label?: string;
  value: Vector3;
  onChange: (value: Vector3) => void;
}

export const Vector3Input: FC<Props> = ({ label, value: valueOverride, onChange }) => {
  const [[x, y, z], setValue] = React.useState([valueOverride.x.toString(), valueOverride.y.toString(), valueOverride.z.toString()]);
  useEffect(() => {
    setValue([valueOverride.x.toString(), valueOverride.y.toString(), valueOverride.z.toString()]);
  }, [valueOverride]);
  useEffect(() => {
    const parsedX = Number.parseFloat(x);
    const parsedY = Number.parseFloat(y);
    const parsedZ = Number.parseFloat(z);
    if (
      !isNaN(parsedX) && !isNaN(parsedY) && !isNaN(parsedZ)
      && (parsedX !== valueOverride.x || parsedY !== valueOverride.y || parsedZ !== valueOverride.z)) {
      onChange(new Vector3(parsedX, parsedY, parsedZ));
    }
  }, [x, y, z]);

  const setX = (_x: string) => setValue([_x, y, z]);
  const setY = (_y: string) => setValue([x, _y, z]);
  const setZ = (_z: string) => setValue([x, y, _z]);


  return (
    <div className={styles.vector3}>
      <label>{label}</label>
      <input type="number"
             value={x}
             onChange={(event) => setX(event.target.value)} />
      <input type="number"
             value={y}
             onChange={(event) => setY(event.target.value)} />
      <input type="number"
             value={z}
             onChange={(event) => setZ(event.target.value)} />
    </div>
  );
}
