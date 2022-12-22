import {
  Box,
  Card,
  CardBody,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import DoctorMaster from "../models/DoctorMaster";
import dbConnect from "../utils/db";
import Registration from "../models/Regsitration";
import { getSession } from "next-auth/react";

const Users = ({ users }) => {
  return (
    <Box py="2" px="6">
      <Text fontWeight={"medium"} fontSize="xl" ml={5}>
        Users
      </Text>
      <Card mt={2}>
        <CardBody bg="white">
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
              <Tbody>
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
                ))}
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
