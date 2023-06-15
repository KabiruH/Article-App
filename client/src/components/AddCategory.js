import React, { useState, useEffect } from 'react'

function AddCategory({ user }) {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    function handleSubmit(e){
        e.preventDefault();

        // POST NEW CATEGORY
        fetch("http://localhost:3000/categories", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                description: description
            })
        })
        .then(response => response.json())
        .then(data => {
            // handle the response data here
            console.log(data)
        })
        .catch((error) => console.error(error))
    }


  return (
    <div>
        <form onSubmit={handleSubmit} className='flex flex-col w-full max-w-md mx-auto bg-white p-6 rounded-md shadow-md'>
            <h2 className="text-2xl font-bold mb-6">Add a category</h2>
            {/* Name */}
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="username">Category Name</label>
                <input 
                    type="text" 
                    name="name" 
                    id="name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter Category Name" 
                    className="w-full px-3 py-2 rounded-md border border-gray-400 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                />
            </div>

            {/* Description */}
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="body">Category Description</label>
                <input 
                    type="text" 
                    name="description" 
                    id="description" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter Category Description" 
                    className="w-full px-3 py-2 rounded-md border border-gray-400 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                />
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-between">
                <button type="submit" className="text-center py-2 px-4 border border-transparent rounded-md text-white bg-orange-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-4 mb-4">Submit</button>
            </div>
        </form>
    </div>
  )
}

export default AddCategory