import React from "react";
import { Tooltip, Button } from "@chakra-ui/react";

const Heading = ({ editor }) => {
  return (
    <>
      <Tooltip label="Heading 1">
        <Button
          size="sm"
          colorScheme="blue"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          variant={
            editor.isActive("heading", { level: 1 }) ? "solid" : "outline"
          }
        >
          H1
        </Button>
      </Tooltip>

      <Tooltip label={`Heading 2`}>
        <Button
          size="sm"
          colorScheme="blue"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          variant={
            editor.isActive("heading", { level: 2 }) ? "solid" : "outline"
          }
        >
          H2
        </Button>
      </Tooltip>

      <Tooltip label="Heaing 3">
        <Button
          size="sm"
          colorScheme="blue"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          variant={
            editor.isActive("heading", { level: 3 }) ? "solid" : "outline"
          }
        >
          H3
        </Button>
      </Tooltip>
    </>
  );
};

export default Heading;
