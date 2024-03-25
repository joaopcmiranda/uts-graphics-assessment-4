import React from "react"
import { createRoot } from "react-dom/client";
import { ParameterPanel, Parameters, parametersDefaults } from "./ParameterPanel.tsx";

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
