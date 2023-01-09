import React, { useState, useEffect } from "react";
import { pagination } from "../utils/paginate";
import Pagination from "./pagination";
import SearchStatus from "./searchStatus";
import UserTable from "./usersTable";
import UserSearch from "./userSearch";
import GroupList from "./groupList";
import api from "../api";
import _ from "lodash";

const UsersList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [searchStr, setSearchStr] = useState("");
    const [users, setUsers] = useState();
    const pageSize = 4;
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
    }, []);
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);
    const handleDeleteUser = (userId) => {
        setUsers((prevState) =>
            prevState.filter((user) => user._id !== userId)
        );
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
    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
        if (searchStr) {
            setSearchStr("");
        }
    };
    const handleSearchUsers = ({ target }) => {
        const str = target.value;
        setSearchStr(str);
        if (selectedProf) {
            setSelectedProf();
        }
    };

    const handleSort = (item) => {
        setSortBy(item);
    };
    if (users) {
        let filteredUsers;
        if (selectedProf) {
            filteredUsers = selectedProf
                ? users.filter(
                      (user) =>
                          JSON.stringify(user.profession) ===
                          JSON.stringify(selectedProf)
                  )
                : users;
        } else if (searchStr) {
            filteredUsers = users.filter((user) =>
                user.name.toUpperCase().includes(searchStr.toUpperCase().trim())
            );
        } else {
            filteredUsers = users;
        }

        const count = filteredUsers.length;

        const sortedUsers = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        );
        const userCrop = pagination(sortedUsers, pageSize, currentPage);
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
                    <UserSearch
                        onSearch={handleSearchUsers}
                        searchStr={searchStr}
                    />
                    {count > 0 && (
                        <UserTable
                            users={userCrop}
                            onSort={handleSort}
                            selectedSort={sortBy}
                            onDelete={handleDeleteUser}
                            onFavorite={handleMakeFavorite}
                        />
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
    }
    return "Loading...";
};

export default UsersList;
