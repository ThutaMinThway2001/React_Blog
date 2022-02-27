import {useParams, useHistory} from 'react-router-dom';
import useFetch from './useFetch';

const BlogDetails = () => {
    const {id} = useParams();
    const {data:blog, isPending, isError} = useFetch('http://localhost:8000/blogs/' + id)
    const history = useHistory();

    const deleteBlog = () => {
        fetch('http://localhost:8000/blogs/' + id, {
            method: "DELETE"
        }).then(() => {
            history.push('/')
        })
    }

    return (
        <div className="blog-details">
            {isPending && <div>Loading...</div>}
            {isError && <div>{isError}</div>}
            {blog && (
                <article>
                    <h2>{ blog.title }</h2>
                    <p>Written by { blog.author }</p>
                    <div>{ blog.body }</div>
                    <button onClick={deleteBlog}>Delete</button>
                </article>
            )}
        </div>
    )
}

export default BlogDetails