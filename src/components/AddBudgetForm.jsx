import { CurrencyDollarIcon } from "@heroicons/react/24/solid";
import React from "react";
import { Form } from "react-router-dom";

const AddBudgetForm = () => {
  return (
    <div className="form-wrapper">
      <h2 className="h3">Create budget</h2>
      <Form method="post" className="grid-sm">
        <div className="grid-xs">
          <label htmlFor="newBudget">Budget Name</label>
          {/* name is required for when submiting form */}
          <input
            type="text"
            name="newBudget"
            id="newBudget"
            placeholder="e.g, Groceris"
            required
          />
        </div>
        <div className="grid-xs">
          <label htmlFor="newBudgetAmout">Amount</label>
          <input
            type="number"
            step="0.01"
            name="newBudgetAmount"
            id="newBudgetAmount"
            placeholder="e.g., $350"
            required
            inputMode="decimal"
          />
        </div>
        {/* this hidden input with name _action will allow us to figure out what to do based on value */}
        <input type="hidden" name="_action" value="createBudget" />
        <button type="submit" className="btn btn--dark">
          <span>Create budget</span>
          <CurrencyDollarIcon width={20} />
        </button>
      </Form>
    </div>
  );
};

export default AddBudgetForm;
