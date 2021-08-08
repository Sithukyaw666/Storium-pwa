import React from "react";
import { useMutation } from "@apollo/client";
import { useRecoilState } from "recoil";
import { useHistory } from "react-router";
import { isLogin } from "../shared/user.state";
import { LOGOUT } from "../gql/mutation";

const Logout = () => {
  const [login, setLogin] = useRecoilState(isLogin);
  const history = useHistory();
  const [logout] = useMutation(LOGOUT);

  const onLogout = async () => {
    await logout();
    try {
      setLogin(!login);
      history.push("/");
    } catch {}
  };
  // const setLogout = () => {};
  // data && setLogout();
  return (
    <button
      onClick={onLogout}
      className="w-36 h-9 bg-red-500 rounded-md font-bold capitalize text-base hover:bg-red-600 text-white"
    >
      logout
    </button>
  );
};
export default Logout;
