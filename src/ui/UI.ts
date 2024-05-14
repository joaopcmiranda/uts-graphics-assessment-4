import { Controller, GUI } from 'lil-gui'
import { _parameters, Field, fields, Parameters } from "./parameters.ts";

export const startUI = (onUpdateParameters?: (changes: { [key in keyof Parameters]?: Parameters[key] }, parameters: Parameters) => void): Parameters => {

  // build folders
  const [root, folders]: [ { [key in keyof Parameters]?: Field }, Record<string,  { [key in keyof Parameters]?: Field }>] = Object.entries(fields)
    .reduce(([fields, folders], [key, field]) => {
    if (field.folder) {
      if (!folders[field.folder]) {
        folders[field.folder] = {};
      }
      folders[field.folder][key] = field;
    } else {
      fields[key] = field;
    }
    return [fields, folders];
  }, [{}, {}] as [Record<string, Field>, Record<string, Record<string, Field>>]);

  const gui = new GUI();

  // build controls
  for (const [key, field] of Object.entries(root) as [keyof Parameters, Field][] ) {
    addControl(gui, key, field, onUpdateParameters);
  }

  for (const [folder, fields] of Object.entries(folders)) {
    const folderGui = gui.addFolder(folder);
    for (const [key, field] of Object.entries(fields)as [keyof Parameters, Field][] ) {
      addControl(folderGui, key, field, onUpdateParameters);
    }
  }

  return _parameters;

}

const addControl = (gui: GUI, key: keyof Parameters, field: Field, onUpdateParameters?: (changes: { [key in keyof Parameters]?: Parameters[key] }, parameters: Parameters) => void): Controller => {
  switch (field.type) {
    case "boolean":
      return gui.add(_parameters, key).name(field.name).onChange(() => { onUpdateParameters?.({[key]: _parameters[key]}, _parameters); });
    case "number":
      return gui.add(_parameters, key, field.min, field.max, field.step).name(field.name).onChange(() => { onUpdateParameters?.({[key]: _parameters[key]}, _parameters); });
    case "select":
      return gui.add(_parameters, key, field.options).name(field.name).onChange(() => { onUpdateParameters?.({[key]: _parameters[key]}, _parameters); });
    case "string":
      return gui.add(_parameters, key).name(field.name).onChange(() => { onUpdateParameters?.({[key]: _parameters[key]}, _parameters); });
    case "color":
      return gui.addColor(_parameters, key).name(field.name).onChange(() => { onUpdateParameters?.({[key]: _parameters[key]}, _parameters); });
    case "button":
      return gui.add(_parameters, key).name(field.name);
  }
}

