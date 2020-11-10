import React, { useEffect } from "react";
import { useUserDispatch } from "../../stores/user";

const GithubCallbackPage = ({ location }) => {
  const token = location;
  console.log(token);
  useEffect(() => {
    console.log("aa");
  });
  return <>ㅇㄹㅇㄹㅇㄹ</>;
};

export default GithubCallbackPage;
