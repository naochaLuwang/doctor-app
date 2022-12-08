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
import React from "react";

const Account = () => {
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
                  // value={firstName}
                  fontSize="sm"
                  // onChange={(e) => setFirstName(e.target.value)}
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
                  // value={lastName}
                  fontSize="sm"
                  // onChange={(e) => setLastName(e.target.value)}
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
                  // value={email}
                  fontSize="sm"
                  // onChange={(e) => setEmail(e.target.value)}
                ></Input>
              </FormControl>
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
