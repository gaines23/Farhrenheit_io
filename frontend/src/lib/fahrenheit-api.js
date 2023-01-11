// Profile, Friends, Likes, Comments, Lists, Msgs, etc
let register_url = process.env.REACT_APP_FAHRENHEIT_REGISTER;
let logout_url = process.env.REACT_APP_FAHRENHEIT_LOGOUT;
let profile_url = process.env.REACT_APP_FAHRENHEIT_PROFILE;

let apps_user_following = process.env.REACT_APP_FAHRENHEIT_USER_APP_FOLLOWING;


export async function getLogoutUrl() {
    const response = await fetch(`${logout_url}`, {
        method: 'POST',
        body: JSON.stringify(localStorage.getItem("token")),
        headers: {
            'Content-Type': 'application/json',
        }
    });

    const data = await response.json();
    
    if (!response.ok) {
        throw new Error(data.message || 'Login Credentials Rejected');
    }

    return null;
}


export async function getUserRegisteration(credentials) {
    const response = await fetch(`${register_url}`, {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: {
            'Content-Type': 'application/json',
        }
    });

    const data = await response.json();
    
    if (!response.ok) {
        throw new Error(data.message || 'Login Credentials Rejected');
    }

    return null;
}

export async function getUserProfile(token) {
    const response = await fetch(`${profile_url}`, { 
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    const data = await response.json();
    
    if (!response.ok) {
        throw new Error(response.status_message);
    }

    const profileDetails = {
        ...data,
    }

    return profileDetails;

}


export async function getFollowNewAppURL({appId}) {
    const response = await fetch (`${apps_user_following}`, {
        method: 'POST',
        body: JSON.stringify(
            localStorage.getItem('token'),
            appId    
        ),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message);
    }

    return;
}