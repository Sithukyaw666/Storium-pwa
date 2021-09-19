import { useQuery } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import { GET_USER_BY_ID } from "../gql/query";

import { createProfile } from "../utils/profile";

const Comment = ({ comment }) => {
  const { data } = useQuery(GET_USER_BY_ID, {
    variables: { id: comment.author },
  });
  const avatar = createProfile(comment.author);
  return (
    <>
      {data && (
        <div className="container my-2  p-1">
          <div className=" container flex items-start ">
            <Link to={`/profile/${comment.author}`}>
              <div
                className="w-8 h-8"
                dangerouslySetInnerHTML={{ __html: avatar }}
              ></div>
            </Link>
            <div className="mx-2 container border-blue-300 border-2 px-1 pb-2 rounded-lg ">
              <Link to={`/profile/${comment.author}`}>
                <p className="text-base pb-2 font-medium text-gray-800">
                  {data.getUserById.username}
                </p>
              </Link>
              <hr />
              <MDEditor.Markdown source={comment.comment} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Comment;
