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
        <Flex width="100%" height="100vh" bg="red">
          {/* left */}
          {/* <Box
            flex="1"
            bg="blue.500"
            display={{ base: "none", md: "inline-flex" }}
          ></Box> */}
          {/* right */}
          <Flex flex="1" align="center" justify="center" bg="gray.100">
            <Card>
              <CardBody bg="white" rounded="lg" shadow="md">
                <Flex
                  width="400px"
                  align="start"
                  justify="center"
                  direction="column"
                  p={{ base: "5", md: "none" }}
                >
                  <Flex
                    width="100%"
                    align="center"
                    direction="column"
                    justify="center"
                    mt={-5}
                  >
                    <Box width="200px" height="200px" position="relative">
                      <Image
                        src={"/logojnb.png"}
                        layout="fill"
                        alt="logo"
                        objectFit="cover"
                      />
                    </Box>
                    <Text fontSize="lg" fontWeight="medium" mt={-10}>
                      Dr. JNB App
                    </Text>
                  </Flex>

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
