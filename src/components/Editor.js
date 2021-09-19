import React, { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { useMutation } from "@apollo/client";
import { CREATE_STORY } from "../gql/mutation";
import { useHistory } from "react-router-dom";
import { GET_STORY } from "../gql/query";

const Editor = () => {
  const [createStory] = useMutation(CREATE_STORY);
  const history = useHistory();
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [preview, setPreview] = useState(false);
  const onSave = () => {
    createStory({
      variables: { title: title, content: value },
      update: (cache, result) => {
        const data = cache.readQuery({
          query: GET_STORY,
        });
        cache.writeQuery({
          query: GET_STORY,
          data: {
            getAllStory: [...data.getAllStory, result.data.createStory],
          },
        });
        history.push("/");
      },
    });
  };

  return (
    <div className="w-full  px-40 md:p-2 z-auto">
      <div className="w-full ml-auto sticky top-14 h-14 flex md:flex-col md:h-auto  md:mb-4 items-center justify-between">
        <input
          className="w-4/6 md:w-full h-12 border-2 md:border px-4 md:px-2 text-xl md:text-lg font-bold md:font-semibold outline-none md:mb-2 rounded-md"
          placeholder="Title of the story"
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
        />
        <div className="md:container md:flex md:justify-evenly md:items-center">
          <button
            disabled={value === ""}
            onClick={() => setPreview(!preview)}
            className={`hidden w-28 md:w-20 h-8 bg-green-100 rounded-md   ${
              value === "" ? "text-green-400" : "text-green-800"
            } hover:bg-green-300  text-md md:text-sm font-medium shadow-sm md:block`}
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
            disabled={value === "" || title === ""}
            onClick={onSave}
            className={`w-28 md:w-20 h-8 bg-blue-200 rounded-md hover:bg-blue-300   ${
              value === "" || title === "" ? "text-blue-400" : "text-blue-800"
            } text-md md:text-sm  capitalize font-medium shadow-sm  ${
              value === "" || title === ""
                ? "cursor-not-allowed"
                : "cursor-pointer"
            }`}
          >
            publish
          </button>
        </div>
      </div>
      <div className="md:block hidden">
        <MDEditor
          preview={preview ? "preview" : "edit"}
          hideToolbar="true"
          height={500}
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
