import axios from "axios";

const url = "https://bvt-clockify-server.onrender.com";

// Gets the available projects from the database
export const getProjects = async () => {
  try {
    const res = await axios.get(`${url}/getProjects`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

// Updates the cohort member DB
export const updateCohortMembers = async (formData: FormData) => {
  try {
    const res = await axios.post(`${url}/updateCohortMembers`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

// Updates the clockify hours DB
export const updateClockifyHours = async (formData: FormData) => {
  try {
    const res = await axios.post(`${url}/updateClockifyHours`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

// Generates a CSV on the server with the selected CSV options
export const generateCSV = async (csvOptions: string[]) => {
  try {
    const res = await axios.post(`${url}/generateCSV`, { csvOptions });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

// Downloads the last generated CSV from the server
export const downloadCSV = async () => {
  try {
    const res = await axios.get(`${url}/downloadCSV`, { responseType: "blob" });

    return res;
  } catch (error) {
    console.error(error);
  }
};
