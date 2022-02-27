import { useState, useEffect } from "react";
const useFetch = (url) => {
    const abortCont = new AbortController();
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [isError, setIsError] = useState(null);

    useEffect(() => {
        setTimeout(() => {
            fetch(url, {signal: abortCont.signal})
            .then((response) => {
                if(!response.ok){
                throw new Error('Something wrong. Try Again!');
                }
                return response.json();
            })
            .then((data) => {
                setData(data);
                setIsPending(false);
                setIsError(null);
            })
            .catch((err) => {
                if(err.name === 'AbortError'){
                    console.log('fetch aborted')
                }else{
                    setIsError(err.message);
                    setIsPending(false);
                }
            })
        }, 2000);
        return () => abortCont.abort();
    }, [url]);

        return {data, isPending, isError}
}

export default useFetch;