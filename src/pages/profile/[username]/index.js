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
import { EditorContent } from "@tiptap/react";

import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import { Text as Texts } from "@tiptap/extension-text";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Bold from "@tiptap/extension-bold";
import Underline from "@tiptap/extension-underline";
import { Image as Images } from "@tiptap/extension-image";
import Typography from "@tiptap/extension-typography";

import TextAlign from "@tiptap/extension-text-align";

import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Youtube from "@tiptap/extension-youtube";

const Profile = ({ data }) => {
  const [user, setUser] = useState(data);
  const { status } = useSession();
  const router = useRouter();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Document,
      Paragraph,
      Texts,
      Images,
      Bold,
      Underline,
      TextAlign,
      BulletList,
      OrderedList,
      ListItem,
      Typography,
      Youtube.configure({
        controls: false,
      }),

      // add more extensions here
    ],

    content: user.bio,
    editable: false,
  });

  if (status === "unauthenticated") {
    router.push("/signin");
  }

  return (
    <>
      {status === "authenticated" && (
        <Box
          flex="1"
          overflowY="scroll"
          height="90vh"
          sx={{
            "&::-webkit-scrollbar": {
              width: "16px",
              borderRadius: "8px",
              backgroundColor: `rgba(0, 0, 0, 0.05)`,
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: `rgba(0, 0, 0, 0.05)`,
            },
          }}
        >
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
                    src={user.profileImage}
                  ></Avatar>

                  <Button
                    position="absolute"
                    colorScheme="purple"
                    right={10}
                    onClick={() => router.push("/setting/profile")}
                  >
                    Edit Profile
                  </Button>
                  <VStack align="start" spacing="0" pl={2}>
                    <Text mt={8} fontSize="2xl">
                      {user?.title} {user?.firstName} {user?.lastName}
                    </Text>
                    <Text fontSize="md">{user?.department}</Text>
                    <Text fontSize="md">{user?.designation}</Text>
                    <HStack mt={3}>
                      <Icon as={IoMdMail} />
                      <Text>{user?.email}</Text>
                    </HStack>
                    <HStack>
                      <Icon as={FaGlobeAsia} />
                      <Text>{user?.websiteUrl}</Text>
                    </HStack>
                  </VStack>
                </Flex>

                {/* <Box mt={2}>
                  <EditorContent editor={editor} />
                </Box> */}
                <Box
                  dangerouslySetInnerHTML={{
                    __html: user.bio,
                  }}
                ></Box>
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
