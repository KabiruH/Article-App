import React, { useState } from 'react'

function Comments({ item, user, article_id }) {

    const [showReplies, setShowReplies] = useState(false);

    const [reply, setReply] = useState('');

    const [replyForm, setShowReplyForm] = useState(false);

    function nestedComments(comments){
        // check if nested comments exist
        if (Array.isArray(comments) && comments.length > 0) {
            return comments.map((comment) => (
              <div className="flex items-start my-4 ml-6">
                <div className="ml-4 mr-4">
                  <p className="text-gray-700">{comment.content}</p>
                </div>
              </div>
            ));
        } else {
            return null;
        }
    }

    function addReply(){
        console.log(replyForm)
        setShowReplyForm(!replyForm)
    }

    function handleSubmit(event){
        event.preventDefault();
        console.log(reply)

            // POST Reply
        fetch("http://localhost:3000/comments", {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify({
                content: reply,
                parent_id: item.id,
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

        addReply();
    }

  return (
    <div>
        <div className="flex items-start my-4">
            <div className="ml-3 mr-4">
                <p className='text-gray-700'>{item.content}</p>
            </div>
            <div>
                <button className="float right mt-1 ml-3 text-gray-500 text-sm font-medium"  onClick={() => setShowReplies(!showReplies)}>{showReplies ? 'Hide Replies' : 'Show Replies'}</button>
            </div>
            <div>
                <button className="float right mt-1 ml-3 text-gray-500 text-sm font-medium"  onClick={() => addReply()} >Reply</button>
            </div>
        </div>
        
        {showReplies && nestedComments(item.comments)}
        
        {replyForm ? (     
            <form onSubmit={handleSubmit}>
                <div className='mt-4'>
                    <label htmlFor='replyBody' className='block text-gray-700 font-bold mb-2'> Reply body</label>
                    <input 
                        type='text'
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        placeholder='Enter your comment'
                        value={reply}
                        onChange={(event) => setReply(event.target.value)}
                        required 
                    />
                    <div className='mt-4'>
                        <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                            Submit
                        </button>
                    </div>
                </div>
            </form>) : null
        }
    </div>
  )
}

export default Comments