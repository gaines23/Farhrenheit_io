import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import useHttp from "../hooks/use-http";
import { getUserRegisteration } from "../lib/fahrenheit-api";
import RegisterForm from "../Components/Auth/RegisterForm";


const Register = () => {
    const { sendRequest, status } = useHttp(getUserRegisteration);
    const history = useHistory();

    useEffect(() => {
        if (status === 'completed') {
            history.push('/fahrenheit');
        }
    }, [status, history]);

    const registerUser = credentials => {
        sendRequest(credentials);
    }

    return (
        <RegisterForm isLoading={ status === 'pending'} onRegisterUser={registerUser}/>
    );
}

export default Register;