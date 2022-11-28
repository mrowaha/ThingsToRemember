const submitBtn = document.getElementById('submit');
const username = document.getElementById('username');
const password = document.getElementById('password');

submitBtn.addEventListener('click', async (event) => {
    event.preventDefault();

    try {
        console.log("fetching")
        let res = await fetch("http://localhost:3000/user", 
        {
            method : "POST", 
            headers: {
                'Content-Type' : 'application/json'
            },
            body  : JSON.stringify({
                username : username.value,
                password : password.value
            })
        });
        if(res.status==403){
            document.getElementById('failed-login').style.display = "block";
            username.style.borderColor = "red";
            password.style.borderColor = "red";
        }else{
            const htmlResponse = await res.text();
            document.body.innerHTML = htmlResponse;
        }
    }catch(err){
        console.log(err);
    }
})  