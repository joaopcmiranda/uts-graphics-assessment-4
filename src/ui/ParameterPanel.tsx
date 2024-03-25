import React, { useCallback, useState } from "react";
import _ from 'lodash';
import { LogarithmicRange } from "./components/LogarithmicRange.tsx";
import { Range } from "./components/Range.tsx";
import { Select } from "./components/Select.tsx";
import { Vector3 } from "three";
import { Optional } from "./components/Optional.tsx";
import { Checkbox } from "./components/Checkbox.tsx";
import { Numeric } from "./components/Numeric.tsx";
import { Vector3Input } from "./components/Vector3Input.tsx";
import styles from "./ParameterPanel.module.scss";

export const limits = {
  particleSize: { min: 0.01, max: 1 },
  timeToLive: { min: 100, max: 100000 },
  transparency: { min: 0, max: 100 },
  emitter: {
    emissionFrequency: { min: 1, max: 2000 },
    burstDelay: { min: 0.01, max: 10 }
  }
}

export enum GravityDecayFactor {
  NONE ,
  LINEAR ,
  QUADRATIC ,
  CUBIC
}

export type Parameters = {
  // Simulation
  paused: boolean;
  wireframe: boolean;

  particleStartSize: number;
  randomStartSizeModifier?: number;
  particleEndSize?: number;
  randomEndSizeModifier?: number;

  timeToLive: number;
  randomTimeToLiveModifier?: number;

  randomStartColor: boolean;
  startColor?: string;
  randomEndColor: boolean;
  endColor?: string;

  startTransparency?: number;
  endTransparency?: number;

  // Movement
  velocity: Vector3;
  randomVelocityModifier?: Vector3;
  acceleration?: Vector3;
  gravity?: number;
  gravityCenter?: Vector3;
  gravityDecayFactor?: GravityDecayFactor;
  friction?: number;
  chaoticMovement: Vector3;


}

