import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { REGISTER_USER } from "../gql/mutation";

const Register = () => {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerUser, { data }] = useMutation(REGISTER_USER);
  const onSubmit = (e) => {
    e.preventDefault();
    registerUser({
      variables: { username: username, email: email, password: password },
    });
  };

  if (data?.createUser?.user) {
    history.push("/login");
  }

  return (
    <div className="md:w-full p-8 w-4/12 shadow-lg rounded-lg h-96 ml-auto md:mt-20 mr-auto mt-32 flex flex-col justify-center items-center bg-gray-100">
      <p className="text-blue-500 font-bold text-3xl mb-4">Register</p>
      <form
        className="container h-60 flex justify-around items-center flex-col "
        onSubmit={onSubmit}
      >
        <input
          className="w-80 h-11 outline-none border-2 rounded-lg border-blue-400 p-4"
          type="text"
          placeholder="username"
          required
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="w-80 h-11 outline-none border-2 rounded-lg border-blue-400 p-4"
          type="email"
          placeholder="email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-80 h-11 outline-none border-2 rounded-lg border-blue-400 p-4"
          type="password"
          placeholder="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        {data?.createUser?.error && (
          <p className="text-red-500 font-medium ">{data.createUser.error}</p>
        )}
        <button
          type="submit"
          className="w-40 md:w-28 h-9 bg-blue-200 rounded-lg text-blue-700 font-semibold uppercase hover:bg-blue-300"
        >
          submit
        </button>
      </form>
    </div>
  );
};

export default Register;
