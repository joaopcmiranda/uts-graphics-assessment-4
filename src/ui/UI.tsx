import React from "react"
import { createRoot } from "react-dom/client";
import { ParameterPanel } from "./ParameterPanel.tsx";
import { Parameters, parametersDefaults } from "../parameters.ts";

export const startUI = (onUpdateParameters: (parameters: Parameters) => void, onClear: ()=> void ) => {

  const root = createRoot(document.getElementById("ui")!);

  root.render(
    <ParameterPanel
      initialParameters={parametersDefaults}
      onUpdateParameters={onUpdateParameters}
      onClear={onClear}
    />
  );
}
