import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import API from "../api";
import QualitiesList from "./qualitiesList";

const User = () => {
    const { userId: id } = useParams();
    const [user, setUser] = useState();
    const history = useHistory();
    useEffect(() => {
        API.users.getById(id).then((data) => setUser(data));
    }, []);
    const handleBackToAll = () => {
        history.push("/users");
    };
    if (user) {
        return (
            <div className="m-2">
                <h1>{user.name}</h1>
                <h2>Профессия:{user.profession.name}</h2>
                <QualitiesList qualities={user.qualities} />
                <p>completedMeetings: {user.completedMeetings}</p>
                <h2>Rate:{user.rate}</h2>
                <button onClick={handleBackToAll}>Все пользователи</button>
            </div>
        );
    }
    return "Loading...";
};

export default User;
