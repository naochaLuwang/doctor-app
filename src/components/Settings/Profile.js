import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import axios from "axios";

const Profile = ({ user, users }) => {
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName);
  const [email, setEmail] = useState(user?.email);
  const [username, setUsername] = useState(user?.userName);
  const [title, setTitle] = useState(user?.title || "");

  const [userImageFileName, setImageFileName] = useState(
    user?.profileImage || ""
  );
  const [userImageFilePath, setImageFilePath] = useState(
    user?.profileImagePath || ""
  );
  const [webUrl, setWebUrl] = useState(user?.websiteUrl || "");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState(user?.bio || "");
  const [userNameError, setUserNameError] = useState("");

  const fileTypes = ["JPG", "PNG", "GIF"];

  console.log(users);

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

  const handleFile = async (file) => {
    if (file) {
      const fd = new FormData();
      fd.append("myImage", file);
      let res = await fetch("/api/uploadprofileimage", {
        method: "POST",

        body: fd,
      });

      let response = await res.json();
      console.log(response);

      if (response) {
        setImageFileName(response.fileName.filename);
        setImageFilePath(response.filePath);
      }
    }
  };

  const handleUpdateProfile = async () => {
    const response = await axios.put("/api/profileupdate", {
      userId: user.userId,
      tenantId: user.tenantId,
      firstName: firstName,
      lastName: lastName,
      title,
      bio,
      userImageFilePath,
      userImageFileName,
      webUrl,
    });

    console.log(response);
  };
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <Flex direction="column" pb={20}>
        <Card width="100%" bg="white" shadow="md">
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
                    src={`${userImageFilePath}${userImageFileName}`}
                    size="lg"
                  />
                  <Box ml={3}>
                    <FileUploader
                      name="file"
                      types={fileTypes}
                      handleChange={handleFile}
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
              <FormControl>
                <FormLabel>Bio</FormLabel>
                <Textarea
                  placeholder="A short Bio.."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
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
                />
              </FormControl>
            </Flex>
          </CardBody>
        </Card>
        <Card width="100%" bg="white" shadow="md" mt={5}>
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
