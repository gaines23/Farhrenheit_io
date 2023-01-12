// Profile, Friends, Likes, Comments, Lists, Msgs, etc
let register_url = process.env.REACT_APP_FAHRENHEIT_REGISTER;
let logout_url = process.env.REACT_APP_FAHRENHEIT_LOGOUT;
let profile_url = process.env.REACT_APP_FAHRENHEIT_PROFILE;

let apps_user_following = process.env.REACT_APP_FAHRENHEIT_USER_APP_FOLLOWING;
let apps_user_not_following = process.env.REACT_APP_FAHRENHEIT_USER_APPS_NOT_FOLLOWING;
let all_apps = process.env.REACT_APP_FAHRENHEIT_APP_LIST;

let user_token = localStorage.getItem('token');

export async function getLogoutUrl() {
    const response = await fetch(`${logout_url}`, {
        method: 'POST',
        body: JSON.stringify(user_token),
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

export async function getUserProfile() {
    const response = await fetch(`${profile_url}`, { 
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user_token}`
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

export async function getAllApps() {
    const response = await fetch(`${all_apps}`, { 
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user_token}`
        }
    });

    const data = await response.json();
    
    if (!response.ok) {
        throw new Error(response.status_message);
    }

    const allAppDetails = {
        ...data,
    }

    return allAppDetails;

}


    export async function getNotFollowingApps() {
        const response = await fetch(`${apps_user_not_following}`, { 
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user_token}`
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(response.status_message);
        }
    
        const notFollowingApps = {
            ...data,
        }
    
        return notFollowingApps;
    }


    export async function getUserAppFollowing() {
        const response = await fetch(`${apps_user_following}`, { 
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user_token}`
            }
        });

        const data = await response.json();

        const appsFollowingData = {
            ...data,
        }

        return appsFollowingData;
    }



