import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUsersState, fetchUsers } from '../features/usersSlice'

const Users = () => {
    const { users, loading, message } = useSelector(selectUsersState)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchUsers())
    }, [])

    return (
        <>
            {users.length > 0 ? (
                users.map((user) => (
                    <div
                        key={user.id}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px',
                            padding: '10px',
                            border: '1px solid red',
                        }}
                    >
                        <div>{user.name}</div>
                        <div>{user.email}</div>
                    </div>
                ))
            ) : loading ? (
                <div>Loading...</div>
            ) : (
                <div>No users found</div>
            )}
            {message}
        </>
    )
}

export default Users
