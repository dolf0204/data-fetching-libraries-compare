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
import { SteppedLineTo } from "react-lineto";
import { useFetchSuperagent } from "./superagent/useSuperAgent";
import { useCrossFetch } from "./cross-fetch/useCrossFetch";

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
  const { fetchSuperagentData, superagentData } = useFetchSuperagent();
  const { fetchCrossFetchData, crossFetchData } = useCrossFetch();

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
    if (superagentData) {
      setTableData(
        Array.isArray(superagentData) ? superagentData : [superagentData]
      );
      setShouldSWRFetch(false);
    }
  }, [superagentData]);

  useEffect(() => {
    if (crossFetchData) {
      setTableData(
        Array.isArray(crossFetchData) ? crossFetchData : [crossFetchData]
      );
      setShouldSWRFetch(false);
    }
  }, [crossFetchData]);

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
            className="superagent-button"
            children={"GET ALL SUPERAGENT"}
            onClick={fetchSuperagentData}
          ></FetchButton>
          <FetchButton
            className="cross-fetch-button"
            children={"POST CROSS FETCH"}
            onClick={fetchCrossFetchData}
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
        <SteppedLineTo
          from="ajax-button"
          to="superagent-button"
          fromAnchor="bottom"
          toAnchor="top"
          {...style}
        />
        <SteppedLineTo
          from="ajax-button"
          to="cross-fetch-button"
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
