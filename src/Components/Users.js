// Users.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Users.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedName, setEditedName] = useState("");

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const handleEditUser = (userId, userName) => {
    setEditingUserId(userId);
    setEditedName(userName);
  };

  const handleSaveEdit = async (userId) => {
    try {
      const updatedUser = {
        ...users.find((user) => user.id === userId),
        name: editedName,
      };
      await axios.put(
        `https://jsonplaceholder.typicode.com/users/${userId}`,
        updatedUser
      );

      // Update the user in the state
      setUsers(users.map((user) => (user.id === userId ? updatedUser : user)));

      // Reset editing state
      setEditingUserId(null);
      setEditedName("");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {editingUserId === user.id ? (
              <div>
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                />
                <button onClick={() => handleSaveEdit(user.id)}>Save</button>
              </div>
            ) : (
              <div>
                {user.name}
                <button
                  className="edit-btn"
                  onClick={() => handleEditUser(user.id, user.name)}
                >
                  Edit
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
