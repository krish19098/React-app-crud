// EditUser.js
import React, { useState } from "react";
import axios from "axios";

const EditUser = ({ user, onUpdate }) => {
  const [name, setName] = useState(user.name);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://jsonplaceholder.typicode.com/users/${user.id}`,
        { name }
      );
      onUpdate(response.data);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div>
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditUser;
