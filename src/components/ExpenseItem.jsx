import React from "react";
import { formatCurrency, formatDatetoLocaleString } from "../helpers";

const ExpenseItem = ({ expense }) => {
  return (
    <>
      <td>{expense.name}</td>
      <td>{formatCurrency(expense.amount)}</td>
      <td>{formatDatetoLocaleString(expense.createdAt)}</td>
    </>
  );
};

export default ExpenseItem;
