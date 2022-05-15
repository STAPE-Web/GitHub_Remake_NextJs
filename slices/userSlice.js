import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
    },
    reducers: {
        change: (state, action) => {
            state.user = action.payload;
        },
    },
});

export const { change } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
