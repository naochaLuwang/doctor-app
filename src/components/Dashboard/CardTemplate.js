import React from "react";
import {
  Card,
  CardBody,
  Flex,
  Box,
  Icon,
  VStack,
  Text,
} from "@chakra-ui/react";

const CardTemplate = ({
  onOpen,
  title,
  count,
  iconName,
  iconColor,
  iconBackground,
}) => {
  return (
    <Card bg="white" width="15%" cursor="pointer" onClick={onOpen}>
      <CardBody>
        <Flex align="center">
          <Box bg={iconBackground} p={2} rounded="2xl">
            <Icon as={iconName} h={10} w={10} color={iconColor} />
          </Box>
          <VStack spacing={1} align="start" ml={5}>
            <Text fontSize="xl" fontWeight="semibold">
              {count}
            </Text>
            <Text>{title}</Text>
          </VStack>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default CardTemplate;
