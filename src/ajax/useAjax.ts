import { apiKey } from "./../App";
import { useCallback, useState } from "react";
import { IMarvelResponse } from "../App";

export const useFetchAjax = () => {
  const [ajaxData, setAjaxData] = useState<IMarvelResponse[]>();

  const fetchAjaxData = useCallback(() => {
    var xhttp = new XMLHttpRequest();

    xhttp.open(
      "GET",
      `https://gateway.marvel.com:443/v1/public/characters?apikey=${apiKey}`,
      true
    );
    xhttp.send();
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        if (JSON.parse(xhttp.response).data.results as IMarvelResponse[]) {
          setAjaxData(
            JSON.parse(xhttp.response).data.results as IMarvelResponse[]
          );
        }
      }
    };
  }, []);

  return {
    fetchAjaxData,
    ajaxData,
  };
};
