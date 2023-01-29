import {
  Box,
  Card,
  CardBody,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import DoctorMaster from "../models/DoctorMaster";
import dbConnect from "../utils/db";
import Registration from "../models/Regsitration";
import { getSession } from "next-auth/react";
import { useGlobalState } from "../components/Layout";
import { Search2Icon } from "@chakra-ui/icons";

const Users = ({ users }) => {
  const [active, setActive] = useGlobalState("active");
  const [searchField, setSearchField] = useState("");
  const handleChange = (e) => {
    setSearchField(e.target.value);
  };

  const filteredUsers = users.filter((user) => {
    return user.FirstName.toLowerCase().includes(searchField.toLowerCase());
  });
  useEffect(() => {
    setActive("Users");
  }, [setActive]);
  return (
    <Box py="2" px="6" height="90vh">
      <Flex alignItems={"center"} justifyContent={"space-between"}>
        <Text fontWeight="semibold" color="gray.600" fontSize="xl">
          Users
        </Text>

        <Box px={2} py={2}>
          <InputGroup>
            <Input
              placeholder="Search Users"
              rounded="full"
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
              bg="gray.200"
              type="search"
              onChange={handleChange}
            />
            <InputRightElement>
              <Search2Icon color="gray.500" />
            </InputRightElement>
          </InputGroup>
        </Box>
      </Flex>

      <Card mt={2} rounded="xl" shadow="md">
        <CardBody bg="white" rounded="xl">
          <TableContainer>
            <Table variant="striped" colorScheme="purple" size="sm">
              <Thead>
                <Tr>
                  <Th>Sl.No</Th>
                  <Th>Name</Th>
                  <Th>Phone Number</Th>
                  <Th>Email</Th>
                  <Th>City</Th>
                  <Th>State</Th>
                </Tr>
              </Thead>
              <Tbody maxH={"80vh"} overflowY="scroll">
                {searchField !== "" ? (
                  <>
                    {filteredUsers.length > 0 ? (
                      <>
                        {filteredUsers.map((user, index) => (
                          <Tr key={user._id}>
                            <Td>{index + 1}</Td>
                            <Td>
                              {user.FirstName} {user.LastName}
                            </Td>
                            <Td>{user.PrimaryMobileNo}</Td>
                            <Td>{user.Email}</Td>
                            <Td>{user.CityName}</Td>
                            <Td>{user.StateName}</Td>
                          </Tr>
                        ))}
                      </>
                    ) : (
                      <Flex
                        width={"full"}
                        height={"30vh"}
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Text>No users found</Text>
                      </Flex>
                    )}
                  </>
                ) : (
                  <>
                    {users.map((user, index) => (
                      <Tr key={user._id}>
                        <Td>{index + 1}</Td>
                        <Td>
                          {user.FirstName} {user.LastName}
                        </Td>
                        <Td>{user.PrimaryMobileNo}</Td>
                        <Td>{user.Email}</Td>
                        <Td>{user.CityName}</Td>
                        <Td>{user.StateName}</Td>
                      </Tr>
                    ))}{" "}
                  </>
                )}
              </Tbody>
            </Table>
          </TableContainer>
        </CardBody>
      </Card>
    </Box>
  );
};

export default Users;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  console.log(session);
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/signin",
      },
    };
  }

  await dbConnect();

  const user = await DoctorMaster.findOne({ userName: session?.user.name });

  const users = await Registration.find({
    TenantID: user?.tenantId,
    IsActive: "Y",
  });

  console.log(users);

  return {
    props: {
      session,
      users: JSON.parse(JSON.stringify(users)),
    },
  };
}
