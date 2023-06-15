import { useEffect, useState } from "react"
import Subscription from './Subscriptions';

function Category({ user }) {

    const [category, setCategories] = useState([]);

    useEffect(() => {
        // Fetch the Articles
        fetch("http://localhost:3000/categories",
        )
        .then((response) => response.json())
        .then((data) => {
          setCategories(data);
        })
        .catch((error) => {
          console.log("Error fetching categories: ", error);
        });
    }, []);

  return (
        <div>
            <Subscription user = {user} categories = {category}/>
        </div>
  )
}

export default Category