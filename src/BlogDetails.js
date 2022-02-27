import {useParams} from 'react-router-dom';
import useFetch from './useFetch';

const BlogDetails = () => {
    const {id} = useParams();
    let {data:blog, isPending, isError} = useFetch('http://localhost:8000/blogs/' + id)
    return (
        <div className="blog-details">
            {isPending && <div>Loading...</div>}
            {isError && <div>{isError}</div>}
            {blog && (
                <article>
                    <h2>{ blog.title }</h2>
                    <p>Written by { blog.author }</p>
                    <div>{ blog.body }</div>
                </article>
            )}
        </div>
    )
}

export default BlogDetails