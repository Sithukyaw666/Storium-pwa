import React from "react";
import MDEditor from "@uiw/react-md-editor";
import { useQuery } from "@apollo/client";
import { GET_STORY_BY_ID } from "../gql/query";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

const StoryView = () => {
  const { id } = useParams();
  const { data } = useQuery(GET_STORY_BY_ID, {
    variables: { id: id },
  });

  return (
    <div className="w-1/2 ml-auto mr-auto p-8 bg-white md:w-full md:p-4">
      {data ? (
        <>
          <div className="mb-8">
            <p className="text-4xl font-extrabold mb-8 capitalize md:text-3xl">
              {data.getStoryById.title}
            </p>
            <div className="flex items-center justify-between md:flex-col md:items-start">
              <p className=" font-bold text-base text-gray-600">
                Author :{" "}
                <Link to={`/profile/${data.getStoryById.authorID}`}>
                  <span className="hover:text-blue-500 capitalize">
                    {data.getStoryById.author.username}
                  </span>
                </Link>
              </p>

              <p className="text-gray-600 text-sm font-semibold">
                Published on :{" "}
                <span className="text-blue-500">
                  {new Date(Number(data.getStoryById.createdAt)).toDateString()}
                </span>
              </p>
            </div>
          </div>
          <hr />
          <MDEditor.Markdown
            className="font-normal text-md text-gray-800"
            source={data.getStoryById.content}
          />
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
