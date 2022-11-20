import React, { useState } from "react";
import api from "./api";
import SearchStatus from "./components/searchStatus";
import Users from "./components/users";

const App = () => {
  const [users, setUsers] = useState(api.users.fetchAll);
  const handleDeleteUser = (userId) => {
    setUsers((prevState) => prevState.filter((user) => user._id !== userId));
  };
  const handleMakeFavorite = (id) => {
    setUsers((users) =>
      users.map((user) => {
        if (user._id === id) {
          return { ...user, bookmark: !user.bookmark };
        }
        return user;
      })
    );
  };
  return (
    <>
      <SearchStatus number={users.length} />
      {!!users.length && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретился, раз</th>
              <th scope="col">Оценка</th>
              <th scope="col">Избранное</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <Users
              users={users}
              onDelete={handleDeleteUser}
              onFavorite={handleMakeFavorite}
            />
          </tbody>
        </table>
      )}
    </>
  );
};

export default App;
