import { useState, useEffect } from "react";
import BlogList from './BlogList'

const Home = () => {
    const [blogs, setBlogs] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [isError, setIsError] = useState(null);

    useEffect(() => {
      setTimeout(() => {
        fetch('http://localhost:8000/blogs')
        .then((response) => {
          if(!response.ok){
            throw new Error('Something wrong. Try Again!');
          }
          return response.json();
        })
        .then((data) => {
          setBlogs(data);
          setIsPending(false);
          setIsError(null);
        })
        .catch((err) => {
          setIsError(err.message);
          setIsPending(false);
        })
      }, 2000)
    }
    );

    return (
      <div className="home">
        {isError && <div>{isError}</div>}
        {isPending && <div>Loading</div>}
        {blogs && <BlogList blogs={blogs} title="All Blogs" setBlogs={setBlogs}></BlogList>}
      </div>
    );
  }
   
  export default Home;