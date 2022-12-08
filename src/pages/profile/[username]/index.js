import React, { useState } from "react";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  HStack,
  Icon,
  Text,
  VStack,
} from "@chakra-ui/react";
import DoctorMaster from "../../../models/DoctorMaster";
import dbConnect from "../../../utils/db";
import { IoMdMail } from "react-icons/io";
import { FaGlobeAsia } from "react-icons/fa";

const Profile = ({ data }) => {
  const [user, setUser] = useState(data);
  const { status } = useSession();
  const router = useRouter();

  if (status === "unauthenticated") {
    router.push("/signin");
  }
  return (
    <>
      {status === "authenticated" && (
        <Box flex="1">
          <Box width="100%" height="150px" bg="purple.700"></Box>
          <Box
            maxWidth={{ base: "lg", lg: "6xl" }}
            mx="auto"
            position="relative"
          >
            <Card
              width={{ lg: "6xl" }}
              position="absolute"
              top={-10}
              bg="white"
            >
              <CardBody>
                <Flex items="center" justify="start">
                  <Avatar
                    size="2xl"
                    position="absolute"
                    top={-20}
                    border="5px solid black"
                    borderColor="purple.700"
                    name={`${user.firstName} ${user.lastName}`}
                    src={`${user.profileImagePath}${user.profileImage}`}
                  ></Avatar>

                  <Button
                    position="absolute"
                    colorScheme="purple"
                    right={10}
                    onClick={() => router.push("/setting/profile")}
                  >
                    Edit Profile
                  </Button>
                  <VStack align="start" spacing="0">
                    <Text mt={12} fontSize="2xl">
                      {user?.firstName} {user?.lastName}
                    </Text>
                    <HStack>
                      <Icon as={IoMdMail} />
                      <Text>{user?.email}</Text>
                    </HStack>
                    <HStack>
                      <Icon as={FaGlobeAsia} />
                      <Text>{user?.websiteUrl}</Text>
                    </HStack>
                  </VStack>
                </Flex>

                <Box mt={2}>
                  <VStack align="start">
                    <Text fontSize="14pt">About</Text>
                    <Text align="justify">{user?.bio}</Text>
                  </VStack>
                </Box>
              </CardBody>
            </Card>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Profile;

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

  const response = await DoctorMaster.findOne({ username: session?.user.name });
  console.log(response);

  return {
    props: {
      data: JSON.parse(JSON.stringify(response)),
      session,
    },
  };
}
