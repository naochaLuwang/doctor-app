import React, { useState } from "react";
import {
  Box,
  Stack,
  Input,
  Button,
  InputGroup,
  InputLeftElement,
  Icon,
  InputRightElement,
} from "@chakra-ui/react";

import { useToast } from "@chakra-ui/react";

import { IoPerson } from "react-icons/io5";
import { RiLockPasswordFill } from "react-icons/ri";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
const Login = () => {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [show, setShow] = useState(false);
  const { status } = useSession();
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const Router = useRouter();

  const signInUser = async (e) => {
    e.preventDefault();
    setLoading(true);

    let options = { redirect: false, userName, password };
    const res = await signIn("credentials", options);

    setMessage(null);

    if (res?.error) {
      setMessage(res.error);
      console.log(message);
      toast({
        title: message,
        status: "error",
        duration: 9000,
        position: "top-right",
        isClosable: true,
      });
      setLoading(false);
      return;
    }
    if (res) {
      console.log(res);
      return Router.push("/");
    }
  };

  const togglePassword = () => {
    setShow(!show);
  };

  return (
    <Box>
      <form onSubmit={signInUser}>
        <Stack spacing={{ base: "3", md: "2" }}>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <Icon as={IoPerson} color="gray.500" />
            </InputLeftElement>
            <Input
              variant="outline"
              placeholder="Username"
              width="350px"
              required
              type="text"
              fontSize="10pt"
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
              value={userName}
              onChange={(e) => setUsername(e.target.value)}
            />
          </InputGroup>

          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <Icon as={RiLockPasswordFill} color="gray.500" />
            </InputLeftElement>
            <Input
              variant="outline"
              placeholder="Password"
              width="350px"
              required
              type={show ? "text" : "password"}
              fontSize="10pt"
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
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputRightElement>
              {show ? (
                <ViewOffIcon
                  w={5}
                  h={5}
                  color="gray.500"
                  cursor="pointer"
                  onClick={togglePassword}
                />
              ) : (
                <ViewIcon
                  w={5}
                  h={5}
                  color="gray.500"
                  cursor="pointer"
                  onClick={togglePassword}
                />
              )}
            </InputRightElement>
          </InputGroup>

          <Button
            type="submit"
            width="100%"
            height="36px"
            mt={2}
            mb={2}
            bg="blue.500"
            color="white"
            _hover={{ bg: "blue.600" }}
            _active={{ bg: "blue.600" }}
            isLoading={loading}
          >
            Log In
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default Login;
