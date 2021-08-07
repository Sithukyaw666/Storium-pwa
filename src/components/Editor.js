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
  const onSave = () => {
    createStory({
      variables: { title: title, content: value },
    });
    try {
      history.push("/");
    } catch {}
  };

  return (
    <div className="w-full  px-40">
      <div className="w-full ml-auto sticky top-14 h-14 flex items-center justify-between">
        <input
          className="w-4/6 h-12 border-2 px-4 text-xl font-bold outline-none uppercase rounded-md"
          placeholder="Title of the story"
          onChange={(e) => setTitle(e.target.value)}
        />
        <button className="w-28 h-8 bg-yellow-200 rounded-md hover:bg-yellow-300 text-md font-medium shadow-sm">
          Cancel
        </button>
        <button
          onClick={onSave}
          className="w-28 h-8 bg-blue-500 rounded-md hover:bg-blue-600 text-white text-md font-medium shadow-sm"
        >
          Save
        </button>
      </div>
      <MDEditor height={500} value={value} onChange={setValue} />
    </div>
  );
};

export default Editor;
