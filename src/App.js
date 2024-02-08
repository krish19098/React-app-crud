// App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import Users from "./Components/Users";
import AddUser from "./Components/AddUser";
import DeleteUser from "./Components/DeleteUser";
import EditUser from "./Components/EditUser";
import "./index.css";

function App() {
  const [users, setUsers] = useState([]);

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

  const handleAddUser = (newUser) => {
    setUsers([newUser, ...users]); // Prepend the new user to the users list
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      setUsers(users.filter((user) => user.id !== id)); // Filter out the deleted user
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // const handleEditUser = async (editedUser) => {
  //   try {
  //     await axios.put(
  //       `https://jsonplaceholder.typicode.com/users/${editedUser.id}`,
  //       editedUser
  //     );
  //     // Update the user in the users list
  //     setUsers(
  //       users.map((user) => (user.id === editedUser.id ? editedUser : user))
  //     );
  //   } catch (error) {
  //     console.error("Error updating user:", error);
  //   }
  // };
  const handleEditUser = async (editedUser) => {
    try {
      const response = await axios.put(
        `https://jsonplaceholder.typicode.com/users/${editedUser.id}`,
        editedUser
      );
      if (response.status === 200) {
        // Update the user in the users list
        setUsers(
          users.map((user) => (user.id === editedUser.id ? editedUser : user))
        );
      } else {
        console.error("Failed to update user:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="container">
      <Users users={users} onEditUser={handleEditUser} />
      <AddUser onAdd={handleAddUser} />
      <ul className="user-list">
        {users.map((user) => (
          <li key={user.id}>
            {user.name}
            <DeleteUser id={user.id} onDelete={handleDeleteUser} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
