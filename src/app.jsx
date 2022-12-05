import React, { useState, useEffect } from "react";
import api from "./api";

import Users from "./components/users";

const App = () => {
    const [users, setUsers] = useState();
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
    return (
        <>
            {users && (
                <Users
                    users={users}
                    onDelete={handleDeleteUser}
                    onFavorite={handleMakeFavorite}
                />
            )}
        </>
    );
};

export default App;
