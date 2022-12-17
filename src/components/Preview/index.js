import {
  Box,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tag,
  TagLabel,
  Text,
  VStack,
} from "@chakra-ui/react";
import Focus from "@tiptap/extension-focus";
import { Image as Images } from "@tiptap/extension-image";
import Typography from "@tiptap/extension-typography";
import Underline from "@tiptap/extension-underline";
import { EditorContent } from "@tiptap/react";
import Image from "next/image";
import React from "react";

import TextAlign from "@tiptap/extension-text-align";

import { Editor } from "@tiptap/core";
import Youtube from "@tiptap/extension-youtube";
import StarterKit from "@tiptap/starter-kit";

const Preview = ({
  isOpen,
  onClose,
  topic,
  tags,
  imageUrl,

  imageFlag,
  html,
  json,
  articleSubtitle,
}) => {
  const editor = new Editor({
    extensions: [
      Underline,

      Images,

      Typography,
      Youtube,

      Focus.configure({
        className: "has-focus",
        mode: "all",
      }),

      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
    ],
    autofocus: true,
    content: html,
    editable: false,
  });
  return (
    <>
      <Modal
        size="full"
        onClose={onClose}
        isOpen={isOpen}
        scrollBehavior="inside"
      >
        <ModalOverlay>
          <ModalContent>
            <ModalHeader shadow="sm">Preview</ModalHeader>
            <ModalCloseButton />
            <ModalBody bg="gray.50">
              <Box maxW="5xl" mx="auto" bg="white" minH="auto">
                <VStack alignItems="start">
                  {imageFlag == "Y" && (
                    <Box position="relative" h={"60"} w="5xl">
                      <Image src={imageUrl} alt="Banner Image" layout="fill" />
                    </Box>
                  )}
                  <Heading>{topic}</Heading>
                  <VStack align="start">
                    <Text fontSize="12pt">{articleSubtitle}</Text>
                    <HStack>
                      {tags?.map((tag, i) => (
                        <Tag
                          key={i}
                          size="md"
                          borderRadius="full"
                          variant="outline"
                          colorScheme="blue"
                        >
                          <TagLabel>{tag}</TagLabel>
                        </Tag>
                      ))}
                    </HStack>
                  </VStack>
                </VStack>
                <Box ml={-3}>
                  <EditorContent editor={editor} />
                </Box>
              </Box>
            </ModalBody>
            <ModalFooter></ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  );
};

export default Preview;
