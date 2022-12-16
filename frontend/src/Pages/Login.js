// import { useEffect } from "react";
// import { useHistory } from "react-router-dom";
// import useHttp from "../hooks/use-http";
// import { getUserLogin } from "../lib/fahrenheit-api";

import LoginForm from '../Components/Auth/LoginForm';

// const Login = () => {
//     const { sendRequest, status } = useHttp(getUserLogin);
//     const history = useHistory();

//     useEffect(() => {
//         if (status === 'completed') {
//             history.push('/fahrenheit');
//         }
//     }, [status, history]);

//     const loginUser = credentials => {
//         sendRequest(credentials);
//     }
    
//     return (
//         <LoginForm isLoading={ status === 'pending'} onLoginUser={loginUser} />
//     );
// };

const Login = () => {
    return (
        <LoginForm />
    );
}

export default Login;