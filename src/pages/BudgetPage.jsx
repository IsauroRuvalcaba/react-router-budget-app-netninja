import { useLoaderData } from "react-router-dom";

// components
import BudgetItem from "../components/BudgetItem";
import AddExpenseForm from "../components/AddExpenseForm";
import Table from "../components/Table";

import { createExpense, deleteItem, getAllMatchingItems } from "../helpers";
import { toast } from "react-toastify";

//loader
export async function budgetLoader({ params }) {
  const budget = await getAllMatchingItems({
    category: "budgets",
    key: "id",
    value: params.id, //comes from the child path in app.js router
  })[0];

  const expenses = await getAllMatchingItems({
    category: "expenses",
    key: "budgetId",
    value: params.id, //comes from the child path in app.js router
  });

  //this is if id parameter dosen't exist - wrong id parameter
  if (!budget) {
    throw new Error("The budget you're trying to find dosen't exist");
  }
  return { budget, expenses };
}

//action -- has to be added to BudgetPage element child in App.js
export async function budgetAction({ request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);
  //rememeber, request & params are object automatically pulled because they are loaders or actions in the app.js router function

  if (_action === "createExpense") {
    try {
      // helper function to store in local storage
      createExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        budgetId: values.newExpenseBudget, //passed in loader above -> AddExpenseForm element -> then through props
      });

      return toast.success(`Expense ${values.newExpense} created!`);
    } catch (e) {
      throw new Error("There was a problem creating your expense.");
    }
  }

  // this deleteExpense is from first <input type="hidden"
  if (_action === "deleteExpense") {
    try {
      // helper function to delete single expense in
      deleteItem({
        key: "expenses",
        id: values.expenseId, // this is from second <input type="hidden"
      });

      return toast.success("Expense deleted!");
    } catch (e) {
      throw new Error("There was a problem deleting your expense.");
    }
  }
}

const BudgetPage = () => {
  const { budget, expenses } = useLoaderData(); // this hook is how you pull data from loader
  return (
    <div
      className="grid-lg"
      style={{
        "--accent": budget.color,
      }}
    >
      <h1 className="h2">
        <span className="accent">{budget.name}</span> Overview
      </h1>
      <div className="flex-lg">
        {/* added this showDelete for somethis  */}
        <BudgetItem budget={budget} showDelete={true} />{" "}
        <AddExpenseForm budgets={[budget]} />
      </div>
      {expenses && expenses.length > 0 && (
        <div className="grid-md">
          <h2>
            <span className="accent">{budget.name}</span> Expenses
          </h2>
          <Table expenses={expenses} showBudget={false} />{" "}
          {/*showBudget added to remove budget button on this table */}
        </div>
      )}
    </div>
  );
};

export default BudgetPage;
