import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [{
        contact: "5668598965",
        email: "jack4323@email",
        name: "Jack"
    },],
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
        }
    }
})

export const { addUsers, updateUsers, deleteUsers } = userSlice.actions

export default userSlice.reducer