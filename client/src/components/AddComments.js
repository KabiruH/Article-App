import React, { useState } from 'react'

function AddComments({ addComment, user, article_id }) {

    const [commentBody, setCommentBody] = useState('');

    function handleSubmit(event){
        event.preventDefault();
        addComment(commentBody);
        console.log(commentBody);
    
        // POST Comment
        fetch("http://localhost:3000/comments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            content: commentBody,
            article_id: article_id,
            user_id: user.id
          })
        })
        .then(response => response.json())
        .then(data => {
            // handle the response data here
            console.log(data)
        })
        .catch((error) => console.error(error))
    
    
        // setCommentBody('');
        addComment()
    };

  return (
    <form onSubmit={handleSubmit}>
      <div className='mt-4'>
        <label htmlFor='commentBody' className='block text-gray-700 font-bold mb-2'> 
          Comment body
        </label>
        <input 
          type='text'
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          placeholder='Enter your comment'
          value={commentBody}
          onChange={(event) => setCommentBody(event.target.value)}
          required 
        />
        <div className='mt-4'>
          <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
            Submit
          </button>
        </div>
      </div>
    </form>
  )
}

export default AddComments