import { GUI } from 'lil-gui'
import { _parameters, fields, Parameters } from "./parameters.ts";
import { Field, PrimitiveField } from "./Field.ts";

type OnUpdateParameters = (changes: Partial<Parameters>, parameters: Parameters, field: PrimitiveField | null) => void;

export const startUI = (onUpdateParameters?: OnUpdateParameters): Parameters => {

  const gui = new GUI();

  // build controls
  for (const key of Object.keys(fields) as (keyof Parameters)[]) {
    addControl<Parameters, typeof key>(gui, _parameters, key, fields[key], onUpdateParameters);
  }

  return _parameters;

}

const addControl = <T extends object, K extends keyof T>(gui: GUI, paramObject: T, key: K, field: Field<T, K>, onUpdateParameters?: OnUpdateParameters) => {
  switch (field.type) {
    case "boolean":
      return gui.add(paramObject, key.toString()).name(field.name).onChange(() => { onUpdateParameters?.({ [key]: paramObject[key] }, _parameters, field); });
    case "number":
      return gui.add(paramObject, key.toString(), field.min, field.max, field.step).name(field.name).onChange(() => { onUpdateParameters?.({ [key]: paramObject[key] }, _parameters, field); });
    case "select":
      return gui.add(paramObject, key.toString(), field.options).name(field.name).onChange(() => { onUpdateParameters?.({ [key]: paramObject[key] }, _parameters, field); });
    case "string":
      return gui.add(paramObject, key.toString()).name(field.name).onChange(() => { onUpdateParameters?.({ [key]: paramObject[key] }, _parameters, field); });
    case "color":
      return gui.addColor(paramObject, key.toString()).name(field.name).onChange(() => { onUpdateParameters?.({ [key]: paramObject[key] }, _parameters, field); });
    case "button":
      return gui.add(paramObject, key.toString()).name(field.name);
    case "folder":
      if (!field.children) { return; }
      const folder = gui.addFolder(field.name);
      const folderChildren = paramObject[key] as unknown as Record<keyof T[K], any>;
      for (const childKey of Object.keys(field.children) as (keyof typeof folderChildren)[]) {
        const childField = field.children[childKey] as Field<typeof folderChildren, typeof childKey> | undefined;
        if (childField !== undefined) {
          addControl(folder, folderChildren, childKey, childField, onUpdateParameters);
        }
      }
      return folder;
  }
}

