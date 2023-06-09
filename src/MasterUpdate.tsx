import { useState } from "react";
import { updateCohortMembers } from "../api/api";

export default function MasterUpdate() {
  const [masterForm, setMasterForm] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  // Grabs the file and sets it in state
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setMasterForm(file);
  };

  // Submits the file to the server and sets the response message
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData();
    if (masterForm) {
      formData.append("file", masterForm);
      const res = await updateCohortMembers(formData);

      setResponse(res.message);
      setLoading(false);
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
      <form className=" file-container | bottom-spacer" onSubmit={onSubmit}>
        <label htmlFor="file">Member CSV</label>
        <input
          className="file"
          type="file"
          name="file"
          id="file"
          onChange={onChange}
          required
        />
        <button className="button">Submit</button>
      </form>
      {response && <p>{response}</p>}
    </div>
  );
}
