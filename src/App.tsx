import { useEffect, useState } from "react";
import "./App.css";
import FetchButton from "./components/Button";
import DataTable from "react-data-table-component";
import { useFetchAjax } from "./ajax/useAjax";

export interface IMarvelResponse {
  name: string;
  id: number;
  description: string;
}

const columns = [
  {
    name: "Id",
    selector: (row: any) => row.id,
  },
  {
    name: "Name",
    selector: (row: any) => row.name,
  },
  {
    name: "Description",
    selector: (row: any) => row.description,
  },
];

export const apiKey = "ca7453b7d40f3aaf4b96dcfe27419d32";

function App() {
  const [data, setData] = useState<IMarvelResponse[]>();
  const { fetchAjaxData, ajaxData } = useFetchAjax();

  useEffect(() => {
    if (ajaxData) {
      setData(ajaxData);
    }
  }, [ajaxData]);

  return (
    <div className="App">
      <header className="App-header">
        <FetchButton
          children={"FETCH AJAX"}
          onClick={fetchAjaxData}
        ></FetchButton>
      </header>
      <DataTable columns={columns} data={data ?? []} />
    </div>
  );
}

export default App;
