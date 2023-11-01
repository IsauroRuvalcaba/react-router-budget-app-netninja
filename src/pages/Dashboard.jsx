// rrd imports
import { json, useLoaderData } from "react-router-dom";

// helper functions
import { createBudget, fetchData, waait } from "../helpers";

//comonent
import Intro from "../components/Intro";
import { toast } from "react-toastify";
import AddBudgetForm from "../components/AddBudgetForm";

// loader
//? this function fetches data for a route before it is rendered. its in createBrowserRouter in app.js so its accessible from the element
export function dashboardLoader() {
  const userName = fetchData("userName");
  const budgets = fetchData("budgets");

  return { userName, budgets };
}

//action
export async function dashboardAction({ request }) {
  await waait();

  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  // new user submission
  if (_action === "newUser") {
    try {
      localStorage.setItem("userName", JSON.stringify(values.userName));
      return toast.success(`Welcome, ${values.userName}`);
    } catch (e) {
      throw new Error("There was a problem creating your account.");
    }
  }

  if (_action === "createBudget") {
    try {
      // create budget
      createBudget({ name: values.newBudget, amount: values.newBudgetAmount });

      return toast.success("Budget created!");
    } catch (e) {
      throw new Error("There was a problem creating your budget.");
    }
  }
}

const Dashboard = () => {
  const { userName, budgets } = useLoaderData(); // this is from the loader above

  return (
    <>
      {userName ? (
        <div className="dashboard">
          <h1>
            Welcome back, <span className="accent">{userName}</span>
          </h1>
          <div className="grid-sm">
            {/* {budgets ? () : ()} */}
            <div className="grid-lg">
              <div className="flex-lg">
                <AddBudgetForm />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Intro />
      )}
    </>
  );
};
export default Dashboard;
