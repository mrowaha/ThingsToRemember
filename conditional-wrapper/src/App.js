import classes from './App.module.css'

const db = [
    {
        title : "Cat",
        description : "This is a cat",
        image : process.env.PUBLIC_URL + './img/cat.jpg',
        isFavorite : true
    },
    {
        title : "Dog",
        description : "This is a dog",
        image : process.env.PUBLIC_URL + './img/dog.jpg',
        isFavorite : true
    },
    {
        title : "Rabbit",
        description : "This is a rabbit",
        image : process.env.PUBLIC_URL + './img/rabbit.jpg',
        isFavorite : false
    },
    {
        title : "Lion",
        description : "This is a lion",
        image : process.env.PUBLIC_URL + './img/lion.jpg',
        isFavorite : false
    }
];

function App() {
  return (
    <div className={classes.container}>
        {
            db.map(({title, description, image, isFavorite}) => <Card title={title} description={description} image={image} isFavorite={isFavorite}/>)
        }
    </div>
  );
}


function Card ({title, description, image, isFavorite}) {
    
    return (
        <>
            <ConditionalWrapper
                condition={isFavorite}
                wrapper = {(condition, children) => condition ? <div className={classes.favorite}>{children}</div> : <div>{children}</div>}
            >
                <h2><strong>Title: </strong>{title}</h2>
                <p><em>Description: </em>{description}</p>
                <img src={image} alt={title}/>
            </ConditionalWrapper>
        </>
    )
}

function ConditionalWrapper ({condition, wrapper, children}) {
    return wrapper(condition, children);
}


export default App;