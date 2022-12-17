import { Box, Heading, Flex, Text, Card, CardBody } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import Login from "../components/Auth/Login";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const SignIn = () => {
  const { status } = useSession();
  const router = useRouter();

  if (status === "authenticated") {
    router.replace("/");
  }

  return (
    <>
      {status === "unauthenticated" && (
        <Flex width="100%" height="100vh" bg="gray.100">
          {/* left */}
          {/* <Box
            flex="1"
            bg="blue.500"
            display={{ base: "none", md: "inline-flex" }}
          ></Box> */}
          {/* right */}
          <Flex flex="1" align="center" justify="center" bg="white">
            <Card>
              <CardBody>
                <Flex
                  width="400px"
                  align="start"
                  justify="center"
                  direction="column"
                  p={{ base: "5", md: "none" }}
                >
                  {/* <Box>
            <Image 
          </Box> */}
                  <Flex
                    mb={4}
                    direction="column"
                    align={{ base: "center", md: "start" }}
                    width="full"
                  >
                    <Text fontSize="2em">Login</Text>
                    <Text fontSize="xs" color="gray.500">
                      Enter your credentials to access your account.
                    </Text>
                  </Flex>

                  <Login />
                </Flex>
              </CardBody>
            </Card>
          </Flex>
        </Flex>
      )}
    </>
  );
};

export default SignIn;
