import { useState } from 'react';
import Like from '../assets/Like.png'
import DisLike from '../assets/Dislike.png'
import Liked from '../assets/Liked.png'
import DisLiked from '../assets/Disliked.png'
import Dropdown from '../assets/Dropdown.png'
import AddComments from './AddComments';
import Comments from './Comments';

function IndividualArticle({ selectedArticle, toggleContent, user, refresh, setRefresh }) {

    const [article, setArticle] = useState(selectedArticle);

    const [error, setError] = useState(null);

    let likeurl = `http://localhost:3000/articles/${selectedArticle.id}/likes`

    let dislikeurl = `http://localhost:3000/articles/${selectedArticle.id}/dislikes`

    const [active, setActive] = useState(false)

    const [disactive, setDisactive] = useState(false)

    const [showComments, setshowComments] = useState(false);

    const [addCommentForm, setAddCommentForm] = useState(false);

    const [comments, setComments] = useState();

    const [item, setItem] = useState();


    function handleLike(){
        setActive(true)
        setDisactive(false)

        // Persist Like
        fetch(likeurl, {
            method: 'PATCH'
        })
        .then(response => {
            // Handle successful response
            console.log(response)
        })
        .catch(error => {
            // Handle error
            setError('Error updating the like');
        });

    }

    function addComment(){
        setAddCommentForm(!addCommentForm)
    }

    function handleDislike(){
        setDisactive(true)
        setActive(false)

        // Persist Dislike
        fetch(dislikeurl, {
            method: 'PATCH'
        })
        .then(response => {
            // Handle successful response
            console.log(response)
        })
        .catch(error => {
            // Handle error
            setError('Error updating the like');
        });

    }

    function handleShowComments(){
        setshowComments(!showComments)

        // Fetch all the Comments that belong to that article
        fetch(`http://localhost:3000/comments/${selectedArticle.id}`)
        .then((response) => response.json())
        .then((data) => {
            // console.log(data);
            setComments(data);
        })
        .catch((error) => {
            console.log("Error fetching comments: ", error);
        });
    }

    function handleApprove(){
        console.log(user.role);
        console.log('Approved');

        // PATCH ARTICLE
        fetch(`http://localhost:3000/articles/${selectedArticle.id}`, {
            method: "PATCH",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify({
                status: 1
            })
        })
        .then(response => response.json())
        .then(data => {
            // handle the response data here
            console.log(data)
        })
        .catch((error) => console.error(error))
    }

    function handleReject(){
        console.log('Rejected');

        // PATCH ARTICLE
        fetch(`http://localhost:3000/articles/${selectedArticle.id}`, {
            method: "PATCH",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify({
                status: 2
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
    <div className="px-6 pt-4 pb-2 text-center">
        <button className="bg-[#F9500D] hover:bg-black text-black hover:text-[#F9500D] font-medium py-2 px-4 rounded"
            onClick={() => toggleContent()}
        >
        Back
        </button>
        <div className='mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl'>
            <div className='p-8'>
                <div>
                    <img className='h-96 w-full object-cover rounded mx-auto' src={selectedArticle.image_url} alt={selectedArticle.title} />
                </div>
                <div>
                    <div className='uppercase tracking-wide text-sm text-indigo-500 font-semibold'>
                        {selectedArticle.status}
                    </div>
                    {user.role !== "technicalwriter" && article.status === "pending" && (
                        <div>
                        <button className='bg-gray-200 rounded-lg px-3 py-1 text-sm font-semibold text-gray-700 mr-2' onClick={() => handleApprove(article)}>Approve</button>
                        <button className='bg-gray-200 rounded-lg px-3 py-1 text-sm font-semibold text-gray-700 mr-2' onClick={() => handleReject(article)}>Reject</button>
                        </div>
                    )}
                </div>
                <a href='#' className='block mt-1 text-lg leading-tight font-bold text-black hover:underline text-justify'>{selectedArticle.title}</a>
                <p className='mt-2 text-gray-500 text-justify'>{selectedArticle.body}</p>
                {error && <div className="error text-red-500 font-bold text-center">{error}</div>}
                <div className='mt-4 flex justify-between'>
                    <button className='bg-gray-200 rounded-lg px-3 py-1 text-sm font-semibold text-gray-700 mr-2' onClick={() => handleLike()}>
                        {active? (<img src={Liked} alt="Like" className="w-5 h-5 inline-block mr-1" />) : (<img src={Like} alt="Like" className="w-5 h-5 inline-block mr-1" />) } 
                        Like ({selectedArticle.likes})
                    </button>
                    <button className='bg-gray-200 rounded-lg px-3 py-1 text-sm font-semibold text-gray-700 mr-2' onClick={() => handleDislike()}>
                        {disactive? (<img src={DisLiked} alt="Dislike" className="w-5 h-5 inline-block mr-1" />) : (<img src={DisLike} alt="Dislike" className="w-5 h-5 inline-block mr-1" />) } 
                        Dislike ({selectedArticle.dislikes})
                    </button>
                </div>
                <div className='mt-4 flex justify-between'>
                    <button
                        className="float-left mt-2 mb-2 bg-gray-200 rounded-lg px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
                        onClick={() => handleShowComments()}
                    >
                        <img src={Dropdown} alt="DropDown" className={`w-5 h-5 inline-block mr-1 ${showComments && 'rotate-180'}`} />
                        Comments
                    </button>
                    <button className="float-left mt-2 mb-2 bg-gray-200 rounded-lg px-3 py-1 text-sm font-semibold text-gray-700 mr-2" onClick={() => addComment()}>
                        +Add Comment
                    </button>
                </div>
                {comments && comments.length === 0 ? ( <p>No comments found</p>) : (
                    comments && comments.map((item) => (
                        <Comments key={item.id} item={item} user={user} article_id={selectedArticle.id} />
                    ))
                )}
                {addCommentForm ? (<AddComments addComment={addComment} user={user} article_id={selectedArticle.id} />) : null}
            </div>
        </div>
    </div>
  )
}

export default IndividualArticle