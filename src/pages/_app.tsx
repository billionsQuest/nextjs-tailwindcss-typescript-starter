import Head from "next/head";
import { AppProps } from "next/app";
import "../styles/index.css";
import { AuthProvider } from "../context/AuthContext";
import { IndexContextProvider } from "../context/index.context";
import HeaderComponent from "../components/common/Header.common";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>NextJS TailwindCSS TypeScript Starter</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <AuthProvider>
        <IndexContextProvider>
          <>
            <ToastContainer />
            <HeaderComponent />
            <Component {...pageProps} />
          </>
        </IndexContextProvider>
      </AuthProvider>
    </>
  );
}

export default MyApp;
