// declare module "*.md" {
//   const content: any;
//   export default String(content);
// }

declare module "*.md" {
  const attributes: Record<string, unknown>;

  import React from "react";
  const ReactComponent: React.VFC;

  const markdown: string;

  export { attributes, toc, html, ReactComponent, markdown };
}
