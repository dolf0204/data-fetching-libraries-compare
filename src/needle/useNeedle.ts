// import needle, { NeedleResponse } from "needle";
import { useState, useCallback } from "react";
import { IPostResponse } from "../models/IPostResponse";
// var needle = require("needle");

export const useFetchNeedle = () => {
  const [needleData, setNeedleData] = useState<IPostResponse[]>();

  const fetchNeedleData = useCallback(async () => {
    // needle.get(
    //   "https://jsonplaceholder.typicode.com/posts",
    //   function (error: any, response: any) {
    //     debugger;
    //     if (!error && response.statusCode == 200) {
    //       setNeedleData(response.body as IPostResponse[]);
    //     }
    //     if (error) {
    //       console.log(error);
    //     }
    //   }
    // );
  }, []);

  return {
    fetchNeedleData,
    needleData,
  };
};
