import { Controller, GUI } from 'lil-gui';
import { fields, Parameters, Props } from "./parameters.ts";
import { Field, getDefaultValueFromFields, PrimitiveField } from "./Field.ts";

type OnUpdateParameters = (changes: Partial<Parameters>, parameters: Parameters, field: PrimitiveField | null) => void;
let _parameters: Parameters;
export const startUI = (props: Props, onUpdateParameters?: OnUpdateParameters): Parameters => {

  const gui = new GUI();

  const _fields = fields(props);

  _parameters = getDefaultValueFromFields(_fields);

  // build controls
  for (const key of Object.keys(_fields) as (keyof Parameters)[]) {
    addControl<Parameters, typeof key>(gui, _parameters, key, _fields[key], onUpdateParameters);
  }

  return _parameters;

}

const addControl = <T extends object, K extends keyof T>(gui: GUI, paramObject: T, key: K, field: Field<T, K>, onUpdateParameters?: OnUpdateParameters) => {
  switch (field.type) {
    case "boolean": {
      const controller = gui.add(paramObject, key.toString()).name(field.name);
      return setOnChange(controller, paramObject, key, field, onUpdateParameters);
    }
    case "number": {
      const controller = gui.add(paramObject, key.toString(), field.min, field.max, field.step).name(field.name);
      return setOnChange(controller, paramObject, key, field, onUpdateParameters);
    }
    case "select": {
      const controller = gui.add(paramObject, key.toString(), field.options).name(field.name);
      return setOnChange(controller, paramObject, key, field, onUpdateParameters);
    }
    case "string": {
      const controller = gui.add(paramObject, key.toString()).name(field.name);
      return setOnChange(controller, paramObject, key, field, onUpdateParameters);
    }
    case "color": {
      const controller = gui.addColor(paramObject, key.toString()).name(field.name);
      return setOnChange(controller, paramObject, key, field, onUpdateParameters);
    }
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

const setOnChange = <T extends object, K extends keyof T>(controller: Controller, paramObject: T, key: K, field: PrimitiveField, onUpdateParameters?: OnUpdateParameters) => {
  console.log(field);
  return field.slowUpdate ? controller.onFinishChange(() => { onUpdateParameters?.({ [key]: paramObject[key] }, _parameters, field); }) :
    controller.onChange(() => { onUpdateParameters?.({ [key]: paramObject[key] }, _parameters, field); });
}
