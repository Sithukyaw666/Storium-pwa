import { useMutation } from "@apollo/client";

import MDEditor from "@uiw/react-md-editor";
import Comment from "./Comment";
import React, { useState } from "react";

import { COMMENT } from "../gql/mutation";

import { useHistory } from "react-router-dom";

const CommentBox = ({ id, user, data }) => {
  const history = useHistory();
  const [value, setValue] = useState("");

  const [preview, setPreview] = useState(false);

  const [comment] = useMutation(COMMENT);
  const onComment = () => {
    comment({
      variables: {
        id: id,
        comment: value,
      },
      update: () => {
        setValue("");
      },
    });
  };

  return (
    <div>
      <div>
        {user ? (
          <>
            <MDEditor
              preview={preview ? "preview" : "edit"}
              hideToolbar="true"
              value={value}
              onChange={setValue}
              height={100}
            />
            <div className="container p-1 flex items-center justify-around">
              <button
                disabled={value === ""}
                onClick={() => setPreview(!preview)}
                className={`w-24 h-8 rounded-md  ${
                  value === ""
                    ? "text-green-300 bg-green-100 "
                    : "text-green-700 bg-green-200 "
                } font-semibold capitalize outline-none  ${
                  value === "" ? "cursor-not-allowed " : "cursor-pointer"
                }`}
              >
                {preview ? "edit" : "preview"}
              </button>
              <button
                disabled={value === ""}
                onClick={onComment}
                className={`w-24 h-8 rounded-md   ${
                  value === ""
                    ? "text-blue-300 bg-blue-100"
                    : "text-blue-700 bg-blue-200"
                } font-semibold capitalize outline-none ${
                  value === "" ? "cursor-not-allowed " : "cursor-pointer"
                }`}
              >
                comment
              </button>
            </div>
          </>
        ) : (
          <div>
            <button
              onClick={() => history.push("/login")}
              className="container h-12 md:h-9 bg-blue-200 text-blue-700 hover:bg-blue-300 rounded font-semibold "
            >
              Sign in to react or comment
            </button>
          </div>
        )}
        <hr className="py-2" />
        <div>
          <p className="text-lg font-bold ">Comments</p>
          {data.getStoryById.comments.length > 0 ? (
            data.getStoryById.comments.map((c) => (
              <Comment comment={c} key={c.id} />
            ))
          ) : (
            <div className="container h-32 flex justify-center items-center">
              <p className="text-lg font-bold text-gray-400">
                Nothing to show here
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default CommentBox;
