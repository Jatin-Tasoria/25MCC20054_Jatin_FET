import React, { useState, useRef } from "react";

function App() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const inputRef = useRef(null);

  const handleAdd = () => {
    if (input.trim() === "") return;

    if (editIndex !== null) {
      const updatedItems = [...items];
      updatedItems[editIndex] = input;
      setItems(updatedItems);
      setEditIndex(null);
    } else {

      setItems([...items, input]);
    }

    setInput("");
  };

  const handleDelete = (index) => {
    const filtered = items.filter((_, i) => i !== index);
    setItems(filtered);
  };

  const handleEdit = (index) => {
    setInput(items[index]);
    setEditIndex(index);


    inputRef.current.focus();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>NOTE APP</h2>

      <input
        ref={inputRef}
        type=""
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter item"
      />

      <button onClick={handleAdd}>
        {editIndex !== null ? "Update" : "Add"}
      </button>

      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item}
            <button onClick={() => handleEdit(index)}>Edit</button>
            <button onClick={() => handleDelete(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;