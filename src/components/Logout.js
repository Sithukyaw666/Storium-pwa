import React from "react";
import { useMutation } from "@apollo/client";
import { useRecoilState } from "recoil";
import { useHistory } from "react-router";
import { isLogin } from "../shared/user.state";
import { LOGOUT } from "../gql/mutation";

const Logout = ({ link }) => {
  const [login, setLogin] = useRecoilState(isLogin);
  const history = useHistory();
  const [logout, { data }] = useMutation(LOGOUT);

  const onLogout = () => {
    logout();
  };
  if (data?.logout) {
    !data.logout.id && setLogin(!login);
    !data.logout.id && history.push("/");
  }

  return (
    <button
      onClick={onLogout}
      className={`${
        link ? "container" : "w-36 md:w-32"
      } md:h-8 h-9 bg-red-200 rounded-md font-semibold capitalize text-base hover:bg-red-300 text-red-700`}
    >
      logout
    </button>
  );
};
export default Logout;
