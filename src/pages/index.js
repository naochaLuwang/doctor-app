import { getSession, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";
import { useGlobalState } from "../components/Layout";
import { Box, HStack, Text } from "@chakra-ui/react";
import Clock from "react-live-clock";

const Home = ({ session }) => {
  const { status } = useSession();
  const [active, setActive] = useGlobalState("active");
  const [firstName, setFirstName] = useGlobalState("firstName");
  const [lastName, setLastName] = useGlobalState("lastName");
  const router = useRouter();

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

  return (
    <>
      {status === "authenticated" && (
        <Box py={2} px={4}>
          <HStack>
            <Text>
              Welcome, Dr. {firstName} {lastName}
            </Text>
            <Clock
              format={"HH:mm:ss"}
              ticking={true}
              timezone={"Asia/Kolkata"}
              noSsr={true}
            />
          </HStack>
        </Box>
      )}
    </>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  console.log(session);
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/signin",
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}

export default Home;
