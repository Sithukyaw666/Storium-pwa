import React, { useEffect, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { useQuery } from "@apollo/client";
import { GET_STORY_BY_ID } from "../gql/query";
import { useParams } from "react-router";
import { Link, useHistory } from "react-router-dom";
import { createProfile } from "../utils/profile";
import ReactButton from "./ReactButton";
import ShareButton from "./ShareButton";
import CommentBox from "./CommentBox";
import { useAuth } from "../hooks/auth";
import AlertModal from "./AlertModal";

const StoryView = () => {
  const { id } = useParams();
  const user = useAuth();
  const history = useHistory();
  const [open, setOpen] = useState(false);

  const { data, refetch } = useQuery(GET_STORY_BY_ID, {
    variables: { id: id },
  });
  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div className="w-1/2 ml-auto mr-auto p-8 bg-white md:w-full md:p-2">
      {data ? (
        <>
          <AlertModal open={open} setOpen={setOpen} id={id} />
          <div className="mb-8">
            <p className="text-4xl font-extrabold mb-8 md:mb-4 text-gray-800  capitalize md:text-2xl md:font-bold ">
              {data.getStoryById.title}
            </p>
            <div className={`flex items-center container justify-between`}>
              <div className="flex items-start justify-between flex-col  ">
                <Link
                  to={`/profile/${data.getStoryById.authorID}`}
                  className="flex items-center"
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: createProfile(data.getStoryById.authorID),
                    }}
                    className="w-12 h-12 md:w-8 md:h-8"
                  ></div>
                  <p className="px-4 md:px-2 hover:text-blue-500 capitalize font-bold text-gray-700">
                    {" "}
                    {data.getStoryById.author.username}
                  </p>
                </Link>

                <p className="text-gray-500 text-sm font-semibold">
                  Published on :{" "}
                  {new Date(Number(data.getStoryById.createdAt)).toDateString()}
                </p>
              </div>
              {user?.id === data.getStoryById.authorID && (
                <div className="flex items-center ">
                  <button
                    onClick={() => history.push(`/update/${id}`)}
                    className="bg-green-200  mx-2  text-green-700 rounded-sm p-1  text-base font-semibold capitalize"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => setOpen(true)}
                    className="bg-red-200 text-red-700 rounded-sm p-1 text-base font-semibold capitalize"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>
          <hr />
          <MDEditor.Markdown
            className="  text-gray-800 md:text-md"
            source={data.getStoryById.content}
          />

          <div className="container flex justify-around items-center h-10 border rounded mt-2">
            {user?.id && <ReactButton id={id} user={user.id} data={data} />}
            <ShareButton id={id} title={data.getStoryById.title} />
          </div>

          <CommentBox id={id} user={user?.id} data={data} />
        </>
      ) : (
        <>
          <div className="mb-8 animate-pulse">
            <div className="container h-12 rounded-lg bg-gray-200 mb-8"></div>
            <div className="flex items-center justify-between md:flex-col md:items-start">
              <div className="bg-gray-200 w-32 h-4 rounded mb-2"></div>
              <div className="bg-gray-200 w-36 h-4 rounded"></div>
            </div>
          </div>
          <hr />
          <div className="container animate-pulse ">
            <div className="container h-4 mb-2 bg-gray-200"></div>
            <div className="container h-4  mb-2 bg-gray-200"></div>
            <div className="container h-4  mb-2 bg-gray-200"></div>
            <div className="container h-4  mb-2 bg-gray-200"></div>
            <div className="container h-4 bg-gray-200"></div>
          </div>
        </>
      )}
    </div>
  );
};
export default StoryView;
