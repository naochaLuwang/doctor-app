import { Box, Flex, Icon, Stack, Text } from "@chakra-ui/react";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { RiArticleFill } from "react-icons/ri";
import { useGlobalState } from ".";
import { useRouter } from "next/router";

const Sidebar = ({ open }) => {
  const [active, setActive] = useGlobalState("active");
  const router = useRouter();
  return (
    <Box
      width={open ? "240px" : "64px"}
      transition={open ? "width 400ms ease-out" : "width 100ms linear"}
      bg="white"
      boxShadow="lg"
      height="100vh"
      py={2}
      px={3}
      display={{ base: "none", lg: "block" }}
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
          p={2}
          cursor="pointer"
          _hover={{
            bg: active === "Home" ? "purple.100" : "purple.50",
            rounded: "lg",
            color: active === "Home" ? "gray.600" : "purple.400",
          }}
          onClick={() => {
            router.push("/");
            setActive("Home");
          }}
          bg={active === "Home" ? "purple.100" : "none"}
          rounded="lg"
        >
          <Icon as={AiFillHome} w={6} h={6} color="purple.400" />
          <Text display={open ? "inline-flex" : "none"} fontSize="11pt" ml={2}>
            Home
          </Text>
        </Box>

        <Box
          display="flex"
          alignItems="center"
          cursor="pointer"
          justifyContent={!open && "center"}
          width={open ? "220px" : "64px"}
          mb={3}
          p={2}
          _hover={{
            bg: active === "Article" ? "purple.100" : "purple.50",
            rounded: "lg",
            color: active === "Article" ? "gray.600" : "purple.400",
          }}
          onClick={() => {
            router.push("/articles");
            setActive("Article");
          }}
          bg={active === "Article" ? "purple.100" : "none"}
          rounded="lg"
        >
          <Icon as={RiArticleFill} w={6} h={6} color="purple.400" />
          <Text
            display={open ? "inline-flex" : "none"}
            fontSize="11pt"
            ml={2}
            // color="gray.600"
          >
            Articles
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default Sidebar;
