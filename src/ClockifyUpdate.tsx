import { useState } from "react";
import { updateClockifyHours, getProjects } from "../api/api";

type Props = {
  setOptions: React.Dispatch<
    React.SetStateAction<
      {
        Project: string;
      }[]
    >
  >;
};

export default function ClockifyUpdate(props: Props) {
  const [clockifyForm, setClockifyForm] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const { setOptions } = props;

  // Grabs the file and sets it in state
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setClockifyForm(file);
  };

  // Submits the file to the server and sets the response message
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData();

    if (clockifyForm) {
      formData.append("file", clockifyForm);
      const res = await updateClockifyHours(formData);
      const options = await getProjects();

      setLoading(false);
      setResponse(res.message);
      setOptions(options);
    } else {
      console.log("No file uploaded");
    }

    setLoading(false);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <form onSubmit={onSubmit} className="file-container | bottom-spacer">
        <label htmlFor="file">Clockify CSV</label>
        <input
          type="file"
          name="file"
          id="file"
          className="file"
          onChange={onChange}
          required
        />
        <button className="button">Submit</button>
      </form>
      {response && <p className="bottom-spacer">{response}</p>}
    </div>
  );
}
