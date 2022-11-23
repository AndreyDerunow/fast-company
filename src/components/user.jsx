import React from "react";
import Qualitie from "./qualitie";
import Bookmark from "./bookmark";
import PropTypes from "prop-types";
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

User.propTypes = {
    name: PropTypes.string.isRequired,
    profession: PropTypes.objectOf(PropTypes.string.isRequired),
    qualities: PropTypes.arrayOf(
        PropTypes.objectOf(PropTypes.string.isRequired)
    ),
    completedMeetings: PropTypes.number.isRequired,
    rate: PropTypes.number.isRequired,
    _id: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
    rest: PropTypes.shape({
        bookmark: PropTypes.bool.isRequired,
        onFavorite: PropTypes.func.isRequired
    })
};

export default User;
