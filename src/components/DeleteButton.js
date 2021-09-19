import { useMutation } from "@apollo/client";
import React from "react";
import { useHistory } from "react-router-dom";
import { DELETE_STORY } from "../gql/mutation";
import { GET_STORY } from "../gql/query";

const DeleteButton = ({ id }) => {
  const history = useHistory();
  const [deleteStory] = useMutation(DELETE_STORY);
  const onDelete = () => {
    deleteStory({
      variables: { id },
      update: (cache, result) => {
        const data = cache.readQuery({
          query: GET_STORY,
        });
        cache.writeQuery({
          query: GET_STORY,
          data: {
            getAllStory: data.getAllStory.filter(
              (s) => s.id !== result.data.deleteStory.id
            ),
          },
        });
        history.push("/");
      },
    });
  };
  return (
    <button
      type="button"
      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
      onClick={onDelete}
    >
      Delete
    </button>
  );
};

export default DeleteButton;
