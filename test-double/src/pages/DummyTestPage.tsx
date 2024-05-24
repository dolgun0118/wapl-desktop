import React from "react";
import { markdown } from "../markdown/Dummy.md";
import Markdown from "react-markdown";
const DummyTestPage = () => {
  return (
    <div>
      <Markdown>{markdown}</Markdown>
    </div>
  );
};

export default DummyTestPage;
