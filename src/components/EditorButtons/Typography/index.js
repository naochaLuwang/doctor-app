import React from "react";
import { Button, Tooltip } from "@chakra-ui/react";

const TypographyButtons = ({ editor }) => {
  return (
    <>
      <Tooltip label="Bold">
        <Button
          size="sm"
          colorScheme="blue"
          onClick={() => editor.chain().focus().toggleBold().run()}
          variant={editor.isActive("bold") ? "solid" : "outline"}
        >
          B
        </Button>
      </Tooltip>

      <Tooltip label="Italic">
        <Button
          size="sm"
          colorScheme="blue"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          variant={editor.isActive("italic") ? "solid" : "outline"}
        >
          <i>I</i>
        </Button>
      </Tooltip>

      <Tooltip label="Underline">
        <Button
          size="sm"
          colorScheme="blue"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          variant={editor.isActive("underline") ? "solid" : "outline"}
        >
          <u>U</u>
        </Button>
      </Tooltip>
    </>
  );
};

export default TypographyButtons;
