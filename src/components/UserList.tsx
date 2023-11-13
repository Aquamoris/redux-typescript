import React, {useEffect} from 'react';
import {usedTypedSelector} from "../hooks/usedTypedSelector";
import {useDispatch} from "react-redux";
import {fetchUsers} from "../redux/reducers/users-reducer";
import type {} from 'redux-thunk/extend-redux'
import {useActions} from "../hooks/useActions";

const UserList: React.FC = () => {
    const {users, loading, error} = usedTypedSelector(state => state.users);
    const {fetchUsers} = useActions();

    useEffect(() => {
        fetchUsers();
    }, []);

    if (loading) {
        return <h1>Loading...</h1>
    }
    if (error) {
        return <h1>{error}</h1>
    }

    return (
        <div>
            {
                users.map(u => (
                    <div key={u.id}>{u.name}</div>
                ))
            }
        </div>
    );
};

export default UserList;