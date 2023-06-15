import React from 'react'

function UserItem({ id, username, email, role, handleUpgrade, handleDelete }) {
  
    let currentUser = (sessionStorage.getItem("user"));
    let loggedInUser = JSON.parse(currentUser);

    return (
        <tr className="border-b hover:bg-orange-100">
            <td className="p-3 px-5">{username}</td>
            <td className="p-3 px-5">{email}</td>
            <td className='p-3 px-5 flex'>
                {role === 'technicalwriter' && (
                <div className="rounded-full bg-yellow-500 w-14 h-6 flex items-center justify-center">
                    <span className="text-white">TW</span>
                </div>
                )}
                {role === 'admin' && (
                <div className="rounded-full bg-red-500 w-14 h-6 flex items-center justify-center">
                    <span className="text-white">A</span>
                </div>
                )}
                {role === 'moderator' && (
                <div className="rounded-full bg-blue-500 w-14 h-6 flex items-center justify-center">
                    <span className="text-white">M</span>
                </div>
                )}
            </td>
            {/* <td className="p-3 px-5">{articles.length}</td> */}
            <td className="p-3 px-5">
                {role === 'admin' && (
                <div className="flex">
                    {/* <button type="button" className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">View</button> */}
                </div>
                )}
                {role === 'technicalwriter' && (
                <div className="flex">
                    {/* <button type="button" className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">View</button> */}
                    <button type="button" className="mr-3 text-sm bg-green-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline" onClick={() => handleUpgrade(id, role)} >Upgrade</button>
                    <button type="button" className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline" onClick={() => handleDelete(id)}>Delete</button>
                </div>
                )}
                {role  === 'moderator' && (
                <div className="flex">
                    {/* <button type="button" className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">View</button> */}
                    <button type="button" className="mr-3 text-sm bg-green-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline" onClick={() => handleUpgrade(id ,role)} >Upgrade</button>
                    <button type="button" className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline" onClick={() => handleDelete(id)}>Delete</button>
                </div>
                )}
            </td>
        </tr>
    )
}

export default UserItem