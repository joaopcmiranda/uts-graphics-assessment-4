export type Field<T> = ({
  name: string
} & ({
  type: "boolean",
  default: boolean;
} | {
  type: "number",
  min?: number;
  max?: number;
  step?: number;
  default: number;
} | {
  type: "select",
  options: (string | number)[];
  default: string | number;
} | {
  type: "string",
  default: string;
} | {
  type: "color",
  default: string;
} | {
  type: "button",
  onClick: (parent: T) => void;
}));

export type Folder<O> = {
  name: string;
  type: "folder",
  children: { [key in keyof O]?: Field<O> | Folder<O[key]> };
}

export type GUIFields<T> = { [key in keyof T]: Field<T> | Folder<T[key]> };

export const getDefaultValueFromFields = <T extends Record<string, any>>(fieldsObject: { [key in keyof T]?: Field<T> | Folder<T[key]> }): T => {
  return Object.keys(fieldsObject).reduce((params, key) => {
    const field = fieldsObject[key as keyof T];
    if (field && field.type === 'folder' && field.children) {
      params[key] = getDefaultValueFromFields(field.children);
    } else if (field) {
      if (field.type !== "folder" && field.type !== "button") {params[key] = field.default;}
    }
    return params;
  }, {} as any);
}
