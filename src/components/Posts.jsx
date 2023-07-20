import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectPostsState } from '../features/postsSlice'
import { fetchPosts } from '../features/postsSlice'

const Posts = () => {
    const dispatch = useDispatch()
    const { posts, loading } = useSelector(selectPostsState)

    useEffect(() => {
        dispatch(fetchPosts())
    }, [dispatch])

    if(posts.length === 0 || !posts) return (<p>No posts</p>)

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h2>All Posts</h2>
            {!loading ? (
                posts.map((post) => (
                    <div
                        key={post.id}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '5px',
                            padding: '20px',
                            border: '1px dashed #ccc',
                        }}
                    >
                        <h3>{post.title}</h3>
                        <p>{post.body}</p>
                    </div>
                ))
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}

export default Posts
