import React, { useState, useEffect } from 'react'
import UserItem from './UserItem';
import AddUser from './AddUser';

function Users() {

    const [users, setUsers] = useState([]);

    const [refresh, setRefresh] = useState(false);

    const [status, setStatus] = useState(0);

    const [open, setOpen] = useState(true)

    useEffect(() => {
        fetch('http://localhost:3000/users')
            .then(res => res.json())
            .then((data) => {
                setUsers(data)
            })
            .catch((error) => {
                console.log("Error fetching users: ", error);
              });
    }, [refresh]);

    function handleUpgrade(id, role){
        // Set the role/ status state according to their respective roles
        if(role === 'moderator'){
            setStatus(2)
        }
        else{
            setStatus(1)
        }

        // PATCH USER
        fetch(`http://localhost:3000/users/${id}`, {
            method: "PATCH",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify({
                role: status
            })
        })
        .then(response => response.json())
        .then(data => {
            // handle the response data here
            console.log(data)
            setRefresh(!refresh);
        })
        .catch((error) => console.error(error))
    }

    function handleDelete(id){
        // Handle Delete
        fetch(`http://localhost:3000/users/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
        if (response.ok) {
            // handle successful deletion
            setRefresh(!refresh);
        } else {
            throw new Error('Something went wrong with the deletion.')
        }
        })
        .catch(error => console.log(error));
    }

  return (
    <div>
        <h2 className='pb-6 text-[#F9500D] text-2xl font-bold text-center'>Users List</h2>
        {/* Add User Button */}
        <div className="flex justify-end">
          <button className='bg-[#F9500D] hover:bg-black text-black hover:text-[#F9500D] rounded-md font-medium w-[200px] ml-4 my-6 px-1 py-3 text-base'
          onClick={() => setOpen(!open)}
        >
            {open? '+AddUser' : 'Back'}
          </button>
        </div>
        {/* Users Table */}
        {open? (
            <div className='px-3 py-4 flex justify-center'>
                <table className="w-full bg-white shadow-md rounded mb-4 text-base">
                    <thead>
                        <tr className='border-b'>
                            <th className="text-left p-3 px-5">Username : </th>
                            <th className="text-left p-3 px-5">Email:</th>
                            <th className="text-left p-3 px-5">Role</th>
                            {/* <th className="text-left p-3 px-5">Articles</th> */}
                            <th className="text-left p-3 px-5">Controls</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((item, index) => (
                                <UserItem  key={index} 
                                    username={item.username} 
                                    email={item.email}
                                    role={item.role}
                                    // articles={item.articles} 
                                    id={item.id}
                                    handleUpgrade={handleUpgrade}
                                    handleDelete={handleDelete}
                                />
                            ))
                        }
                    </tbody>
                </table>
            </div>
        ) : (<AddUser refresh={refresh} setRefresh={setRefresh} />)}
    </div>
  )
}

export default Users