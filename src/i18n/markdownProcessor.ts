import marked from "marked";

export const convertMarkdown = (value: string) => marked(value);

export default {
  name: "markdownProcessor",
  process: convertMarkdown,
  type: "postProcessor"
};
