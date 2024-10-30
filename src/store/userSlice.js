import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [{
        contact: "5668598965",
        email: "jack4323@email",
        name: "Jack"
    },],
    user: null,
    authUsers: [
        {
            email: 'admin@example.com',
            password: 'admin123',
            role: 'admin'
        },
        {
            email: 'user@example.com',
            password: 'user123',
            role: 'user'
        },
        {
            email: 'user2@example.com',
            password: 'user123',
            role: 'user'
        }
    ]
}

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        addUsers(state, action) {
            state.users.push(action.payload)
        },
        updateUsers(state, action) {
            state.users[action.payload.editingIndex] = action.payload.formData
        },
        deleteUsers(state, action) {
            state.users.splice(action.payload, 1)
            // return state.users.filter((val, i) => i !== action.payload)
        },
        setAuthUser(state, action) {
            state.user = action.payload
            // return state.users.filter((val, i) => i !== action.payload)
        }
    }
})

export const { addUsers, updateUsers, deleteUsers, setAuthUser } = userSlice.actions

export default userSlice.reducer