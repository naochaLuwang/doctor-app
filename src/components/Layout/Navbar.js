import {
  Avatar,
  Box,
  Divider,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { TiThMenu } from "react-icons/ti";
import { IoMdClose } from "react-icons/io";
import { useGlobalState } from ".";
import { uuid } from "uuidv4";
import { HiBell } from "react-icons/hi";

const Navbar = ({ title }) => {
  const [open, setOpen] = useGlobalState("open");
  const [active, setActive] = useGlobalState("active");
  const [firstName, setFirstName] = useGlobalState("firstName");
  const [lastName, setLastName] = useGlobalState("lastName");
  const [userName, setUserName] = useGlobalState("userName");

  const handleSidebar = () => {
    setOpen(!open);
  };

  const addNewArticle = () => {
    const id = uuid();
    router.push(`/articles/${id}`);
  };

  const router = useRouter();

  const handleProfile = () => {
    router.push(`/profile/${userName}`);
    setActive("Profile");
  };

  return (
    <Box display="flex" bg={"white"} shadow="sm" px={4} py={2} h={12}>
      <Flex
        align="center"
        flex={1}
        // maxWidth={{ base: "100%", xl: "6xl" }}
        // mx="auto"
      >
        <Icon
          as={open ? IoMdClose : TiThMenu}
          h={6}
          w={6}
          color="gray.500"
          cursor="pointer"
          onClick={handleSidebar}
        />

        <Text ml={2} fontSize="12pt" fontWeight="bold" color="purple.600">
          {title}
        </Text>
      </Flex>

      <Flex mr={5} align="center">
        <Icon as={HiBell} w={7} h={7} mr={5} color="gray.600" />
        <Menu>
          <MenuButton>
            <Avatar size="sm" name={`${firstName} ${lastName}`} />
          </MenuButton>
          <MenuList px={2}>
            <MenuItem
              mb={1}
              _hover={{
                bg: "purple.50",
                rounded: "lg",
                color: "purple.800",
              }}
              onClick={handleProfile}
              bg="white"
            >
              <Flex direction="column">
                <Text fontWeight="bold">
                  {firstName} {lastName}
                </Text>
                <Text fontSize="10pt">{userName}</Text>
              </Flex>
            </MenuItem>
            <Divider />
            <MenuItem
              mt={1}
              _hover={{
                bg: "purple.50",
                rounded: "lg",
                color: "purple.800",
              }}
              onClick={() => router.push("/")}
            >
              Dashboard
            </MenuItem>
            {/* <MenuItem
              _hover={{
                bg: "purple.50",
                rounded: "lg",
                color: "purple.800",
              }}
              onClick={addNewArticle}
            >
              Create Article
            </MenuItem> */}
            <MenuItem
              mb={1}
              _hover={{
                bg: "purple.50",
                rounded: "lg",
                color: "purple.800",
              }}
              onClick={() => router.push("/setting/profile")}
            >
              Settings
            </MenuItem>
            <Divider />
            <MenuItem
              _hover={{
                bg: "purple.50",
                rounded: "lg",
                color: "purple.800",
              }}
              mt={1}
              onClick={() => signOut({ redirect: false })}
            >
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  );
};

export default Navbar;
