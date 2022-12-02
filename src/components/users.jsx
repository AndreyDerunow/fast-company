import React, { useState, useEffect } from "react";
import { pagination } from "../utils/paginate";
import Pagination from "./pagination";
import SearchStatus from "./searchStatus";
import User from "./user";
import PropTypes from "prop-types";
import GroupList from "./groupList";
import api from "../api";

const Users = ({ users, ...rest }) => {
    const pageSize = 4;

    const [currentPage, setCurrentPAge] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const handlePageChange = (pageIndex) => {
        setCurrentPAge(pageIndex);
    };
    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data)); // единожды получаем данные о профессиях и ставим их
    }, []);
    useEffect(() => {
        setCurrentPAge(1); //   каждый раз при фильтрации по профессии выставляем 1 страницу в пагинации
    }, [selectedProf]);
    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
    };
    const filteredUsers = selectedProf
        ? users.filter((user) => user.profession.name === selectedProf.name)
        : users;
    const count = filteredUsers.length;
    const userCrop = pagination(filteredUsers, pageSize, currentPage);
    const clearFilter = () => {
        setSelectedProf();
    };
    return (
        <div className="d-flex">
            {professions && (
                <div className="d-flex flex-column flex-shrink-0 p-3">
                    <GroupList
                        items={professions}
                        selectedItem={selectedProf}
                        onItemSelect={handleProfessionSelect}
                    />
                    <button
                        className="btn btn-secondary mt-2"
                        onClick={clearFilter}
                    >
                        Очистить
                    </button>
                </div>
            )}

            <div className="flex flex-column">
                <SearchStatus number={count} />
                {count > 0 && (
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
                            {userCrop.map((user) => (
                                <User key={user._id} {...user} {...rest} />
                            ))}
                        </tbody>
                    </table>
                )}
                <div className="d-flex justify-content-center">
                    <Pagination
                        itemsCount={count}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
};

Users.propTypes = {
    users: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            profession: PropTypes.shape(PropTypes.string.isRequired),
            qualities: PropTypes.arrayOf(
                PropTypes.objectOf(PropTypes.string.isRequired)
            ),
            completedMeetings: PropTypes.number.isRequired,
            rate: PropTypes.number.isRequired
        })
    ),
    rest: PropTypes.shape({
        onDelete: PropTypes.func.isRequired,
        onFavorite: PropTypes.func.isRequired
    })
};

export default Users;
