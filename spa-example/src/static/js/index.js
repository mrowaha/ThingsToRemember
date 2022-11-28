import Home from './pages/Home';
import Contact from './pages/Contact';
import About from './pages/About';
import PageNotFound from './pages/PageNotFound';


const navigateTo = url => {
    history.pushState(null, null, url);
    router();
}

const router = async () => {
    const routes = [
        {
            path: "/",
            view : Home
        },
        {
            path: "/about",
            view: About
        },
        {
            path: "/contact",
            view: Contact
        },
        {
            path: "/404",
            view : PageNotFound
        }
    ];
    
    const checkMatches = routes.map(route => {
        return {
            route: route,
            isMatch: location.pathname === route.path
        }
    })

    //console.log(checkMatches);
    let match = checkMatches.find(checkMatch => checkMatch.isMatch);
    //console.log(match);
    if(!match){
        match = {
            route : routes[routes.length - 1]
        }
    }
    const view  = new match.route.view();
    document.querySelector("#home").innerHTML = await view.getHtml();
}

window.addEventListener('popstate', router);

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener('click', e => {
        if(e.target.matches('[data-link]')){
            e.preventDefault();
            navigateTo(e.target.href);
        }
    })
    router();
})
