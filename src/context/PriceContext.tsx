import React, { createContext, useContext, useState, useEffect } from "react";
import fetchPriceList from "../api/PriceApi";

interface PriceContextType {
  prices: any;
  isLoading: boolean;
  error: string | null;
}

const PriceContext = createContext<PriceContextType | undefined>(undefined);

export const PriceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [prices, setPrices] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPrices = async () => {
      try {
        const data = await fetchPriceList();
        // console.log("Global Price Data loaded:", data);
        setPrices(data);
      } catch (err: any) {
        setError(err.message || "Failed to load prices");
      } finally {
        setIsLoading(false);
      }
    };

    loadPrices();
  }, []);

  return (
    <PriceContext.Provider value={{ prices, isLoading, error }}>
      {children}
    </PriceContext.Provider>
  );
};

export const usePrice = () => {
  const context = useContext(PriceContext);
  if (context === undefined) {
    throw new Error("usePrice must be used within a PriceProvider");
  }
  return context;
};
