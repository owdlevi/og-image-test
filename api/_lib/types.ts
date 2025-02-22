export type FileType = "png" | "jpeg";
export type Theme = "light" | "dark";

export interface ParsedRequest {
  fileType: FileType;
  text: string;
  theme: Theme;
  md: boolean;
  fontSize: string;
  backgroundImage: string;
  logo: string;
  secondaryLogo: string;
  title: string;
  description: string;
}
