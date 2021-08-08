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
      {data && (
        <>
          <div className="mb-8">
            <p className="text-4xl font-extrabold mb-8 capitalize">
              {data.getStoryById.title}
            </p>
            <div className="flex items-center justify-between">
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
            className="font-normal text-lg text-gray-800"
            source={data.getStoryById.content}
          />
        </>
      )}
    </div>
  );
};
export default StoryView;
