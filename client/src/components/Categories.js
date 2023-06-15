import React, { useState, useEffect } from 'react'
import AddCategory from './AddCategory'
import Subscriptions from './Subscriptions';


function Categories({ user }) {

    const [open, setOpen] = useState(true)

    const [refresh, setRefresh] = useState(false);

    const [categories, setCategories] = useState('')

    // Fetch categories
    useEffect(() => {
        fetch('http://localhost:3000/categories')
            .then(res => res.json())
            .then((data) => {
                console.log(data);
                setCategories(data)
            })
            .catch((error) => {
                console.log("Error fetching users: ", error);
              });
    }, [refresh]);

  return (
    <div>
        <h1 className='pb-4 text-[#F9500D] text-2xl font-bold text-center'>All Categories</h1>
        <div className="flex justify-end">
          <button className='bg-[#F9500D] hover:bg-black text-black hover:text-[#F9500D] rounded-md font-medium w-[200px] ml-4 my-6 px-1 py-3 text-base'
          onClick={() => setOpen(!open)}
        >
            {open? '+AddCategory' : 'Back'}
          </button>
        </div>
        {open ? (
            <>
                {categories && categories.length > 0 ? (
                <div className="flex flex-wrap">
                    {categories.map((item, index) => (
                    <div key={index} className="w-1/2 p-2">
                        <div className="bg-white border rounded-lg shadow-md p-4">
                        <h1 className="text-lg font-medium mb-2">{item.name}</h1>
                        <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                    </div>
                    ))}
                </div>
                ) : (
                <p>No Categories Found</p>
                )}
            </>
            ) : (
              <div>
                <AddCategory refresh={refresh} setRefresh={setRefresh} user={user} />
              </div>
            
            
        )}
    </div>
  )
}

export default Categories