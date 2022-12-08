import React from "react";
import { Button, Icon, Tooltip } from "@chakra-ui/react";
import {
  FaAlignLeft,
  FaAlignRight,
  FaAlignCenter,
  FaAlignJustify,
} from "react-icons/fa";

const AlignmentButtons = ({ editor }) => {
  return (
    <>
      <Tooltip label="left">
        <Button
          size="sm"
          colorScheme="blue"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          variant={editor.isActive({ textAlign: "left" }) ? "solid" : "outline"}
        >
          <Icon as={FaAlignLeft} />
        </Button>
      </Tooltip>

      <Tooltip label="center">
        <Button
          size="sm"
          colorScheme="blue"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          variant={
            editor.isActive({ textAlign: "center" }) ? "solid" : "outline"
          }
        >
          <Icon as={FaAlignCenter} />
        </Button>
      </Tooltip>

      <Tooltip label="right">
        <Button
          size="sm"
          colorScheme="blue"
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          variant={
            editor.isActive({ textAlign: "right" }) ? "solid" : "outline"
          }
        >
          <Icon as={FaAlignRight} />
        </Button>
      </Tooltip>

      <Tooltip label="justify">
        <Button
          size="sm"
          colorScheme="blue"
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          variant={
            editor.isActive({ textAlign: "justify" }) ? "solid" : "outline"
          }
        >
          <Icon as={FaAlignJustify} />
        </Button>
      </Tooltip>
    </>
  );
};

export default AlignmentButtons;
