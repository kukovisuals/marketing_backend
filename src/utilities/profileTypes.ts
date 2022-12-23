type ProfileDataType = {
  xs: string[];
  sm: string[];
  md: string[];
  lg: string[];
  xl: string[];
  "1x"?: string[] | null;
  "2x": string[];
  "3x": string[];
  "4x": string[];
};

type ProfileArr = {
  name: string;
  ref: string;
  sizes: ProfileDataType[];
};

export interface profileSchemaType {
  month: string;
  profiles: ProfileArr[];
}
