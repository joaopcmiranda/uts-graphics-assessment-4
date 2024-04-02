import React, { useCallback, useState } from "react";
import _ from 'lodash';
import { Range } from "./components/Range.tsx";
import { Checkbox } from "./components/Checkbox.tsx";
import styles from "./ParameterPanel.module.scss";
import { LogarithmicRange } from "./components/LogarithmicRange.tsx";
import { Parameters, parametersLimits } from "../parameters.ts";


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
        {...parametersLimits.xLength}
        value={parameters.xLength}
        onChange={(value) => {
          const newParams: Parameters = { ...parameters, xLength: value }
          setParameters(newParams);
          debouncedOnUpdateParameters(newParams)
        }} />
      <br />
      <Range
        label="Z Length"
        value={parameters.zLength}
        {...parametersLimits.zLength}
        onChange={(value) => {
          const newParams: Parameters = { ...parameters, zLength: value }
          setParameters(newParams);
          debouncedOnUpdateParameters(newParams)
        }} />
      <br />
      <LogarithmicRange
        label="Poly Count"
        {...parametersLimits.polyCount}
        value={parameters.polyCount}
        onChange={(value) => {
          const newParams: Parameters = { ...parameters, polyCount: value }
          setParameters(newParams);
          debouncedOnUpdateParameters(newParams)
        }} />
      <br />
      <LogarithmicRange
        label="Hill Density"
        {...parametersLimits.hillDensity}
        value={parameters.hillDensity}
        onChange={(value) => {
          const newParams: Parameters = { ...parameters, hillDensity: value }
          setParameters(newParams);
          debouncedOnUpdateParameters(newParams)
        }} />
      <br />
      <Range
        label="Hill Scale"
        {...parametersLimits.hillScale}
        value={parameters.hillScale}
        onChange={(value) => {
          const newParams: Parameters = { ...parameters, hillScale: value }
          setParameters(newParams);
          debouncedOnUpdateParameters(newParams)
        }} />
      <br />
      <Range
        label="Roughness"
        {...parametersLimits.roughness}
        value={parameters.roughness}
        onChange={(value) => {
          const newParams: Parameters = { ...parameters, roughness: value }
          setParameters(newParams);
          debouncedOnUpdateParameters(newParams)
        }} />
    </div>
  )
}


