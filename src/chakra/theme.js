import { extendTheme } from "@chakra-ui/react";

import { mode } from "@chakra-ui/theme-tools";
// import Button from "./Button";

const config = {
  useSystemColorMode: false,
  initialColorMode: "light",
};

const fonts = {
  heading: `'QuicksandVariable', sans-serif`,
  body: `'InterVariable', sans-serif`,
};

const colors = {
  black: "#111",
};

const theme = extendTheme({
  styles: {
    global: (props) => ({
      body: {
        color: mode("gray.700", "whiteAlpha.900")(props),
        fontFamily: "body",
        bg: "gray.50",

        // color: mode("gray.800", "whiteAlpha.900")(props),
        fontSize: "sm",
        ".main-container": {
          minH: "100vh",
        },
        a: {
          color: "blue.500",
          "&:hover": {
            textDecoration: "none",
          },
        },
        "*, ::before, ::after": {
          borderColor: "#9fa3b114",
        },
        ".clear": {
          clear: "both",
        },
        ".ProseMirror": {
          width: "auto",
          px: "10px",
          py: "10px",

          "> * + *": {
            marginTop: "0.75em",
          },
          // @see https://github.com/jesster2k10/guava-cards/blob/5d5c283eb720bf503258f4e17bce3865d35fd8d3/packages/website/src/bundles/editor/ContentEditor.tsx#L86
          "p.is-editor-empty:first-child::before": {
            content: "attr(data-placeholder)",

            color: "gray.500",
            float: "left",
            pointerEvents: "none",
            height: "0",
          },
          "&:focus": {
            outline: "none",
          },
          h1: {
            fontSize: "1.5rem",
          },
          h2: {
            fontSize: "1.25rem",
          },
          h3: {
            fontSize: "1rem",
          },
          "h1, h2, h3, h4,  h5, h6 ": {
            lineHeight: "1.1",
            fontWeight: "700",
          },
          hr: {
            borderTop: "1px solid #68cef8",
          },
          "ul, ol": {
            padding: "0 1.2rem",
          },
          code: {
            bg: "rgba(#616161, 0.1)",
            color: "#616161",
          },
          pre: {
            fontFamily: "JetBrainsMono, 'Courier New', Courier, monospace",
            background: mode("gray.900", "blue.200")(props),
            color: mode("white", "gray.900")(props),
            padding: "0.75rem 1rem",
            rounded: "lg",
            whiteSpace: "pre-wrap",

            code: {
              color: "inherit",
              p: 0,
              background: "none",
              fontSize: "0.8rem",
            },

            ".hljs-comment, .hljs-quote": {
              color: "#616161",
            },

            ".hljs-variable, .hljs-template-variable,  .hljs-attribute, .hljs-tag, .hljs-name, .hljs-regexp, .hljs-link, .hljs-name, .hljs-selector-id, .hljs-selector-class":
              {
                color: "#F98181",
              },

            ".hljs-number,  .hljs-meta, .hljs-built_in, .hljs-builtin-name, .hljs-literal,  .hljs-type, .hljs-params":
              {
                color: "#FBBC88",
              },

            ".hljs-string, .hljs-symbol, .hljs-bullet": {
              color: "#B9F18D",
            },

            ".hljs-title, .hljs-section": {
              color: "#FAF594",
            },

            ".hljs-keyword, .hljs-selector-tag": {
              color: "#70CFF8",
            },

            ".hljs-emphasis": {
              fontStyle: "italic",
            },

            ".hljs-strong": {
              fontWeight: 700,
            },
          },
          blockquote: {
            pl: 4,
            ml: 4,
            borderLeft: "2px solid rgba(13, 13, 13, 0.1)",
          },
          "span[data-spoiler]": {
            bg: mode("gray.900", "gray.100")(props),
            _hover: {
              bg: "transparent",
            },
            // @apply dark:bg-gray-100 bg-gray-900 dark:hover:bg-transparent hover:bg-transparent;
          },

          img: {
            maxW: "full",
            h: "auto",
          },
          mark: {
            bg: "#FAF594",
          },
          hr: {
            border: "0.5px solid rgba(#0D0D0D, 0.1) ",
            borderTop: "2px solid ",
            margin: "2rem 2rem",
          },
        }, // .ProseMirror
      },
    }),
  },
  colors,
  config,
  fonts,
  // components: {
  //   Button,
  // },
});

export default theme;
