import { atom } from "recoil";

export const isLogin = atom({
  key: "isLogin",
  default: false,
});
export const isFollow = atom({
  key: "isFollow",
  default: false,
});
