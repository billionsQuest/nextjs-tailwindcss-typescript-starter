import { FC, ReactElement, createContext, useContext, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

type TyIndex = {
  loading: boolean;
  handleLoading: (status: boolean) => void;
};

type TyIndexProvider = {
  children: JSX.Element;
};

const IndexContext = createContext<TyIndex | undefined>(undefined);

export const IndexContextProvider: FC<TyIndexProvider> = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const handleLoading = (status: boolean) => {
    setLoading(status);
  };
  return (
    <>
      <IndexContext.Provider value={{ handleLoading, loading }}>
        <>
          {loading && (
            <Box
              sx={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(255, 255, 255, 0.202)",
                backdropFilter: "blur(5px)",
                zIndex: (theme) => theme.zIndex.drawer + 1,
              }}
            >
              <CircularProgress />
            </Box>
          )}
          <> {children}</>
        </>
      </IndexContext.Provider>
    </>
  );
};

export const useIndexContext = () => {
  const context = useContext(IndexContext);
  if (!context) {
    throw new Error("useLottie must be used within a LottieProvider");
  }
  return context;
};
