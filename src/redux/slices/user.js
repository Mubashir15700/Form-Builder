import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        loading: false,
        isLoggedIn: false,
        username: null,
        userId: null,
        formsCreated: null,
        role: null,
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload;
        },
        setUsername: (state, action) => {
            state.username = action.payload;
        },
        setUserId: (state, action) => {
            state.userId = action.payload;
        },
        setFormsCreated: (state, action) => {
            state.formsCreated = action.payload;
        },
        setRole: (state, action) => {
            state.role = action.payload;
        },
    },
});

export const {
    setLoading, setLoggedIn, setUsername, setUserId, setFormsCreated, setRole
} = userSlice.actions;

export default userSlice.reducer;
