import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import Bold from "@tiptap/extension-bold";
import BulletList from "@tiptap/extension-bullet-list";
import Document from "@tiptap/extension-document";
import Focus from "@tiptap/extension-focus";
import Heading from "@tiptap/extension-heading";
import { Image as Images } from "@tiptap/extension-image";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import Paragraph from "@tiptap/extension-paragraph";
import Placeholder from "@tiptap/extension-placeholder";
import Texts from "@tiptap/extension-text";
import TextAlign from "@tiptap/extension-text-align";
import Typography from "@tiptap/extension-typography";
import Underline from "@tiptap/extension-underline";
import Youtube from "@tiptap/extension-youtube";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import axios from "axios";
import { useS3Upload } from "next-s3-upload";
import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import AlignmentButtons from "../EditorButtons/Alignment";
import Headings from "../EditorButtons/Heading";
import ListButtons from "../EditorButtons/List";
import TypographyButtons from "../EditorButtons/Typography";
import YoutubeButton from "../EditorButtons/Youtube";
const Profile = ({ user, users }) => {
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName);
  const [email, setEmail] = useState(user?.email);
  const [username, setUsername] = useState(user?.userName);
  const [title, setTitle] = useState(user?.title || "");

  const [userImageFileName, setImageFileName] = useState(
    user?.profileImage || ""
  );
  // const [userImageFilePath, setImageFilePath] = useState(
  //   user?.profileImagePath || ""
  // );
  const [webUrl, setWebUrl] = useState(user?.websiteUrl || "");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState(user?.bio || "");
  const [userNameError, setUserNameError] = useState("");

  const fileTypes = ["JPG", "PNG", "GIF"];

  let { uploadToS3 } = useS3Upload();

  const toast = useToast();

  console.log(users);

  const editor = useEditor({
    extensions: [
      Document,
      Paragraph.configure({
        inline: true,
      }),
      Texts,
      BulletList,
      ListItem,
      Bold,
      Underline,
      OrderedList,
      Heading.configure({
        levels: [1, 2, 3],
      }),
      Images,

      Typography,
      Focus.configure({
        className: "has-focus",
        mode: "all",
      }),
      Youtube.configure({
        controls: false,
      }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === "heading") {
            return "Add a heading";
          } else {
            return "Write something";
          }
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),

      StarterKit,
    ],
    autofocus: false,
    content: user.bio,
    editable: true,
  });

  const handleUsernameChange = (e) => {
    if (users.length > 0) {
      setUserNameError("");
      for (let i = 0; i < users?.length; i++) {
        setUsername(e.target.value);
        if (users[i].userName === e.target.value) {
          setUserNameError("Username already taken");
        }
      }
    } else {
      setUsername(e.target.value);
    }
  };

  const handleFileChange = async (file) => {
    let { url } = await uploadToS3(file);
    setImageFileName(url);
  };

  const html = editor?.getHTML();

  const handleUpdateProfile = async () => {
    const response = await axios.put("/api/profileupdate", {
      userId: user.userId,
      tenantId: user.tenantId,
      firstName: firstName,
      lastName: lastName,
      title,
      bio: html,

      userImageFileName,
      webUrl,
    });

    if (response) {
      toast({
        title: "Profile Updated Successfully",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  if (!editor) {
    return null;
  }

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <Flex direction="column" pb={10} mt={3}>
        <Card width="100%" bg="white" shadow="xl">
          <CardBody>
            <Flex direction="column">
              <Text fontSize="lg" fontWeight="bold">
                User
              </Text>

              <FormControl mt={2}>
                <FormLabel fontSize="sm" fontWeight="semibold">
                  Title
                </FormLabel>
                <Input
                  type="text"
                  _placeholder={{ color: "gray.500" }}
                  _hover={{
                    bg: "white",
                    border: "1px solid",
                    borderColor: "blue.500",
                  }}
                  _focus={{
                    outline: "none",
                    bg: "white",
                    border: "1px solid",
                    borderColor: "blue.500",
                  }}
                  bg="gray.50"
                  value={title}
                  fontSize="sm"
                  onChange={(e) => setTitle(e.target.value)}
                ></Input>
              </FormControl>
              <FormControl mt={2}>
                <FormLabel fontSize="sm" fontWeight="semibold">
                  First Name
                </FormLabel>
                <Input
                  type="text"
                  _placeholder={{ color: "gray.500" }}
                  _hover={{
                    bg: "white",
                    border: "1px solid",
                    borderColor: "blue.500",
                  }}
                  _focus={{
                    outline: "none",
                    bg: "white",
                    border: "1px solid",
                    borderColor: "blue.500",
                  }}
                  bg="gray.50"
                  value={firstName}
                  fontSize="sm"
                  onChange={(e) => setFirstName(e.target.value)}
                ></Input>
              </FormControl>
              <FormControl mt={2}>
                <FormLabel fontSize="sm" fontWeight="semibold">
                  Last Name
                </FormLabel>
                <Input
                  type="text"
                  _placeholder={{ color: "gray.500" }}
                  _hover={{
                    bg: "white",
                    border: "1px solid",
                    borderColor: "blue.500",
                  }}
                  _focus={{
                    outline: "none",
                    bg: "white",
                    border: "1px solid",
                    borderColor: "blue.500",
                  }}
                  bg="gray.50"
                  value={lastName}
                  fontSize="sm"
                  onChange={(e) => setLastName(e.target.value)}
                ></Input>
              </FormControl>

              <FormControl mt={2}>
                <FormLabel fontSize="sm" fontWeight="semibold">
                  Email
                </FormLabel>
                <Input
                  type="text"
                  _placeholder={{ color: "gray.500" }}
                  _hover={{
                    bg: "white",
                    border: "1px solid",
                    borderColor: "blue.500",
                  }}
                  _focus={{
                    outline: "none",
                    bg: "white",
                    border: "1px solid",
                    borderColor: "blue.500",
                  }}
                  bg="gray.50"
                  value={email}
                  fontSize="sm"
                  onChange={(e) => setEmail(e.target.value)}
                ></Input>
              </FormControl>
              <FormControl mt={2}>
                <FormLabel fontSize="sm" fontWeight="semibold">
                  Username
                </FormLabel>
                <Input
                  type="text"
                  _placeholder={{ color: "gray.500" }}
                  _hover={{
                    bg: "white",
                    border: "1px solid",
                    borderColor: "blue.500",
                  }}
                  _focus={{
                    outline: "none",
                    bg: "white",
                    border: "1px solid",
                    borderColor: "blue.500",
                  }}
                  bg="gray.50"
                  value={username}
                  fontSize="sm"
                  onChange={handleUsernameChange}
                ></Input>
                {userNameError && (
                  <Text mt={1} color="red" fontSize="10pt">
                    {userNameError}
                  </Text>
                )}
              </FormControl>
              <FormControl mt={2}>
                <FormLabel fontSize="sm" fontWeight="semibold">
                  Profile Image
                </FormLabel>

                <Flex align="center">
                  <Avatar
                    name="Naocha Luwang"
                    src={userImageFileName}
                    size="lg"
                  />
                  <Box ml={3}>
                    <FileUploader
                      name="file"
                      types={fileTypes}
                      handleChange={handleFileChange}
                    />
                  </Box>
                </Flex>
                {/* <Input type="file" size="sm"></Input> */}
              </FormControl>
            </Flex>
          </CardBody>
        </Card>

        <Card width="100%" bg="white" shadow="md" mt={5}>
          <CardBody>
            <Flex direction="column">
              <Text fontSize="lg" fontWeight="bold">
                Basic
              </Text>

              <FormControl mt={2}>
                <FormLabel fontSize="sm" fontWeight="semibold">
                  Website URL
                </FormLabel>
                <Input
                  type="text"
                  _placeholder={{ color: "gray.500" }}
                  _hover={{
                    bg: "white",
                    border: "1px solid",
                    borderColor: "blue.500",
                  }}
                  _focus={{
                    outline: "none",
                    bg: "white",
                    border: "1px solid",
                    borderColor: "blue.500",
                  }}
                  bg="gray.50"
                  placeholder="https://yoursite.com"
                  value={webUrl}
                  fontSize="sm"
                  onChange={(e) => setWebUrl(e.target.value)}
                ></Input>
              </FormControl>
              <FormControl mt={2}>
                <FormLabel fontSize="sm" fontWeight="semibold">
                  Location
                </FormLabel>
                <Input
                  type="text"
                  _placeholder={{ color: "gray.500" }}
                  _hover={{
                    bg: "white",
                    border: "1px solid",
                    borderColor: "blue.500",
                  }}
                  _focus={{
                    outline: "none",
                    bg: "white",
                    border: "1px solid",
                    borderColor: "blue.500",
                  }}
                  bg="gray.50"
                  value={location}
                  placeholder="Guwahati, Assam"
                  fontSize="sm"
                  onChange={(e) => setLocation(e.target.value)}
                ></Input>
              </FormControl>
              <Flex direction="column">
                <Text>Bio</Text>
                <Box>
                  <HStack>
                    <Headings editor={editor} />
                    <TypographyButtons editor={editor} />
                    <AlignmentButtons editor={editor} />
                    <ListButtons editor={editor} />
                    <YoutubeButton editor={editor} />
                  </HStack>
                </Box>
                <Box
                  border="1px solid blue"
                  mt={5}
                  maxH="52"
                  w="100%"
                  h={52}
                  py={2}
                  bg="gray.50"
                  flex="1"
                  overflowY="scroll"
                  rounded="md"
                >
                  <EditorContent editor={editor} />
                </Box>
              </Flex>
            </Flex>
          </CardBody>
        </Card>
        <Card width="100%" bg="white" shadow="md" mt={5} mb={20}>
          <CardBody>
            <Button
              width="100%"
              colorScheme="messenger"
              onClick={handleUpdateProfile}
            >
              Save Profile Information
            </Button>
          </CardBody>
        </Card>
      </Flex>
    </div>
  );
};

export default Profile;
