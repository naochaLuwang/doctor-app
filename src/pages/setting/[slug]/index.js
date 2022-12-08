import { Box, Flex, Text } from "@chakra-ui/react";
import { getSession, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import DoctorMaster from "../../../models/DoctorMaster";
import dbConnect from "../../../utils/db";
import Account from "../../../components/Settings/Account";
import Profile from "../../../components/Settings/Profile";

const Setting = ({ data, usersResponse }) => {
  const [user, setUser] = useState(data);

  const [users, setUsers] = useState(usersResponse);

  const { status, data: session } = useSession();
  const router = useRouter();

  if (status === "unauthenticated") {
    router.push("/signin");
  }
  return (
    <>
      {status === "authenticated" && (
        <Box maxWidth="6xl" mx="auto" pt={8} height="90vh" overflow="hidden">
          <Text fontSize="2xl" fontWeight="bold">
            Settings for{" "}
            <span style={{ color: "blue.200" }}>{session?.user.name}</span>
          </Text>
          <Flex width="6xl">
            <Flex width="xs" direction="column" mt={3} pr={10}>
              <Link href="/setting/profile">
                <Box
                  _hover={{
                    bg: router.query.slug === "profile" ? "white" : "purple.50",
                  }}
                  _active={{ bg: "white" }}
                  py={2}
                  px={4}
                  rounded="lg"
                  bg={router.query.slug === "profile" ? "white" : "none"}
                >
                  <Text _hover={{ color: "purple.700" }}>Profile</Text>
                </Box>
              </Link>

              <Link href="/setting/account">
                <Box
                  _hover={{
                    bg: router.query.slug === "account" ? "white" : "purple.50",
                  }}
                  py={2}
                  px={4}
                  rounded="lg"
                  mt={1}
                  bg={router.query.slug === "account" ? "white" : "none"}
                >
                  <Text _hover={{ color: "purple.700" }}>Account</Text>
                </Box>
              </Link>
            </Flex>
            <Flex flex={1}>
              <Box
                width="100%"
                display="block"
                height="90vh"
                overflow="scroll"
                sx={{
                  "&::-webkit-scrollbar": {
                    display: "none",
                  },
                }}
              >
                {(() => {
                  switch (router.query.slug) {
                    case "profile":
                      return <Profile user={user} users={usersResponse} />;
                    case "account":
                      return <Account />;

                    default:
                      return null;
                  }
                })()}
              </Box>
            </Flex>
          </Flex>
        </Box>
      )}
    </>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/signin",
      },
    };
  }

  await dbConnect();

  const response = await DoctorMaster.findOne({ userName: session?.user.name });
  // console.log(response);

  const usersResponse = await DoctorMaster.find({
    userId: { $ne: response.userId },
  });
  console.log(usersResponse);

  return {
    props: {
      data: JSON.parse(JSON.stringify(response)),
      usersResponse: JSON.parse(JSON.stringify(usersResponse)),
      session,
    },
  };
}

export default Setting;
