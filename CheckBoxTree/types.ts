export interface MultiLevelOptions {
  id: string;
  label: string | JSX.Element;
  value: string | MultiLevelOptions[];
}

type FlatNodeValue = {
  id: string;
  label: string | JSX.Element;
  value: string | MultiLevelOptions[];
  parent?: MultiLevelOptions;
  isChecked?: boolean;
};

export interface CheckboxTreeStyles {
  selectAllContainer?: string;
  checkbox?: string;
  checkboxContainer?: string;
  label?: string;
  optionContainer?: string;
  subList?: string;
}

export type FlatNodes = {
  [key in string]: FlatNodeValue;
};

export interface ButtonOnClickEvent {
  (e: React.MouseEvent<HTMLInputElement>): void;
}
