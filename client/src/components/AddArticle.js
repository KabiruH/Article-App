import { useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom';

function AddArticle({ loggedInUser, setOpen, open}) {

    // console.log(loggedInUser.id);

    const navigate = useNavigate();

    const [article, setArticle] = useState(null);

    function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData();

        data.append("article[title]", event.target.title.value);
        data.append("article[body]", event.target.body.value);
        data.append("article[user_id]", loggedInUser.id);
        data.append("article[image]", event.target.image.files[0]);
        submitToAPI(data);
    }

    function submitToAPI(data) {
        fetch("http://localhost:3000/articles", {
            method: "POST",
            body: data,
        })
        .then(response => response.json())
        .then(data => {
            setArticle(data.image_url);
            setOpen(!open)
        })
        .catch((error) => console.error(error))
    }


  return (
        <div>
        <div >
            <form onSubmit={(e) => handleSubmit(e)} className='flex flex-col w-full max-w-md mx-auto bg-white p-6 rounded-md shadow-md'>
                <h2 className="text-2xl font-bold mb-6">Create an Article</h2>
                {/* Title */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="title">Title</label>
                    <input 
                        type="text" 
                        name="title" 
                        id="title" 
                        placeholder="Enter article title" 
                        className="w-full px-3 py-2 rounded-md border border-gray-400 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>

                {/* Body */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="body">Body</label>
                    <textarea
                        className="w-full px-3 py-2 rounded-md border border-gray-400 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="body"
                        name='body'
                        placeholder="Enter article body"
                        required
                    />
                </div>

                {/* Image */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="file">Upload a Image</label>
                    <input 
                        type="file" 
                        name="image" 
                        id="image"
                        className="w-full px-3 py-2 border border-gray-400 p-2 rounded-md"
                    />
                </div>

                {/* Submit Button */}
                <div className="flex items-center justify-between">
                    <button type="submit" className="text-center py-2 px-4 border border-transparent rounded-md text-white bg-orange-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-4 mb-4">Create Post</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default AddArticle