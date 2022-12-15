import React from "react";
import { useParams } from "react-router-dom";

import UsersList from "./layouts/usersList";
import User from "./userCard";

const Users = () => {
    const { userId } = useParams();
    return <>{userId ? <User /> : <UsersList />}</>;
};

export default Users;
