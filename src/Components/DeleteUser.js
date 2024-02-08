// DeleteUser.js
import React from "react";
import axios from "axios";

const DeleteUser = ({ id, onDelete }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      onDelete(id);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return <button onClick={handleDelete}>Delete</button>;
};

export default DeleteUser;