export const ParameterPanel = ({ initialParameters, onUpdateParameters: _onUpdateParameters, onClear }: {
  initialParameters: Parameters,
  onUpdateParameters: (newParams: Parameters) => void,
  onClear: () => void
}) => {
  const [parameters, setParameters] = useState<Parameters>(initialParameters);
  const [preset, setPreset] = useState<keyof typeof presets>("Custom");
  const onUpdateParameters = useCallback((newParams: Parameters, isPreset: boolean = false) => {
    if(!isPreset) setPreset("Custom")
    setParameters(newParams);
    _onUpdateParameters(newParams);
  }, [_onUpdateParameters]);

  const debouncedOnUpdateParameters = useCallback(_.debounce(onUpdateParameters, 500), [onUpdateParameters]);

  return (
    <div className={styles.parameterPanel}>
      <button onClick={onClear}>Clear Particles</button>
      <br />
      <Checkbox
        label="Paused"
        value={parameters.paused}
        onChange={(value) => {
          const newParams: Parameters = { ...parameters, paused: value }
          setParameters(newParams);
          onUpdateParameters(newParams)
        }}
      />
      <Select
        label="Preset"
        options={(Object.keys(presets).map((key) => ({ value: key, label: key })))}
        value={preset}
        onChange={(value) => {
          setPreset(value)
          const newParams = presets[value]
          setParameters(newParams);
          onUpdateParameters(newParams, true);
        }}
      />
      <h4>Particle</h4>
      <br/>
      <Checkbox
        label="Wireframe"
        value={parameters.wireframe}
        onChange={(value) => {
          const newParams: Parameters = { ...parameters, wireframe: value }
          setParameters(newParams);
          onUpdateParameters(newParams)
        }} />
      <br />
      <LogarithmicRange
        label="Size"
        min={limits.particleSize.min}
        max={limits.particleSize.max}
        scale={1000}
        precision={4}
        value={parameters.particleStartSize}
        onChange={(value) => {
          const newParams: Parameters = { ...parameters, particleStartSize: value }
          setParameters(newParams);
          debouncedOnUpdateParameters(newParams)
        }}
      />
      <br />
      <Optional
        label={"Random Size Modifier"}
        value={parameters.randomStartSizeModifier}
        onChange={(value) => {
          const newParams: Parameters = { ...parameters, randomStartSizeModifier: value }
          setParameters(newParams);
          debouncedOnUpdateParameters(newParams)
        }}
        content={(value, onChange) => (
          <Numeric value={value} onChange={onChange} />
        )}
      />
      <br />
      <Optional
        label={"End Size"}
        value={parameters.particleEndSize}
        onChange={(value) => {
          const newParams: Parameters = { ...parameters, particleEndSize: value }
          setParameters(newParams);
          debouncedOnUpdateParameters(newParams)
        }}
        content={(value, onChange) => (
          <Numeric value={value} onChange={onChange} />
        )} />
      <br />
      <Optional
        label={"Random End Size Modifier"}
        value={parameters.randomEndSizeModifier}
        onChange={(value) => {
          const newParams: Parameters = { ...parameters, randomEndSizeModifier: value }
          setParameters(newParams);
          debouncedOnUpdateParameters(newParams)
        }}
        content={(value, onChange) => (
          <Numeric value={value} onChange={onChange} />
        )} />
      <br />
      <LogarithmicRange
        label="Time to Live"
        min={limits.timeToLive.min}
        max={limits.timeToLive.max}
        scale={1000}
        value={parameters.timeToLive}
        onChange={(value) => {
          const newParams: Parameters = { ...parameters, timeToLive: value }
          setParameters(newParams);
          debouncedOnUpdateParameters(newParams)
        }} />
      <br />
      <Optional
        label={"Random Time to Live Modifier"}
        value={parameters.randomTimeToLiveModifier}
        onChange={(value) => {
          const newParams: Parameters = { ...parameters, randomTimeToLiveModifier: value }
          setParameters(newParams);
          debouncedOnUpdateParameters(newParams)
        }}
        content={(value, onChange) => (
          <Numeric value={value} onChange={onChange} />
        )} />
      <br />
      <Checkbox
        label="Random Start Color"
        value={parameters.randomStartColor}
        onChange={(value) => {
          const newParams: Parameters = { ...parameters, randomStartColor: value }
          setParameters(newParams);
          onUpdateParameters(newParams)
        }} />
      <br />
      {!parameters.randomStartColor && <>
          <Optional
              label={"Start Color"}
              value={parameters.startColor}
              onChange={(value) => {
                const newParams: Parameters = { ...parameters, startColor: value }
                setParameters(newParams);
                onUpdateParameters(newParams)
              }}
              content={(value, onChange) => (
                <input type="color" value={value} onChange={(event) => onChange(event.target.value)} />
              )} />
          <br />
      </>}
      <Optional
        label={"End Color"}
        value={parameters.endColor}
        onChange={(value) => {
          const newParams: Parameters = { ...parameters, endColor: value }
          setParameters(newParams);
          onUpdateParameters(newParams)
        }}
        content={(value, onChange) => (
          <input type="color" value={value} onChange={(event) => onChange(event.target.value)} />
        )} />
      <Checkbox
        label="Random End Color"
        value={parameters.randomEndColor}
        onChange={(value) => {
          const newParams: Parameters = { ...parameters, randomEndColor: value }
          setParameters(newParams);
          onUpdateParameters(newParams)
        }} />
      <br />
      <Optional
        label={"Start Transparency"}
        value={parameters.startTransparency}
        onChange={(value) => {
          const newParams: Parameters = { ...parameters, startTransparency: value }
          setParameters(newParams);
          onUpdateParameters(newParams)
        }}
        content={(value, onChange) => (
          <Range
            min={limits.transparency.min}
            max={limits.transparency.max}
            value={value}
            onChange={onChange}
          />
        )} />
      <br />
      <Optional
        label={"End Transparency"}
        value={parameters.endTransparency}
        onChange={(value) => {
          const newParams: Parameters = { ...parameters, endTransparency: value }
          setParameters(newParams);
          onUpdateParameters(newParams)
        }}
        content={(value, onChange) => (
          <Range
            min={limits.transparency.min}
            max={limits.transparency.max}
            value={value}
            onChange={onChange}
          />
        )} />
      <h4>Movement</h4>
      <Vector3Input
        label="Initial Velocity"
        value={parameters.velocity}
        onChange={(value) => {
          const newParams: Parameters = { ...parameters, velocity: value }
          setParameters(newParams);
          onUpdateParameters(newParams)
        }} />
      <br />
      <Optional
        label={"Random Initial Velocity Modifier"}
        value={parameters.randomVelocityModifier}
        onChange={(value) => {
          const newParams: Parameters = { ...parameters, randomVelocityModifier: value }
          setParameters(newParams);
          onUpdateParameters(newParams)
        }}
        content={(value, onChange) => (
          <Vector3Input value={value} onChange={onChange} />
        )} />
      <br />
      <Vector3Input
        label="Chaotic Movement"
        value={parameters.chaoticMovement}
        onChange={(value) => {
          const newParams: Parameters = { ...parameters, chaoticMovement: value }
          setParameters(newParams);
          onUpdateParameters(newParams)
        }} />
      <br />
      <Optional
        label={"Friction"}
        value={parameters.friction}
        onChange={(value) => {
          const newParams: Parameters = { ...parameters, friction: value }
          setParameters(newParams);
          onUpdateParameters(newParams)
        }}
        content={(value, onChange) => (
          <Numeric value={value} onChange={onChange} />
        )} />
      <br />
      <h4>Gravity</h4>
      <Optional
        label={"Gravity (to a point)"}
        value={parameters.gravity}
        onChange={(value) => {
          const newParams: Parameters = { ...parameters, gravity: value }
          setParameters(newParams);
          onUpdateParameters(newParams)
        }}
        content={(value, onChange) => (
          <Numeric value={value} onChange={onChange} />
        )} />
      <br />{
      !!parameters.gravity && <>
            <Vector3Input
                label="Gravity center"
                value={parameters.gravityCenter ?? new Vector3(0, 0, 0)}
                onChange={(value) => {
                  const newParams: Parameters = { ...parameters, gravityCenter: value }
                  setParameters(newParams);
                  onUpdateParameters(newParams)
                }} />
            <br />
            <Select
                label="Gravity decay factor"
                options={
                  Object.keys(GravityDecayFactor).filter((key)=> isNaN(Number(key))).map((key) => {
                    return { value: key, label: key }
                  })
                }
                value={parameters.gravityDecayFactor}
                onChange={(value) => {
                  const newParams: Parameters = { ...parameters, gravityDecayFactor: GravityDecayFactor[value] as unknown as GravityDecayFactor }
                  setParameters(newParams);
                  onUpdateParameters(newParams)
                }}
                isTabbed={true}
            />
            <br />
        </>
    }
      <Optional
        label={"Global gravity (homogeneous field)"}
        value={parameters.acceleration}
        onChange={(value) => {
          const newParams: Parameters = { ...parameters, acceleration: value }
          setParameters(newParams);
          onUpdateParameters(newParams)
        }}
        content={(value, onChange) => (
          <Vector3Input value={value} onChange={onChange} />
        )} />
      <br />
    </div>
  )
}


