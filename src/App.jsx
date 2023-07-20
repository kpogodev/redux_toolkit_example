import { useState } from 'react'
import PostsOfUser from './components/PostsOfUser'
import Users from './components/Users'
import Posts from './components/Posts'

function App() {
    const [ showAllPosts, setShowAllPosts ] = useState(false)


    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '100px' }}>
            <Users />
            <PostsOfUser />
            <button onClick={() => setShowAllPosts(!showAllPosts)}>{showAllPosts ? 'Hide' : 'Show'} all posts</button>
            {showAllPosts && <Posts />}
        </div>
    )
}



export default App
