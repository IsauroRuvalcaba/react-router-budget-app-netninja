import { toast } from "react-toastify";
import { deleteItem, getAllMatchingItems } from "../helpers";
import { redirect } from "react-router-dom";

export function deleteBudget({ params }) {
  try {
    deleteItem({
      key: "budgets",
      id: params.id, // this is comming from path: "budget/:id" from the App.js
    });

    //TODO -- understand this - it will mess up entire app. It has to do with deleting expenses in one budget.
    const associatedExpenses = getAllMatchingItems({
      category: "expenses",
      key: "budgetId",
      value: params.id,
    });

    associatedExpenses.forEach((expense) => {
      deleteItem({
        key: "expenses",
        id: expense.id,
      });
    });

    toast.success("Budget deleted successfully");
  } catch (e) {
    throw new Error("There was a problem deleting your budget.");
  }

  return redirect("/"); //!remember any action or loader you have to return something or it breaks
}
