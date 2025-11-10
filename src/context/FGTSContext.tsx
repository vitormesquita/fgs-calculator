import { createContext, useContext, useState } from "react";
import { FGTSInfo } from "../models";

type FGTSContextProps = {
  info: FGTSInfo;
  setInfo: (info: FGTSInfo) => void;
}

export const FGTSContext = createContext<FGTSContextProps | null>(null);

export const FGTSProvider = ({ children }: { children: React.ReactNode }) => {
  const [info, setInfo] = useState<FGTSInfo>({} as FGTSInfo);

  return (
    <FGTSContext.Provider value={{ info, setInfo }}>
      {children}
    </FGTSContext.Provider>
  );
};


export function useFGTS() {
  const ctx = useContext(FGTSContext);
  if (!ctx) {
    throw new Error('useFGTS precisa ser usado dentro de um FGTSProvider');
  }
  return ctx;
}