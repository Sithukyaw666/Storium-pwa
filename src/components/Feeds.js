import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { GET_STORY } from "../gql/query";

const Feeds = () => {
  const { data, refetch } = useQuery(GET_STORY);

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div className="w-1/2 m-auto  px-8 py-4 md:w-full md:px-4 ">
      {data ? (
        data.getAllStory.map((d) => (
          <Link key={d.id} to={`/story/${d.id}`}>
            <div className="w-full bg-blue-100  mr-auto ml-auto mb-4 px-4 py-2 flex justify-between flex-col border-2 rounded-md">
              <p className="text-3xl font-extrabold font-sans mb-8 text-gray-800 cursor-pointer capitalize hover:text-blue-500 md:text-2xl">
                {d.title}
              </p>
              <div>
                <p className="text-gray-600 text-sm font-semibold">
                  Published on : {new Date(Number(d.createdAt)).toDateString()}
                </p>
                <Link to={`/profile/${d.authorID}`}>
                  <p className="font-semibold capitalize text-md text-gray-800 hover:text-blue-500">
                    {d.author.username}
                  </p>
                </Link>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <>
          {[0, 0, 0, 0].map((d) => (
            <div className="w-full bg-blue-100  mr-auto ml-auto mb-4 animate-pulse px-4 py-2 flex justify-between flex-col border-2 rounded-md">
              <div className="container h-8 bg-blue-200 rounded-lg  mb-8"></div>
              <div>
                <div className="w-40 h-4 bg-blue-200 mb-2 rounded-sm"></div>
                <div className="w-36 h-6 bg-blue-200 rounded"></div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Feeds;
