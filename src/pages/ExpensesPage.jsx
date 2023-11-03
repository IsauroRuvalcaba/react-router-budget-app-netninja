import { useLoaderData } from "react-router-dom";
import { deleteItem, fetchData } from "../helpers";
import Table from "../components/Table";
import { toast } from "react-toastify";

// loader
//? this function fetches data for a route before it is rendered. its in createBrowserRouter in app.js so its accessible from the element
export async function expensesLoader() {
  const expenses = await fetchData("expenses");
  return { expenses };
}

//action -- has to be added to ExpensePage element child in App.js
export async function expensesAction({ request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  //this goes to:  in App.js->ExpensePage->Table->ExpenseItem->fetcher.Form
  //TODO this deleteExpense is from first <input type="hidden"
  if (_action === "deleteExpense") {
    try {
      // helper function to delete single expense in
      deleteItem({
        key: "expenses",
        id: values.expenseId, //TODO this is from second <input type="hidden"
      });

      return toast.success("Expense deleted!");
    } catch (e) {
      throw new Error("There was a problem deleting your expense.");
    }
  }
}

const ExpensesPage = () => {
  const { expenses } = useLoaderData();

  return (
    <div className="grid-lg">
      <h1>All Expenses</h1>
      {expenses && expenses.length > 0 ? (
        <div className="grid-md">
          <h2>
            Recent Expenses <small>({expenses.length} total)</small>
          </h2>
          <Table expenses={expenses} />
        </div>
      ) : (
        <p>No expenses to show</p>
      )}
    </div>
  );
};

export default ExpensesPage;
