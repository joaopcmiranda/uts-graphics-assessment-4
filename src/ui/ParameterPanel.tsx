import React, { useCallback, useState } from "react";
import _ from 'lodash';
import { Range } from "./components/Range.tsx";
import { Checkbox } from "./components/Checkbox.tsx";
import styles from "./ParameterPanel.module.scss";
import { LogarithmicRange } from "./components/LogarithmicRange.tsx";


export type Parameters = {
  paused: boolean;
  wireframe: boolean;

  xLength: number;
  zLength: number;

  density: number;
  heightMapDensity: number;
  heightScale: number;

  generationCount: number;

}

export const ParameterPanel = ({ initialParameters, onUpdateParameters: _onUpdateParameters }: {
  initialParameters: Parameters,
  onUpdateParameters: (newParams: Parameters) => void,
  onClear: () => void
}) => {
  const [parameters, setParameters] = useState<Parameters>(initialParameters);
  const onUpdateParameters = useCallback((newParams: Parameters) => {
    setParameters(newParams);
    _onUpdateParameters(newParams);
  }, [_onUpdateParameters]);

  const debouncedOnUpdateParameters = useCallback(_.debounce(onUpdateParameters, 500), [onUpdateParameters]);

  return (
    <div className={styles.parameterPanel}>
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
      <br />
      <Checkbox
        label="Wireframe"
        value={parameters.wireframe}
        onChange={(value) => {
          const newParams: Parameters = { ...parameters, wireframe: value }
          setParameters(newParams);
          onUpdateParameters(newParams)
        }} />
      <br />
      <h4>Height Map</h4>
      <Range
        label="X Length"
        min={1}
        max={2000}
        value={parameters.xLength}
        onChange={(value) => {
          const newParams: Parameters = { ...parameters, xLength: value }
          setParameters(newParams);
          debouncedOnUpdateParameters(newParams)
        }} />
      <br />
      <Range
        label="Z Length"
        min={1}
        max={2000}
        value={parameters.zLength}
        onChange={(value) => {
          const newParams: Parameters = { ...parameters, zLength: value }
          setParameters(newParams);
          debouncedOnUpdateParameters(newParams)
        }} />
      <br />
      <LogarithmicRange
        label="Density"
        min={0.1}
        max={100}
        scale={1000}
        precision={2}
        value={parameters.density}
        onChange={(value) => {
          const newParams: Parameters = { ...parameters, density: value }
          setParameters(newParams);
          debouncedOnUpdateParameters(newParams)
        }} />
      <br />
      <LogarithmicRange
        label="Height Map Density"
        min={0.1}
        max={100}
        scale={1000}
        precision={2}
        value={parameters.heightMapDensity}
        onChange={(value) => {
          const newParams: Parameters = { ...parameters, heightMapDensity: value }
          setParameters(newParams);
          debouncedOnUpdateParameters(newParams)
        }} />
      <br />
      <Range
        label="Height Scale"
        min={1}
        max={200}
        value={parameters.heightScale}
        onChange={(value) => {
          const newParams: Parameters = { ...parameters, heightScale: value }
          setParameters(newParams);
          debouncedOnUpdateParameters(newParams)
        }} />
      <br />
      <Range
        label="Generation Count"
        min={1}
        max={40}
        precision={0}
        value={parameters.generationCount}
        onChange={(value) => {
          const newParams: Parameters = { ...parameters, generationCount: value }
          setParameters(newParams);
          debouncedOnUpdateParameters(newParams)
        }} />
    </div>
  )
}


export const parametersDefaults: Parameters = {
  // Simulation
  paused: false,
  wireframe: false,

  // Height Map
  xLength: 100,
  zLength: 100,
  density: 10,
  heightMapDensity: 10,
  heightScale: 20,
  generationCount: 1

};
