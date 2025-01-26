import React, { useState, useEffect } from 'react';


const Habit = ({ direction, translations }) => {
 
  const t = translations[direction];
 
  const [divs, setDivs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [inputText, setInputText] = useState("");
  const [selectedOption, setSelectedOption] = useState("Today");

  // Handle form submission to create a new div
  const handleFormSubmit = () => {
    if (inputText.trim()) {
      const newDiv = {
        text: inputText,
        type: selectedOption,
      };

      setDivs((prevDivs) => [...prevDivs, newDiv]);
      setShowForm(false); // Hide form after submission
      setInputText(""); // Clear input
      setSelectedOption("Today"); // Reset to "Today"
    } else {
      alert("Please fill in the text!");
    }
  };

  // Handle cancel to close the form without saving
  const handleCancel = () => {
    setShowForm(false); // Hide form
    setInputText(""); // Clear input
    setSelectedOption("Today"); // Reset to "Today"
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <button
        onClick={() => setShowForm(true)}
        style={styles.createButton}
      >
        Create Button
      </button>

      {showForm && (
        <div style={styles.formContainer}>
          <h3>Create a New Item</h3>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter some text"
            style={styles.input}
          />
          <div>
            <button
              onClick={() => setSelectedOption("Today")}
              style={{
                ...styles.optionButton,
                backgroundColor: selectedOption === "Today" ? "#4CAF50" : "#ccc",
              }}
            >
              Today
            </button>
            <button
              onClick={() => setSelectedOption("Tomorrow")}
              style={{
                ...styles.optionButton,
                backgroundColor: selectedOption === "Tomorrow" ? "#4CAF50" : "#ccc",
              }}
            >
              Tomorrow
            </button>
            <button
              onClick={() => setSelectedOption("Everyday")}
              style={{
                ...styles.optionButton,
                backgroundColor: selectedOption === "Everyday" ? "#4CAF50" : "#ccc",
              }}
            >
              Everyday
            </button>
          </div>
          <button onClick={handleFormSubmit} style={styles.doneButton}>
            Done
          </button>
          <button onClick={handleCancel} style={styles.cancelButton}>
            Cancel
          </button>
        </div>
      )}

      <div style={styles.divList}>
        {divs.map((div, index) => (
          <div key={index} style={styles.createdDiv}>
            <p>{div.text}</p>
            <p>Type: {div.type}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  createButton: {
    padding: "10px 20px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginBottom: "20px",
  },
  formContainer: {
    backgroundColor: "#f4f4f4",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    marginBottom: "10px",
    width: "100%",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  optionButton: {
    padding: "8px 15px",
    margin: "5px",
    cursor: "pointer",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  doneButton: {
    padding: "10px 20px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  },
  cancelButton: {
    padding: "10px 20px",
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
    marginLeft: "10px",
  },
  divList: {
    marginTop: "20px",
  },
  createdDiv: {
    padding: "15px",
    backgroundColor: "#e0e0e0",
    borderRadius: "8px",
    marginBottom: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
};


export default Habit; 