import { createContext, useContext, useEffect, useState } from "react";
import { FGTSInfo } from "../models";
import { getFGTSInfo } from "../storage/fgtsStorage";

type FGTSContextProps = {
  info: FGTSInfo;
  setInfo: (info: FGTSInfo) => void;
}

export const FGTSContext = createContext<FGTSContextProps | null>(null);

export const FGTSProvider = ({ children }: { children: React.ReactNode }) => {
  const [info, setInfo] = useState<FGTSInfo>({} as FGTSInfo);

  useEffect(() => {
    async function hydrate() {
      const saved = await getFGTSInfo();
      if (saved) setInfo(saved);
    }

    hydrate();
  }, []);

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