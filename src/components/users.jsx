import React, { useState } from "react";
import { pagination } from "../utils/paginate";
import Pagination from "./pagination";
import SearchStatus from "./searchStatus";
import User from "./user";

const Users = ({ users, ...rest }) => {
    const count = users.length;
    const pageSize = 4;
    const [currentPage, setCurrentPAge] = useState(1);
    const handlePageChange = (pageIndex) => {
        setCurrentPAge(pageIndex);
    };

    const userCrop = pagination(users, pageSize, currentPage);
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
                        {userCrop.map((user) => (
                            <User key={user._id} {...user} {...rest} />
                        ))}
                    </tbody>
                </table>
            )}
            <Pagination
                itemsCount={count}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </>
    );
};

export default Users;
