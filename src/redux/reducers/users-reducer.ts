import {UserAction, UserActionTypes, UserState} from "../../types/users";
import {Dispatch} from "redux";
import axios from "axios";

const initialState: UserState = {
    users: [],
    loading: false,
    error: null
}

export const usersReducer = (state = initialState, action: UserAction): UserState => {
    switch (action.type) {
        case UserActionTypes.FETCH_USERS:
            return {
                loading: true,
                error: null,
                users: []
            }
        case UserActionTypes.FETCH_USERS_SUCCESS:
            return {
                loading: false,
                error: null,
                users: action.payload
            }
        case UserActionTypes.FETCH_USERS_ERROR:
            return {
                loading: false,
                error: action.payload,
                users: []
            }
        default:
            return {
                ...state
            }
    }
}

export const fetchUsers = () => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            dispatch({ type: UserActionTypes.FETCH_USERS })
            const response = await axios.get('https://jsonplaceholder.typicode.com/users');
            dispatch({ type: UserActionTypes.FETCH_USERS_SUCCESS, payload: response.data });
        }
        catch (e) {
            dispatch({ type: UserActionTypes.FETCH_USERS_ERROR, payload: 'Error of fetching users' })
        }
    }
}