import { useCallback, useState } from "react";
import { IPostResponse } from "../models/IPostResponse";

export const useFetchAjax = () => {
  const [ajaxData, setAjaxData] = useState<IPostResponse[]>();

  const fetchAjaxData = useCallback(() => {
    var xhttp = new XMLHttpRequest();

    xhttp.open("GET", `https://jsonplaceholder.typicode.com/posts`, true);
    xhttp.send();
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        if (JSON.parse(xhttp.response) as IPostResponse[]) {
          setAjaxData(JSON.parse(xhttp.response) as IPostResponse[]);
        }
      }
    };
  }, []);

  return {
    fetchAjaxData,
    ajaxData,
  };
};
