// Profile, Friends, Likes, Comments, Lists, Msgs, etc
let login_url = process.env.REACT_APP_FAHRENHEIT_LOGIN;
let register_url = process.env.REACT_APP_FAHRENHEIT_REGISTER;

export async function getUserLogin(credentials) {
    const response = await fetch(`${login_url}`, {
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