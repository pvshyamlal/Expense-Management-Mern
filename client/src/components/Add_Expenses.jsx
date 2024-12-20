// add_expenses.jsx
import React, { useState } from "react";
import "./Add_Expenses.css";
import { useNavigate } from "react-router-dom"; // If you're using React Router

const AddExpenses = () => {
  const [formData, setFormData] = useState({
    date: "",
    category: "",
    description: "",
    amount: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/add-expense", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage("Expense added successfully!");
        setFormData({ date: "", category: "", description: "", amount: "" });
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        console.error("Failed to add expense");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="form-container">
      {successMessage && (
        <div className="alert-success" id="success-message">
          <p>{successMessage}</p>
        </div>
      )}

      <h2>Add Expenses</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="date">Date</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          required
        >
          <option value="" disabled>
            Select a category
          </option>
          <option value="Food">Food</option>
          <option value="Utilities">Utilities</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Others">Others</option>
        </select>

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
        ></textarea>

        <label htmlFor="amount">Amount (INR)</label>
        <input
          type="number"
          id="amount"
          name="amount"
          step="0.01"
          value={formData.amount}
          onChange={handleInputChange}
          required
        />

        <button type="submit">Submit</button>
        <button
          type="button"
          className="btn-secondary"
          onClick={() => navigate("/view-expenses")}
        >
          View Expenses
        </button>
      </form>
    </div>
  );
};

export default AddExpenses;
