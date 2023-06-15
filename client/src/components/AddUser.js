import React, { useState, useEffect } from 'react'

function AddUser({ refresh, setRefresh }) {

    const [username, setUsername] = useState('');

    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('password');
  
    const [isLoading, setIsLoading] = useState(false);

    const [error, setError] = useState(null);
  
    const handleSubmit = (event) => {
      event.preventDefault();
      setIsLoading(true);
      setError(null);

        // Perform create user
        fetch('http://localhost:3000/signup', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password }),
        })
            .then((response) => {
            console.log(response);
            setIsLoading(false);
            })
            .catch(() => {
            setIsLoading(false);
            setError('An unexpected error occurred.');
        });
        // Refresh
        setRefresh(!refresh);
    };

  return (
    <div >
        <form onSubmit={(e) => handleSubmit(e)} className='flex flex-col w-full max-w-md mx-auto bg-white p-6 rounded-md shadow-md'>
            <h2 className="text-2xl font-bold mb-6">Add a user</h2>
            {/* Username */}
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="username">Username</label>
                <input 
                    type="text" 
                    name="username" 
                    id="username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username" 
                    className="w-full px-3 py-2 rounded-md border border-gray-400 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                />
            </div>

            {/* Email */}
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="body">Email</label>
                <input 
                    type="text" 
                    name="email" 
                    id="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email" 
                    className="w-full px-3 py-2 rounded-md border border-gray-400 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                />
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-between">
                <button type="submit" className="text-center py-2 px-4 border border-transparent rounded-md text-white bg-orange-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-4 mb-4">{isLoading ? 'Loading...' : 'Submit'}</button>
            </div>
        </form>
    </div>
  )
}

export default AddUser