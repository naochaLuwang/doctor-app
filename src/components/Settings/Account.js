import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  FormControl,
  FormLabel,
  Input,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useToast } from "@chakra-ui/react";

const Account = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const toast = useToast();

  const handleUpdatePassword = (e) => {
    e.preventDefault();

    if (password !== newPassword) {
      return toast({
        title: "Invalid Credentials",
        description: "Password and new Password does not match",
        status: "warning",
        duration: 9000,
        isClosable: true,
      });
    }
  };
  return (
    <div style={{ width: "100%", height: "90vh" }}>
      <Flex direction="column" pb={20}>
        <Card width="100%" bg="white" shadow="md">
          <CardBody>
            <Flex direction="column">
              <Text fontSize="lg" fontWeight="bold">
                Set new password
              </Text>

              <FormControl mt={4}>
                <FormLabel fontSize="sm" fontWeight="semibold">
                  Current Password
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
                  value={currentPassword}
                  fontSize="sm"
                  onChange={(e) => setCurrentPassword(e.target.value)}
                ></Input>
              </FormControl>
              <FormControl mt={2}>
                <FormLabel fontSize="sm" fontWeight="semibold">
                  Password
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
                  value={password}
                  fontSize="sm"
                  onChange={(e) => setPassword(e.target.value)}
                ></Input>
              </FormControl>

              <FormControl mt={2}>
                <FormLabel fontSize="sm" fontWeight="semibold">
                  Confirm new password
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
                  value={newPassword}
                  fontSize="sm"
                  onChange={(e) => setNewPassword(e.target.value)}
                ></Input>
              </FormControl>

              <Button
                mt={3}
                colorScheme="facebook"
                onClick={handleUpdatePassword}
              >
                Update Password
              </Button>
            </Flex>
          </CardBody>
        </Card>

        <Card width="100%" bg="white" shadow="md" mt={5}>
          <CardHeader color="red" fontSize="lg" fontWeight="semibold">
            Danger zone
          </CardHeader>
          <CardBody>
            <Flex direction="column">
              <Text fontSize="md" mt={-5} fontWeight="bold">
                Delete account
              </Text>
              <Text mt={2} mb={2} fontWeight="medium">
                Deleting your account will:
              </Text>
              <UnorderedList>
                <ListItem>
                  Delete your profile, along with your authentication
                  associations.
                </ListItem>
                <ListItem>
                  Delete any and all content you have, such as articles,
                  comments, or your reading list.
                </ListItem>
                <ListItem>
                  Allow your username to become availabe to anyone.
                </ListItem>
              </UnorderedList>
              <Button colorScheme="red" width="36" mt={3}>
                Delete Account
              </Button>
            </Flex>
          </CardBody>
        </Card>
      </Flex>
    </div>
  );
};

export default Account;
