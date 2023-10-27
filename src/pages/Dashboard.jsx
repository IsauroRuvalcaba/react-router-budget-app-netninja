// rrd imports
import { json, useLoaderData } from "react-router-dom";

// helper functions
import { fetchData } from "../helpers";

//comonent
import Intro from "../components/Intro";
import { toast } from "react-toastify";

// loader
export function dashboardLoader() {
  const userName = fetchData("userName");

  return { userName };
}

//action
export async function dashboardAction({ request }) {
  const data = await request.formData();
  const formData = Object.fromEntries(data);
  try {
    localStorage.setItem("userName", JSON.stringify(formData.userName));
    return toast.success(`Welcom, ${formData.userName}`);
  } catch (e) {
    throw new Error("There was a problem creating your account.");
  }
}

const Dashboard = () => {
  const { userName } = useLoaderData();

  return <>{userName ? <p>{userName}</p> : <Intro />}</>;
};
export default Dashboard;
