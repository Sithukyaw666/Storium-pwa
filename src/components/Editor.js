import React, { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { useMutation } from "@apollo/client";
import { CREATE_STORY } from "../gql/mutation";
import { useHistory } from "react-router-dom";

const Editor = () => {
  const [createStory] = useMutation(CREATE_STORY);
  const history = useHistory();
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [preview, setPreview] = useState(false);
  const onSave = async () => {
    await createStory({
      variables: { title: title, content: value },
    });
    try {
      history.push("/");
    } catch {}
  };

  return (
    <div className="w-full  px-40 md:p-2">
      <div className="w-full ml-auto sticky top-14 h-14 flex md:flex-col md:h-auto  md:mb-4 items-center justify-between">
        <input
          className="w-4/6 md:w-full h-12 border-2 md:border px-4 md:px-2 text-xl md:text-lg font-bold md:font-semibold outline-none md:mb-2 rounded-md"
          placeholder="Title of the story"
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
        />
        <div className="md:container md:flex md:justify-evenly md:items-center">
          <button
            onClick={() => setPreview(!preview)}
            className=" hidden w-28 md:w-20 h-8 bg-green-100 rounded-md hover:bg-green-300 text-green-800 text-md md:text-sm font-medium shadow-sm md:block"
          >
            {preview ? "Edit" : "Preview"}
          </button>
          <button
            onClick={() => history.push("/")}
            className="w-28 md:w-20 h-8 bg-yellow-100 rounded-md hover:bg-yellow-300 text-yellow-800 text-md md:text-sm  font-medium shadow-sm mx-2 md:mx-0"
          >
            Cancel
          </button>
          <button
            disabled={!title && !value}
            onClick={onSave}
            className="w-28 md:w-20 h-8 bg-blue-200 rounded-md hover:bg-blue-300  text-blue-800 text-md md:text-sm  capitalize font-medium shadow-sm"
          >
            publish
          </button>
        </div>
      </div>
      <div className="md:block hidden">
        <MDEditor
          preview={preview ? "preview" : "edit"}
          hideToolbar="true"
          height={600}
          value={value}
          onChange={setValue}
        />
      </div>
      <div className="md:hidden block">
        <MDEditor height={500} value={value} onChange={setValue} />
      </div>
    </div>
  );
};

export default Editor;
