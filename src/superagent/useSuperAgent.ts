import { useState, useCallback } from "react";
import { IPostResponse } from "../models/IPostResponse";
import superagent, { Response, ResponseError } from "superagent";

export const useFetchSuperagent = () => {
  const [superagentData, setSuperagentData] = useState<IPostResponse[]>();

  const fetchSuperagentData = useCallback(async () => {
    superagent
      .get("https://jsonplaceholder.typicode.com/posts")
      .end((err: ResponseError, res: Response) => {
        if (res.statusCode === 200) {
          setSuperagentData(res.body as IPostResponse[]);
        }
        if (err) {
          console.log(err);
        }
      });
  }, []);

  return {
    superagentData,
    fetchSuperagentData,
  };
};
