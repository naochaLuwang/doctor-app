import { Box, Flex, Stack } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { createGlobalState } from "react-hooks-global-state";
import axios from "axios";

const initialState = {
  open: false,
  active: "",
  userName: "",
  tenantId: 0,
  firstName: "",
  lastName: "",
  userId: "",
  editable: true,
};

export const { useGlobalState } = createGlobalState(initialState);

const Layout = ({ children }) => {
  const [open, setOpen] = useGlobalState("open");
  const [active, setActive] = useGlobalState("active");
  const [userName, setUserName] = useGlobalState("userName");
  const [tenantId, setTenantId] = useGlobalState("tenantId");
  const [firstName, setFirstName] = useGlobalState("firstName");
  const [lastName, setLastName] = useGlobalState("lastName");
  const [userId, setUserId] = useGlobalState("userId");

  const { status, data: session } = useSession();
  const Router = useRouter();

  useEffect(() => {
    const getActiveUser = async (session) => {
      const response = await axios.get(`/api/admin/${session?.user.name}`);
      const user = await response.data;

      setUserName(user.userName);
      setTenantId(user.tenantId);
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setUserId(user.userId);
    };
    getActiveUser();
  }, [setFirstName, setLastName, setTenantId, setUserId, setUserName, status]);

  if (status === "unauthenticated") {
    return <>{children}</>;
  }
  return (
    <>
      {status === "authenticated" && (
        <Box width="100vw" height="100vh" overflow="hidden">
          <Flex overflow="hidden">
            <Sidebar open={open} />
            <Flex flex={1} bg="WhiteAlpha.200" direction="column">
              <Navbar title={active} />
              <div>{children}</div>
            </Flex>
          </Flex>
        </Box>
      )}
    </>
  );
};

export default Layout;
