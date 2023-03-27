import { useCallback, useEffect, useState } from "react";
import "./App.css";
import FetchButton from "./components/Button";
import DataTable from "react-data-table-component";
import { useFetchAjax } from "./ajax/useAjax";
import { IPostResponse } from "./models/IPostResponse";
import { useFetchAxios } from "./axios/useAxios";
import useSWR from "swr";
import { dataFetcher } from "./fetch/useFetch";
import { useFetchKy } from "./ky/useKy";
import LineTo, { SteppedLineTo } from "react-lineto";
import { useFetchNeedle } from "./needle/useNeedle";

const columns = [
  {
    name: "Id",
    selector: (row: any) => row.id,
  },
  {
    name: "Title",
    selector: (row: any) => row.title,
  },
  {
    name: "Body",
    selector: (row: any) => row.body,
  },
  {
    name: "User id",
    selector: (row: any) => row.userId,
  },
];

function App() {
  const [tableData, setTableData] = useState<IPostResponse[]>();
  const { fetchAjaxData, ajaxData } = useFetchAjax();
  const { fetchAxiosData, axiosData } = useFetchAxios();
  const { fetchKyData, kyData } = useFetchKy();
  const { fetchNeedleData, needleData } = useFetchNeedle();

  const [shouldSWRFetch, setShouldSWRFetch] = useState(false);

  const { data, error } = useSWR(
    shouldSWRFetch && "https://jsonplaceholder.typicode.com/posts/1",
    dataFetcher
  );

  const fetchWithSwr = useCallback(() => {
    setShouldSWRFetch(true);
  }, []);

  useEffect(() => {
    if (ajaxData) {
      setTableData(ajaxData);
      setShouldSWRFetch(false);
    }
  }, [ajaxData]);

  useEffect(() => {
    if (axiosData) {
      setTableData(Array.isArray(axiosData) ? axiosData : [axiosData]);
      setShouldSWRFetch(false);
    }
  }, [axiosData]);

  useEffect(() => {
    if (kyData) {
      setTableData(Array.isArray(kyData) ? kyData : [kyData]);
      setShouldSWRFetch(false);
    }
  }, [kyData]);

  useEffect(() => {
    if (data) {
      setTableData(Array.isArray(data) ? data : [data]);
    }
    if (error) {
      console.log(error);
    }
  }, [data, error]);

  useEffect(() => {
    if (needleData) {
      setTableData(needleData);
      setShouldSWRFetch(false);
    }
  }, [needleData]);

  const style = {
    delay: true,
    borderColor: "#ddd",
    borderStyle: "solid",
    borderWidth: 3,
  };

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <FetchButton
            className="ajax-button"
            children={"GET ALL AJAX"}
            onClick={fetchAjaxData}
          ></FetchButton>
        </div>
        <div className="libraries-container">
          <FetchButton
            className="axios-button"
            children={"POST AXIOS"}
            onClick={fetchAxiosData}
          ></FetchButton>
          <FetchButton
            className="swr-button"
            children={"GET ONE SWR"}
            onClick={fetchWithSwr}
          ></FetchButton>
          <FetchButton
            className="ky-button"
            children={"PUT KY"}
            onClick={fetchKyData}
          ></FetchButton>
          <FetchButton
            className="needle-button"
            children={"GET ALL NEEDLE"}
            onClick={fetchNeedleData}
          ></FetchButton>
        </div>
        <SteppedLineTo
          from="ajax-button"
          to="axios-button"
          fromAnchor="bottom"
          toAnchor="top"
          {...style}
        />
        <SteppedLineTo
          from="ajax-button"
          to="swr-button"
          fromAnchor="bottom"
          toAnchor="top"
          {...style}
        />
        <SteppedLineTo
          from="ajax-button"
          to="ky-button"
          fromAnchor="bottom"
          toAnchor="top"
          {...style}
        />
      </header>
      <DataTable columns={columns} data={tableData ?? []} />
    </div>
  );
}

export default App;
