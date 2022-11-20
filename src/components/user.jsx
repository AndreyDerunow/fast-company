import React from "react";
import Qualitie from "./qualitie";
import Bookmark from "./bookmark";

const User = ({
  name,
  profession: { name: prof },
  qualities,
  completedMeetings,
  rate,
  _id: id,
  onDelete,
  ...rest
}) => {
  const renderDeleteButton = (id) => {
    return (
      <button
        id={id}
        className="btn btn-danger"
        onClick={(e) => onDelete(e.target.id)}
      >
        delete
      </button>
    );
  };
  return (
    <tr key={id}>
      <td>{name}</td>
      <td>{prof}</td>
      <td>
        {qualities.map((quality) => (
          <Qualitie key={quality._id} quality={quality} />
        ))}
      </td>
      <td>{completedMeetings}</td>
      <td>{rate + " /5"}</td>
      <td>
        <Bookmark id={id} {...rest} />
      </td>
      <td>{renderDeleteButton(id)}</td>
    </tr>
  );
};
export default User;
