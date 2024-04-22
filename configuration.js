const mode = 0;

const host_local = "https://c322-test3-backend-latest-6p0h.onrender.com";
const host_remote = "https://c322-test3-backend-latest-6p0h.onrender.com";

function getHost() {
    return (mode == 0) ? host_local : host_remote;
}

function isLoggedIn() {
    if(localStorage.getItem("token")) {
        return true;
    } else {
        return false;
    }
}

function getTheToken() {
    return localStorage.getItem("token");
} 

function saveTheToken(token) {
     localStorage.setItem("token", token);
     updateTheNavigationBar();
} 

function removeTheToken() {
    localStorage.removeItem("token");
    updateTheNavigationBar();
} 

let configuration = {
    isLoggedIn: () => isLoggedIn(), 
    host: () => getHost(), 
    token: () => getTheToken()    
};

document.addEventListener('DOMContentLoaded', function() {
    updateTheNavigationBar();
});

async function updateTheNavigationBar() {
    const navigation = document.getElementsByClassName("topnav")[0];
    let loginTag = navigation.children[navigation.children.length - 1];
    if(configuration.isLoggedIn()) {
        loginTag.innerHTML = 
        `<li class="right"><a  href="#" onclick="logout()">Logout</a></li>`;
    } else {
        loginTag.innerHTML = `<li class="right"><a  href="login.html">Login</a></li>`;
    }
}



async function signup() {
    let email = document.getElementById("email").value;
    let username = document.getElementById("username-signup").value;
    let password = document.getElementById("password-signup").value;
    let customer = { email: email, username: username, password: password };
    let request = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(customer)
    };
    console.log("Request body:", request.body); 
    try {
        let response = await fetch(getHost() + "/signup", request);
        let responseBody = await response.text(); 
        console.log(`Response status: ${response.status}, Response body:`, responseBody); 
        if (response.status == 200) {
            alert("The registration was successful!");
            location.href = "login.html";
        } else {
            alert("Something went wrong: " + responseBody);
        }
    } catch (error) {
        console.log("Network error:", error);
        alert("Something went wrong!");
    }
}



async function login() {
    let username = document.getElementById("username-signin").value;
    let password = document.getElementById("password-signin").value;
    let customer = { username: username, password: password };
    let request = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customer)
    };
    let response = await fetch(getHost() + "/signin", request);
    if (response.ok) {
        const token = await response.text();
        saveTheToken(token);
        location.href = "index.html";
    } else {
        alert("Login failed!");
    }
}

async function logout() {   
    removeTheToken();  
}
