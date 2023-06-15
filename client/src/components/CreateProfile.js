import React, { useState, useEffect } from 'react'

function CreateProfile({ user, setError, setProfile }) {

    const [show, setShow] = useState(false)

    function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData();

        data.append("profile[full_name]", event.target.full_name.value);
        data.append("profile[bio]", event.target.bio.value);
        data.append("profile[user_id]", user.id);
        data.append("profile[image]", event.target.image.files[0]);
        submitToAPI(data);
    }

    function submitToAPI(data) {
        fetch("http://localhost:3000/profiles", {
            method: "POST",
            body: data,
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setProfile(data);
            setError(false);
        })
        .catch((error) => console.error(error))
    }

  return (
    <div>
        <button className='bg-[#F9500D] hover:bg-black text-black hover:text-[#F9500D] rounded-md font-medium w-[200px] ml-4 my-6 px-1 py-3 text-base'
          onClick={() => setShow(!show)}
          >Create Profile
        </button>
        {show ? (
            <div>
                <form onSubmit={(e) => handleSubmit(e)} className='flex flex-col w-full max-w-md mx-auto bg-white p-6 rounded-md shadow-md'>
                    <h2 className="text-2xl font-bold mb-6">Create a Profile</h2>
                    {/* Full Name */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="full_name">Full Name</label>
                        <input 
                            type="text" 
                            name="full_name" 
                            id="full_name" 
                            placeholder="Enter your full name" 
                            className="w-full px-3 py-2 rounded-md border border-gray-400 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>

                    {/* Bio */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="body">Bio</label>
                        <textarea
                            className="w-full px-3 py-2 rounded-md border border-gray-400 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="bio"
                            name='bio'
                            placeholder="Enter your bio"
                            required
                        />
                    </div>

                    {/* Image */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="file">Upload an Image</label>
                        <input 
                            type="file" 
                            name="image" 
                            id="image"
                            className="w-full px-3 py-2 border border-gray-400 p-2 rounded-md"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="flex items-center justify-between">
                        <button type="submit" className="text-center py-2 px-4 border border-transparent rounded-md text-white bg-orange-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-4 mb-4">Submit</button>
                    </div>
                </form>
            </div>
        ) : null}
    </div>
  )
}

export default CreateProfile