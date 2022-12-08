import { getSession, useSession } from "next-auth/react";
import React, { useEffect } from "react";

import { useRouter } from "next/router";
import { useGlobalState } from "../components/Layout";
import { Text } from "@chakra-ui/react";

const Home = ({ article }) => {
  const { status, data: session } = useSession();

  const [active, setActive] = useGlobalState("active");
  const router = useRouter();

  console.log(article);

  useEffect(() => {
    setActive("Home");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (status === "loading") {
    return <Text>Loading ...</Text>;
  }

  if (status === "unauthenticated") {
    router.push("/signin");
  }

  return <>{status === "authenticated" && <div>Home</div>}</>;
};

// export async function getServerSideProps(context) {
//   const session = await getSession(context);
//   if (!session) {
//     return {
//       redirect: {
//         permanent: false,
//         destination: "/signin",
//       },
//     };
//   }

//   return {
//     props: {
//       session,
//     },
//   };
// }

export default Home;
