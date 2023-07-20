import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// Async thunk action creators
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (_, thunkAPI) => {
    // If posts are already fetched, return them
    if(thunkAPI.getState().posts.posts.length > 0) return thunkAPI.getState().posts.posts
    
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

export const fetchPostsByUserId = createAsyncThunk('posts/fetchPostsByUserId', async (userId, thunkAPI) => {
    if(!userId) {
        const state = thunkAPI.getState()
        userId = state.users.users[0].id
    }
    try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})


// Slice reducer initial state
const initialState = {
    posts: [],
    loading: false,
    error: '',
    message: '',
    postsByUserId: {
        posts: [],
        loading: false,
        error: '',
        message: '',
    },
}

// Slice reducer
export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.loading = false
                state.posts = action.payload
                state.message = 'Posts fetched successfully'
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(fetchPostsByUserId.pending, (state) => {
                state.postsByUserId.loading = true
            })
            .addCase(fetchPostsByUserId.fulfilled, (state, action) => {
                state.postsByUserId.loading = false
                state.postsByUserId.posts = action.payload
                state.postsByUserId.message = 'Posts of user fetched successfully'
            })
            .addCase(fetchPostsByUserId.rejected, (state, action) => {
                state.postsByUserId.loading = false
                state.postsByUserId.error = action.payload
            })
    },
})


// Selectors
export const selectPostsState = state => ({
    posts: state.posts.posts,
    loading: state.posts.loading,
    error: state.posts.error,
    message: state.posts.message,
})

export const selectPostsByUserIdState = state => ({
    posts: state.posts.postsByUserId.posts,
    loading: state.posts.postsByUserId.loading,
    error: state.posts.postsByUserId.error,
    message: state.posts.postsByUserId.message,
})

export default postsSlice.reducer
