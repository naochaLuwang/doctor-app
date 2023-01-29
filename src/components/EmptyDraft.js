import { Box, Center, Flex, HStack, Text, VStack } from "@chakra-ui/layout";
import React from "react";
import XLVILoader from "./Loaders/XLVILoader";

const EmptyDraft = ({ addNewArticle, setArticleStatus }) => {
  return (
    <Box width="full" height="80vh">
      <Flex
        alignItems="center"
        direction="column"
        justifyContent="space-around"
        mt={20}
      >
        <XLVILoader />
        <HStack mt={20} fontWeight="medium" fontSize="xl">
          <Text>No Draft Articles at the moment .</Text>

          <Text color="blue.500" cursor="pointer" onClick={addNewArticle}>
            Create a new one
          </Text>
        </HStack>
      </Flex>
    </Box>
  );
};

export default EmptyDraft;
