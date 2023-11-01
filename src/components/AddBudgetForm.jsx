import React, { useEffect, useRef } from "react";
import { CurrencyDollarIcon } from "@heroicons/react/24/solid";
import { Form, useFetcher } from "react-router-dom";

const AddBudgetForm = () => {
  //this gives you access to actions and loaders without navigating
  const fetcher = useFetcher();
  //the below gives you the current state of the fetch. Used for variety of things
  const isSubmitting = fetcher.state === "submitting";

  //this links to
  const formRef = useRef();

  const focusRef = useRef();

  useEffect(() => {
    if (!isSubmitting) {
      // this clears the create budget form
      formRef.current.reset();
      //this puts focus on newBudget input
      focusRef.current.focus();
    }
  }, [isSubmitting]);

  return (
    <div className="form-wrapper">
      <h2 className="h3">Create budget</h2>
      <fetcher.Form method="post" className="grid-sm" ref={formRef}>
        <div className="grid-xs">
          <label htmlFor="newBudget">Budget Name</label>
          {/* name is required for when submiting form */}
          <input
            type="text"
            name="newBudget"
            id="newBudget"
            placeholder="e.g, Groceris"
            required
            ref={focusRef}
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
        <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
          {isSubmitting ? (
            <span>Submitting budget...</span>
          ) : (
            <>
              <span>Create budget</span>
              <CurrencyDollarIcon width={20} />
            </>
          )}
        </button>
      </fetcher.Form>
    </div>
  );
};

export default AddBudgetForm;
