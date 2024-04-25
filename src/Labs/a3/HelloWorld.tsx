import { Editor } from "@tinymce/tinymce-react";
import Nav from "../../Nav";
import { TINYMCE_API_KEY } from "../../constants";
import { useState } from "react";

export default function HelloWorld() {
  const [text, setText] = useState("");

  return (
    <div>
      <Nav />
      <Editor
        apiKey={TINYMCE_API_KEY}
        value={text}
        onEditorChange={(newText, editor) => {
          setText(newText);
          console.log(newText);
        }}
      />
      <h1>Hello World!</h1>
    </div>
  );
}
