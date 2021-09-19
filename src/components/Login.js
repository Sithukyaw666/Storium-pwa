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
  const [showpassword, setShowpassword] = useState(false);
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
    <div className="md:w-full   w-4/12 rounded-lg py-8 ml-auto mr-auto  md:mt-0 flex flex-col justify-center items-center ">
      <p className="text-blue-500 font-bold text-3xl mb-4 py-8 md:py-2">
        Get Started
      </p>
      <form
        className="md:container w-2/3  justify-around items-center relative px-4"
        onSubmit={onSubmit}
      >
        <div className="my-4">
          <label htmlFor="email" className="capitalize text-base font-semibold">
            email
          </label>
          <input
            className="w-full rounded-lg mt-2 focus:border-blue-400 focus:ring-blue-400 outline-none"
            type="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
            required
            id="email"
          />
        </div>

        <div className="mb-2">
          <label
            htmlFor="password"
            className="capitalize text-base font-semibold"
          >
            password
          </label>
          <input
            className="w-full rounded-lg mt-2 focus:border-blue-400 focus:ring-blue-400"
            type={showpassword ? "text" : "password"}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            required
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
        {data?.loginUser?.error && (
          <p className="text-red-500 font-medium ">{data.loginUser.error}</p>
        )}
        <button
          disabled={!email || !password}
          type="submit"
          className="w-40 md:w-full h-10 mt-4 bg-blue-500   rounded-lg text-white font-semibold  uppercase hover:bg-blue-600 outline-none "
        >
          submit
        </button>
        <Link to="/register">
          <p className="font-medium text-base text-center py-2 text-blue-500 hover:text-blue-400 cursor-pointer ">
            new user
          </p>
        </Link>
      </form>
    </div>
  );
};

export default Login;
