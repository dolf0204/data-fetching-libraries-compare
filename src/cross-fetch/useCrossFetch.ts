import { useState, useCallback } from "react";
import { IPostResponse } from "../models/IPostResponse";
import fetch from "cross-fetch";

export const useCrossFetch = () => {
  const [crossFetchData, setCrossFetchData] = useState<IPostResponse[]>();

  const fetchCrossFetchData = useCallback(async () => {
    await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "foo",
        body: "bar",
        userId: 1,
      }),
    })
      .then((res: Response) => {
        if (res.status !== 201) {
          console.log("Bad response from server");
        }
        return res.json();
      })
      .then((post) => {
        setCrossFetchData(post as IPostResponse[]);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return {
    fetchCrossFetchData,
    crossFetchData,
  };
};
