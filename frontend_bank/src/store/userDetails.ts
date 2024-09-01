import { atom } from "recoil";
export const userDetails = atom({
  key: "userDetails",
  default: {
    user_identifier: "",
    token: "",
    amount: 0,
  },
});
