import { ChakraProvider, LightMode } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";

import theme from "../chakra/theme";
import Layout from "../components/Layout";

import Router from "next/router";

import NProgress from "nprogress";

import "nprogress/nprogress.css";
import TimeAgo from "javascript-time-ago";
//styles of nprogress

import en from "javascript-time-ago/locale/en.json";

TimeAgo.addDefaultLocale(en);

Router.events.on("routeChangeStart", () => NProgress.start());

Router.events.on("routeChangeComplete", () => NProgress.done());

Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <LightMode>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </LightMode>
      </ChakraProvider>
    </SessionProvider>
  );
}

export default MyApp;
