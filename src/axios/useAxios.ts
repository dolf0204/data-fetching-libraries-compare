import { useCallback, useState } from "react";
import { IPostResponse } from "../models/IPostResponse";
import axios, { AxiosError, AxiosResponse } from "axios";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";

export const useFetchAxios = () => {
  const [axiosData, setAxiosData] = useState<IPostResponse[]>();

  const fetchAxiosData = useCallback(async () => {
    await axios
      .post<IPostResponse, AxiosResponse>("/posts", {
        title: "foo",
        body: "bar",
        userId: 1,
      })
      .then(function (response) {
        setAxiosData(response.data as IPostResponse[]);
      })
      .catch(function (error: AxiosError) {
        console.log(error);
      });
  }, []);

  return {
    fetchAxiosData,
    axiosData,
  };
};
