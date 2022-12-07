import React from "react";
import PropTypes from "prop-types";
import QualitiesList from "./qualitiesList";
import Bookmark from "./bookmark";
import Table from "./table";

const UserTable = ({ users, onSort, selectedSort, onDelete, ...rest }) => {
    const columns = {
        name: { path: "name", name: "Имя" },
        qualities: {
            name: "Качество",
            component: (user) => <QualitiesList qualities={user.qualities} />
        },
        professions: { path: "profession.name", name: "Профессия" },
        completedMeetings: {
            path: "completedMeetings",
            name: "Встретился, раз"
        },
        rate: { path: "rate", name: "Оценка" },
        bookmark: {
            path: "bookmark",
            name: "Избранное",
            component: (user) => (
                <Bookmark id={user._id} bookmark={user.bookmark} {...rest} />
            )
        },
        delete: {
            component: (user) => (
                <button
                    id={user._id}
                    className="btn btn-danger"
                    onClick={(e) => onDelete(e.target.id)}
                >
                    delete
                </button>
            )
        }
    };
    return <Table {...{ onSort, selectedSort, columns, data: users }} />;
};

UserTable.propTypes = {
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default UserTable;
