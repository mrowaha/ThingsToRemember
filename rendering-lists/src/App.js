import { useState, useEffect, memo, useCallback } from "react";

function App() {

    const [posts, setPosts] = useState([]);
    const [currentPost, setCurrentPost] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        //run code when componenet mounts
        const controller = new AbortController();
        const signal = controller.signal;

        const initialize = async () => {
            try {
                const res = await fetch("https://jsonplaceholder.typicode.com/posts");
                const json = await res.json();
                setPosts(json);
                setIsLoading(false);
            }catch(err) {
                console.log(err);
            }
        }
        initialize();

        return (() => {
            //run when the component unmounts
            controller.abort();
        })

    }, [])
    
    //because onPostClick is passed a prop to PostList
    //setting currentPost re-renders PostList and Posts
    //because reference to onPostClick changes. To prevent
    //that useCallback ensures React only creates this reference once
    const onPostClick = useCallback((post) =>{
        setCurrentPost(post);
    }, []);

    // const onPostClick = (post) => {
    //     setCurrentPost(post);
    // }

    if(isLoading) {
        return (
            <>
                <h1>Loading...</h1>
            </>
        )
    }

    return (
        <>
            {currentPost && <h1>{currentPost.title}</h1>}
            <PostList posts={posts} onPostClick={onPostClick} />
        </>
    );
}

//wrapping a component inside memo function tells React to not re-render this componenet unless the props have changed!
const PostList = memo(({posts, onPostClick}) => {
    return (
        /*
         *  Specific Key:
         *  It's important to note that key prop needs to be unique and we should not 
         * use index as a key (changing the order on the list doesn't change the identity of the item)
         */
        <div>
            {posts.map((post) => {
                return <Post post={post} onPostClick={onPostClick} key={post.id}/>
            })}
        </div>
    )
})

function Post ({post, onPostClick}) {
    const onClick = () => {
        onPostClick(post);
    }
    //why does useCallback not make sense here
    //useCallback will be used for each instance of onClick

    //use button for accessibility purposes-> can use tab to navigate the posts
    return (
        <button onClick={onClick}>{post.title}</button>
    )
}

export default App;
