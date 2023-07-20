import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { fetchPostsByUserId } from './postsSlice';

// Async thunk action creators
export const fetchUsers = createAsyncThunk('users/fetchUsers', async (_, thunkAPI) => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');

        // Fetch posts for the first user
        if(response.status === 200) {
            thunkAPI.dispatch(fetchPostsByUserId(response.data[0].id));
        }
        
        return response.data;
    } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue(error.response.data);
    }
});


// Slice reducer initial state
const initialState = {
    users: [],
    loading: false,
    error: '',
    message: '',
}

// Slice reducer
export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
                state.message = 'Users fetched successfully';
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

// Selectors - to access the state in components
export const selectUsersState = state => ({
    users: state.users.users,
    loading: state.users.loading,
    error: state.users.error,
    message: state.users.message,
})

export default usersSlice.reducer;