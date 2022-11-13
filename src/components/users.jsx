import React, { useState } from "react";
import api from "../api";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll);
  const badgeColor = users.length ? "bg-primary" : "bg-danger"; //цвет Badge
  let badgeClasses = "badge m-2 "; //классы Badge
  const renderPhrase = (number) => {
    if (!(number > 11 && number < 15)) {
      if (number % 10 < 2 || number % 10 > 4) {
        return `${number} человек тусанет с тобой сегодня`;
      } else {
        return `${number} человека тусанут с тобой сегодня`;
      }
    } else {
      return `${number} человек тусанет с тобой сегодня`;
    }
  };
  const badgeText = users.length
    ? renderPhrase(users.length)
    : "Никто с тобой не тусанет"; //формируем текст для Badge в начале страницы

  const renderBadge = () => {
    badgeClasses += badgeColor;
    return <span className={badgeClasses}>{badgeText}</span>;
  };
  const handleDeleteUser = (userId) => {
    setUsers((prevState) => prevState.filter((user) => user._id !== userId));
  };
  const renderDeleteButton = (id) => {
    return (
      <button
        id={id}
        className="btn btn-danger"
        onClick={(e) => handleDeleteUser(e.target.id)}
      >
        delete
      </button>
    );
  };
  const renderUser = (user) => {
    return (
      <tr key={user._id}>
        <td>{user.name}</td>
        <td>{user.profession.name}</td>
        <td>
          {user.qualities.map((quality) => {
            let classes = "badge m-1 bg-";
            classes += quality.color;

            return (
              <span key={quality.name} className={classes}>
                {quality.name}
              </span>
            );
          })}
        </td>
        <td>{user.completedMeetings}</td>
        <td>{user.rate + " /5"}</td>
        <td>{renderDeleteButton(user._id)}</td>
      </tr>
    );
  };

  return (
    <>
      <h1>{renderBadge()}</h1>
      {Boolean(users.length) && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретился, раз</th>
              <th scope="col">Оценка</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>{users.map((user) => renderUser(user))}</tbody>
        </table>
      )}
    </>
  );
};

export default Users;
