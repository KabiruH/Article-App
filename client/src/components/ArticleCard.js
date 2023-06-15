import React from 'react'

function ArticleCard({ id, title, body, image, status, likes, dislikes, article, toggleContent, showComponentHandler }) {
  return (
    <div className="max-w-sm overflow-hidden rounded-lg shadow-md m-4">
      <img className="w-full" src={image} alt={title} />
      <div className="px-6 py-4">
         <div className="font-bold text-xl mb-2">{title}</div>
      </div>
      <div className='uppercase tracking-wide text-sm text-indigo-500 font-semibold text-center'>
          {status}
      </div>
      <div className="px-6 pt-4 pb-2 text-center">
         <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
           Likes: {likes}
         </span>
         <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
            Dislikes: {dislikes}
         </span>
      </div>
      <div className="px-6 pt-4 pb-2 text-center">
         <button className="bg-[#F9500D] hover:bg-black text-black hover:text-[#F9500D] font-medium py-2 px-4 rounded"
           onClick={() => showComponentHandler(article)}
         >
           Read More
         </button>
      </div>
    </div>
  )
}

export default ArticleCard