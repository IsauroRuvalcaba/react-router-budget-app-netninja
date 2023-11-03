import React from "react";
import {
  formatCurrency,
  formatDatetoLocaleString,
  getAllMatchingItems,
} from "../helpers";
import { Link, useFetcher } from "react-router-dom";
import { TrashIcon } from "@heroicons/react/24/solid";

const ExpenseItem = ({ expense }) => {
  const fetcher = useFetcher(); // this is better to include multiple submits in one request

  const budget = getAllMatchingItems({
    category: "budgets",
    key: "id",
    value: expense.budgetId,
  })[0];
  console.log("ExpenseItem budget", budget);

  return (
    <>
      <td>{expense.name}</td>
      <td>{formatCurrency(expense.amount)}</td>
      <td>{formatDatetoLocaleString(expense.createdAt)}</td>
      <td>
        <Link to={`/budget/${budget.id}`} style={{ "--accent": budget.color }}>
          {budget.name}
        </Link>
      </td>
      <td>
        <fetcher.Form method="post">
          {/* passing 2 different infos on this form to properly delete */}
          <input type="hidden" name="_action" value="deleteExpense" />
          <input type="hidden" name="expenseId" value={expense.id} />
          <button
            type="submit"
            className="btn btn--warning"
            aria-aria-label={`Delete ${expense.name} expense`}
          >
            <TrashIcon width={20} />
          </button>
        </fetcher.Form>
      </td>
    </>
  );
};

export default ExpenseItem;
