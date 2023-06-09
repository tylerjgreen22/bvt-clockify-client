import React, { useState } from "react";
import { generateCSV, downloadCSV } from "../api/api";

type OptionObject = {
  Project: string;
};

type GenerateCSVProps = {
  options: OptionObject[];
};

export default function GenerateCSV(props: GenerateCSVProps) {
  const [csvOptions, setCSVOptions] = useState<string[]>([]);
  const { options } = props;
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [downloadDisabled, setDownloadDisabled] = useState(true);

  // Sets the checked options into state
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (event.target.checked) {
      setCSVOptions((prevOptions) => {
        return [...prevOptions, value];
      });
    } else {
      setCSVOptions((prevOptions) => {
        return prevOptions.filter((option) => option !== value);
      });
    }
  };

  // Generates a CSV on the backend based on the checked options
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    if (csvOptions.length) {
      const message = await generateCSV(csvOptions);

      setMessage(message.message);
      setDownloadDisabled(false);
    } else {
      console.log("No cohort selected");
    }

    setLoading(false);
  };

  // Downloads the csv generated on the backend
  const handleDownload = async () => {
    const res = await downloadCSV();

    if (res) {
      const blob = new Blob([res.data], { type: "application/octet-stream" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `master.csv`;

      document.body.appendChild(link);
      link.click();

      URL.revokeObjectURL(url);
      document.body.removeChild(link);
      setLoading(false);
    }
    setDownloadDisabled(true);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <form onSubmit={onSubmit} className="bottom-spacer">
        <div className="checkbox-container | bottom-spacer">
          {options.length
            ? options.map((option, idx: number) => (
                <label htmlFor={`checkbox ${idx}`} key={idx}>
                  <input
                    key={idx}
                    className="checkbox"
                    name={`checkbox ${idx}`}
                    type="checkbox"
                    id={`checkbox ${idx}`}
                    onChange={onChange}
                    value={option.Project}
                    checked={csvOptions.includes(option.Project)}
                  ></input>
                  {option.Project}
                </label>
              ))
            : null}
        </div>
        <div className="button-container">
          <button className="button">Generate CSV</button>
        </div>
      </form>
      <div className="button-container">
        {message && <p className="bottom-spacer">{message}</p>}
        <button
          className={downloadDisabled ? "button-disabled" : "button"}
          onClick={handleDownload}
          disabled={downloadDisabled}
        >
          Download CSV
        </button>
      </div>
    </div>
  );
}
