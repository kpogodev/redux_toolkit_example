import { configureStore } from '@reduxjs/toolkit'
import usersSlice from '../features/usersSlice'
import postsSlice from '../features/postsSlice'

export const store = configureStore({
    reducer: {
        users: usersSlice,
        posts: postsSlice,
    },
})