export const parametersDefaults: Parameters = {
  // Simulation
  paused: false,
  wireframe: false,

  // Particle
  particleStartSize: 0.1,
  randomStartSizeModifier: 0,
  particleEndSize: undefined,
  randomEndSizeModifier: 0,
  timeToLive: 300,
  randomTimeToLiveModifier: 0,
  randomStartColor: false,
  startColor: "#ffffff",
  randomEndColor: false,
  endColor: undefined,
  startTransparency: 100,
  endTransparency: 100,

  // Movement
  velocity: new Vector3(0, 0, 0),
  randomVelocityModifier: new Vector3(0, 0, 0),
  friction: 0,
  acceleration: new Vector3(0, 0, 0),
  chaoticMovement: new Vector3(0, 0, 0),
  gravity: 0,
  gravityDecayFactor: GravityDecayFactor.NONE,
  gravityCenter: new Vector3(0, 0, 0),
};

export const presets: { [key: string]: Parameters } = {
  "Custom": parametersDefaults,
  "Single Particle": {
    ...parametersDefaults,
    particleStartSize: 1,
    randomStartSizeModifier: 0.5,
    particleEndSize: 1,
    randomEndSizeModifier: 0.5,
    timeToLive: 5000,
    startColor: "#ffffff",
    endColor: "#ff0000",
    wireframe: true
  },
  "Fountain": {
    ...parametersDefaults,
    particleStartSize: 0.03,
    timeToLive: 3000,
    randomTimeToLiveModifier: 1000,
    startColor: "#00FFFF",
    endColor: "#00FFFF",
    startTransparency: 88,
    endTransparency: 74,
    velocity: new Vector3(0, 10, 0),
    randomVelocityModifier: new Vector3(8, 3, 0),
    chaoticMovement: new Vector3(1, 1, 1),
    friction: 1,
    acceleration: new Vector3(0, -4000, 0)
  },
  "Emitter Shape": {
    ...parametersDefaults,
    particleStartSize: 0.1,
    timeToLive: 500,
    startColor: "#ffffff",
    startTransparency: 100,
  },
  "Smoke Chimney": {
    ...parametersDefaults,
    particleStartSize: 0.1,
    randomStartSizeModifier: 0.05,
    particleEndSize: 0.1,
    randomEndSizeModifier: 0.05,
    timeToLive: 2000,
    startColor: "#808080",
    endColor: "#A9A9A9",
    startTransparency: 50,
    endTransparency: 0,
    velocity: new Vector3(0, 4, 0),
    randomVelocityModifier: new Vector3(2, 5, 3),
    chaoticMovement: new Vector3(2, 2, 2),
    friction: 1,
    acceleration: new Vector3(0, 2000, 0)
  },
}
