import ky from "ky";
import { useState, useCallback } from "react";
import { IPostResponse } from "../models/IPostResponse";

export const useFetchKy = () => {
  const [kyData, setKyData] = useState<IPostResponse[]>();

  const fetchKyData = useCallback(async () => {
    const response = await ky
      .put("https://jsonplaceholder.typicode.com/posts/1", {
        json: { id: 1, title: "foo", body: "bar", userId: 1 },
      })
      .json<IPostResponse[]>();

    if (response) {
      setKyData(response);
    }
  }, []);

  return {
    fetchKyData,
    kyData,
  };
};
