import React, { useState, useEffect } from 'react';
import ArticleCard from './ArticleCard';
import IndividualArticle from './IndividualArticle';

function MyArticles({ user }) {

    const [articles, setArticles] = useState([]);

    const [refresh, setRefresh] = useState(false);

    const [sortedArticles, setSortedArticles] = useState("");

    const [showArticle, setShowArticle] = useState(false)

      // Keep track of the selected recipe
    const [selectedArticle, setSelectedArticle] = useState([]);


    function showComponentHandler(article){
      setSelectedArticle(article);
      toggleContent()
    }


    function toggleContent(){
      setShowArticle(!showArticle)
      // console.log(showArticle)
    }

    useEffect(() => {
        // Fetch the Articles
        fetch("http://localhost:3000/articles")
        .then((response) => response.json())
        .then((data) => {
          setArticles(data);

          if(user.role === "technicalwriter"){
            let filteredArray = data.filter((item) => item.user_id === user.id);
            console.log(filteredArray);
            setSortedArticles(filteredArray)
          }
          else{
            setSortedArticles(data)
          }      
        })
        .catch((error) => {
          console.log("Error fetching articles: ", error);
        });
    }, [refresh]);

  return (
    <div>
        {showArticle ? (
            <IndividualArticle toggleContent={toggleContent} selectedArticle={selectedArticle} user={user} refresh={refresh} setRefresh={setRefresh} />
        ) : 
        (<div>
            <div className='p-4 flex flex-wrap'>
                {sortedArticles.length > 0 ? (
                sortedArticles.map((article) => (
                <ArticleCard
                    key={article.id}
                    id = {article.id}
                    title={article.title}
                    body={article.body}
                    image={article.image_url}
                    status={article.status}
                    likes={article.likes}
                    dislikes={article.dislikes}
                    article={article}
                    toggleContent={toggleContent}
                    showComponentHandler={showComponentHandler}
                />
                ))
                ) : (
                <p>No articles</p>
                )}
            </div>
        </div>
        )}
    </div>
  )
}

export default MyArticles