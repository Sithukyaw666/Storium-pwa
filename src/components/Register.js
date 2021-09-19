import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { REGISTER_USER } from "../gql/mutation";

const Register = () => {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showpassword, setShowpassword] = useState(false);
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
    <div className="md:w-full  w-4/12 h-full ml-auto md:mt-0 mr-auto  flex flex-col justify-center items-center ">
      <p className="text-blue-500 font-bold text-3xl mb-2 py-8">Register</p>
      <form className="md:container w-2/3  p-4" onSubmit={onSubmit}>
        <div className="my-4">
          <label
            htmlFor="username"
            className="text-base font-semibold capitalize"
          >
            username
          </label>
          <input
            className="w-full rounded-lg mt-2 focus:border-blue-400 focus:ring-blue-400 outline-none"
            type="text"
            placeholder="username"
            required
            onChange={(e) => setUsername(e.target.value)}
            id="username"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="text-base font-semibold capitalize">
            email
          </label>
          <input
            className="w-full rounded-lg mt-2 focus:border-blue-400 focus:ring-blue-400 outline-none"
            type="email"
            placeholder="email"
            required
            onChange={(e) => setEmail(e.target.value)}
            id="email"
          />
        </div>
        <div className="mb-2">
          <label
            htmlFor="password"
            className="text-base font-semibold capitalize"
          >
            password
          </label>
          <input
            className="w-full rounded-lg mt-2 focus:border-blue-400 focus:ring-blue-400 outline-none"
            type={showpassword ? "text" : "password"}
            placeholder="password"
            required
            onChange={(e) => setPassword(e.target.value)}
            id="password"
          />
        </div>
        <div className="space-x-3 mb-2 ">
          <input
            type="checkbox"
            className="text-blue-500 ring-blue-500 rounded-full"
            id="show-password"
            onChange={() => setShowpassword(!showpassword)}
          />
          <label
            htmlFor="show-password"
            className="text-sm font-semibold capitalize"
          >
            show password
          </label>
        </div>
        {data?.createUser?.error && (
          <p className="text-red-500 font-medium ">{data.createUser.error}</p>
        )}
        <button
          type="submit"
          className="w-40 mt-4 md:w-full h-10 bg-blue-500 rounded-lg text-white font-semibold uppercase hover:bg-blue-600"
        >
          submit
        </button>
      </form>
    </div>
  );
};

export default Register;
