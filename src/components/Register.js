import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { REGISTER_USER } from "../gql/mutation";

const Register = () => {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerUser] = useMutation(REGISTER_USER);
  const onSubmit = (e) => {
    e.preventDefault();
    registerUser({
      variables: { username: username, email: email, password: password },
    });
    try {
      history.push("/login");
    } catch {}
  };

  return (
    <div className="w-full h-4/5 flex flex-col justify-center items-center">
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
        <button
          type="submit"
          className="w-40 h-9 bg-blue-500 rounded-lg text-white font-semibold uppercase hover:bg-blue-600"
        >
          submit
        </button>
      </form>
    </div>
  );
};

export default Register;
