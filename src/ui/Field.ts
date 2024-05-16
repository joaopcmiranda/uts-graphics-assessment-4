export type PrimitiveField = ({
  name: string;
  requiresReset?: boolean;
  slowUpdate?: boolean;
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
}));

type ButtonField = {
  name: string;
  type: "button",
  onClick: () => void;
}

type Folder<O> = {
  name: string;
  type: "folder",
  children: { [key in keyof O]?: Field<O, key> };
}

export type Field<O, K extends keyof O> = PrimitiveField | ButtonField | Folder<O[K]>;

export type GUIFields<T> = { [key in keyof T]: PrimitiveField | Folder<T[key]> };

export const getDefaultValueFromFields = <T extends Record<string, any>>(fieldsObject: { [key in keyof T]?: Field<T, key> }): T => {
  return Object.keys(fieldsObject).reduce((params, key) => {
    const field = fieldsObject[key as keyof T];
    if (field && field.type === 'folder' && field.children) {
      params[key] = getDefaultValueFromFields(field.children);
    } else if (field) {
      if (field.type !== "folder" && field.type !== "button") {params[key] = field.default;}
      if (field.type === "button") {params[key] = field.onClick;}
    }
    return params;
  }, {} as any);
}
