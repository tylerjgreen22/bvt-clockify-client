import { useEffect, useState } from "react";
import MasterUpdate from "./MasterUpdate";
import ClockifyUpdate from "./ClockifyUpdate";
import GenerateCSV from "./GenerateCSV";
import { getProjects } from "../api/api";

function App() {
  const [options, setOptions] = useState([{ Project: "" }]);

  // Grabs the available projects to populate the checkboxes
  useEffect(() => {
    const fetchData = async () => {
      const res = await getProjects();

      setOptions(res);
    };

    fetchData();
  }, []);

  // Updates the database and returns who is in the wrong cohort

  return (
    <div className="container">
      <img className="img | bottom-spacer" src="./src/assets/logo.png" />
      <h1 className="title">Clockify CSV Upload</h1>
      <hr className="bottom-spacer"></hr>
      <div className="upload-container">
        <MasterUpdate />
        <ClockifyUpdate setOptions={setOptions} />
        <hr className="bottom-spacer"></hr>
        <GenerateCSV options={options} />
      </div>
    </div>
  );
}

export default App;
