import { Box, Flex, Icon, Stack, Text } from "@chakra-ui/react";

import Image from "next/legacy/image";

import React, { useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { RiArticleFill } from "react-icons/ri";
import { BsFillChatLeftDotsFill } from "react-icons/bs";
import { useGlobalState } from ".";
import { useRouter } from "next/router";

const Sidebar = ({ open }) => {
  const [active, setActive] = useGlobalState("active");
  const router = useRouter();
  return (
    <Box
      width={open ? "240px" : "64px"}
      transition={open ? "width 400ms ease-out" : "width 100ms linear"}
      bg={"white"}
      boxShadow="lg"
      shadow="xl"
      height="100vh"
      py={2}
      px={3}
      // display={active === "Chat" ? "none" : "block"}
    >
      <Box
        display="flex"
        align={open ? "start" : "center"}
        px={open && 2}
        justifyContent={!open && "center"}
        mb={2}
      >
        <Box position="relative" h={6} w={6}>
          <Image
            src="/logo.jpeg"
            alt="logo"
            layout="fill"
            objectFit="contain"
          />
        </Box>

        <Text
          display={open ? "inline-flex" : "none"}
          color="blue.800"
          fontWeight={700}
          ml={2}
        >
          Doctor App
        </Text>
      </Box>

      <Flex direction="column" align={open ? "start" : "center"}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent={!open && "center"}
          width={open ? "220px" : "64px"}
          mb={1}
          px={2}
          cursor="pointer"
          _hover={{
            rounded: "lg",
            color: "purple.400",
            fontWeight: "semibold",
          }}
          color={active === "Home" ? "purple.400" : "gray.600"}
          fontWeight={active === "Home" ? "semibold" : "base"}
          onClick={() => {
            router.push("/");
            setActive("Home");
          }}
        >
          <Box
            px="10px"
            py="8px"
            _hover={{
              bg: active === "Home" ? "purple.100" : "purple.50",
              rounded: "lg",
              color: active === "Home" ? "gray.600" : "purple.400",
            }}
            bg={active === "Home" ? "purple.100" : "none"}
            rounded="lg"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Icon as={AiFillHome} w={6} h={6} color="purple.400" />
          </Box>

          <Text display={open ? "inline-flex" : "none"} fontSize="11pt" ml={2}>
            Home
          </Text>
        </Box>

        <Box
          display="flex"
          alignItems="center"
          justifyContent={!open && "center"}
          width={open ? "220px" : "64px"}
          mb={1}
          px={2}
          cursor="pointer"
          _hover={{
            rounded: "lg",
            color: "purple.400",
            fontWeight: "semibold",
          }}
          color={active === "Article" ? "purple.400" : "gray.600"}
          fontWeight={active === "Article" ? "semibold" : "base"}
          onClick={() => {
            router.push("/articles");
            setActive("Article");
          }}
        >
          <Box
            px="10px"
            py="8px"
            _hover={{
              bg: active === "Article" ? "purple.100" : "purple.50",
              rounded: "lg",
              color: active === "Article" ? "gray.600" : "purple.400",
            }}
            bg={active === "Article" ? "purple.100" : "none"}
            rounded="lg"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Icon as={RiArticleFill} w={6} h={6} color="purple.400" />
          </Box>
          <Text
            display={open ? "inline-flex" : "none"}
            fontSize="11pt"
            ml={2}
            // color="gray.600"
          >
            Articles
          </Text>
        </Box>

        <Box
          display="flex"
          alignItems="center"
          justifyContent={!open && "center"}
          width={open ? "220px" : "64px"}
          mb={1}
          px={2}
          cursor="pointer"
          _hover={{
            rounded: "lg",
            color: "purple.400",
            fontWeight: "semibold",
          }}
          color={active === "Chat" ? "purple.400" : "gray.600"}
          fontWeight={active === "Chat" ? "semibold" : "base"}
          onClick={() => {
            router.push("/chat");
          }}
        >
          <Box
            px="10px"
            py="8px"
            _hover={{
              bg: active === "Chat" ? "purple.100" : "purple.50",
              rounded: "lg",
              color: active === "Chat" ? "gray.600" : "purple.400",
            }}
            bg={active === "Chat" ? "purple.100" : "none"}
            rounded="lg"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Icon as={BsFillChatLeftDotsFill} w={6} h={6} color="purple.400" />
          </Box>

          <Text
            display={open ? "inline-flex" : "none"}
            fontSize="11pt"
            ml={2}
            // color="gray.600"
          >
            Chats
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default Sidebar;
