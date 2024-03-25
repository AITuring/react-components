import { createContext } from "react";

export interface LocaleContextProps {
  locale: string;
}

export const LocaleContext = createContext<LocaleContextProps>({ locale: "zh-CN" });
