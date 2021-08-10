import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useHistory, Link } from "react-router-dom";
import { LOGIN_USER } from "../gql/mutation";
import { useRecoilState } from "recoil";
import { isLogin } from "../shared/user.state";

const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginUser, { data }] = useMutation(LOGIN_USER);
  const [login, setLogin] = useRecoilState(isLogin);
  const onSubmit = async (e) => {
    e.preventDefault();
    await loginUser({
      variables: { email: email, password: password },
    });
  };

  if (data?.loginUser?.user) {
    setLogin(!login);
    history.push("/");
  }

  return (
    <div className="md:w-full p-8 w-4/12 shadow-lg rounded-lg h-96 ml-auto mr-auto mt-32 flex flex-col justify-center items-center bg-gray-100">
      <p className="text-blue-500 font-bold text-3xl mb-4">Login</p>
      <form
        className="container h-60 flex justify-around items-center flex-col relative"
        onSubmit={onSubmit}
      >
        <input
          className="w-80 h-11 outline-none border-2 rounded-lg border-blue-400 p-4"
          type="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="w-80 h-11 outline-none border-2 rounded-lg border-blue-400 p-4"
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {data?.loginUser?.error && (
          <p className="text-red-500 font-medium ">{data.loginUser.error}</p>
        )}
        <button
          disabled={!email && !password}
          type="submit"
          className="w-40 h-9 bg-blue-500 rounded-lg text-white font-semibold uppercase hover:bg-blue-600 "
        >
          submit
        </button>
        <Link to="/register">
          <p className="font-medium text-base hover:text-blue-400 cursor-pointer ">
            new user
          </p>
        </Link>
      </form>
    </div>
  );
};

export default Login;
