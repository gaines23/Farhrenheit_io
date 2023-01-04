import { Link, useHistory } from "react-router-dom";
import { Fragment, useRef, useState, useContext } from "react";

import AuthContext from "../../store/auth-context";
import LoadingSpinner from "../UI/LoadingSpinner";

let login_url = process.env.REACT_APP_FAHRENHEIT_LOGIN;

const LoginForm = () => {
    const history = useHistory();

    const usernameRef = useRef();
    const passwordRef = useRef();

    const authCtx = useContext(AuthContext);

    const [isLoading, setIsLoading] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();

        const usernameInput = usernameRef.current.value;
        const passwordInput = passwordRef.current.value;

        setIsLoading(true);

        fetch(
            login_url,
            {
              method: 'POST',
              body: JSON.stringify({
                username: usernameInput,
                password: passwordInput,
              }),
              headers: {
                'Content-Type': 'application/json',
              }
            }
            ).then(async res => {
                setIsLoading(false);
                if (res.ok) {
                    return res.json();
                } else {
                    return res.json().then(data => {
                        let errorMessage = 'Authentication Failed';
                        if (data && data.error && data.error.message) {
                          errorMessage = data.error.message;
                        }
                        throw new Error(errorMessage);
                    });
                }
            }).then((data) => {   
                authCtx.login(data.access, data.refresh, data.username);
                history.replace('/fahrenheit/home/');
            })
            .catch((err) => {
                alert(err.message);
            });
        }

    const inputClassName = "w-full h-9 mt-1 pl-5 shadow-md shadow-black/20 border-solid border border-input-fill/30 rounded-lg bg-input-fill/30 focus:border-input-fill hover:bg-input-fill/10 focus:text-sm focus:outline-none focus:bg-input-fill/10";
    const sectionClassName = "h-16 w-4/5 m-auto text-xs my-1";

    return (
        <Fragment>
            <div className="h-5/6 w-1/3 m-auto flex text-input-fill/60">
                <div className="w-5/6 h-4/6 flex m-auto self-center bg-bg-fill/30 rounded-lg shadow shadow-md shadow-bg-fill/40">
                    <div className="h-auto w-full my-auto p-2">
                        <p className="w-full text-center font-bold text-3xl">
                            Login
                        </p>

                        <form className="h-auto w-full my-auto" onSubmit={submitHandler}>
                            { isLoading && <LoadingSpinner /> }

                            <div className={sectionClassName}>
                                <label htmlFor='username' className="w-full">Username</label>
                                <br />
                                <input 
                                    type='text' 
                                    className={inputClassName} 
                                    required
                                    placeholder="username" 
                                    ref={usernameRef}
                                />
                            </div>
                            <div className={sectionClassName}>
                                <label htmlFor='password'>Password</label>
                                <br />
                                <input
                                    type='password'
                                    className={inputClassName} 
                                    required 
                                    placeholder="password" 
                                    ref={passwordRef}    
                                />
                            </div>
                            <div className={sectionClassName}>
                                <div className="mt-3 text-center pb-2">
                                    <input type='checkbox' className="focus:outline-none" />
                                    <label htmlFor='remember' className="ml-2 text-xs">Remember me</label>
                                </div>
                                <div className="h-full w-5/6 mx-auto">
                                   <button type="submit" className="w-full text-sm h-10 shadow-md shadow-black/20 border-solid border border-input-fill/30 rounded-lg bg-input-fill/30 hover:bg-input-fill/10">
                                        Sign In
                                    </button> 
                                </div>
                                
                            </div>

                            <div className="flex w-1/2 m-auto justify-self-center mt-5 h-5">
                                <p className="w-16 h-3 float-left border-b-2 border-solid border-white/30"></p>
                                <div className="w-6 m-auto float-left text-center border-solid border border-input-fill/40 rounded-md bg-input-fill/20">    
                                    <p className="text-xs">Or</p>
                                </div>
                                <p className="w-16 h-3 float-left border-b-2 border-solid border-white/30"></p>
                            </div>
                            
                            <div className="w-full h-12 mt-5 text-center">
                                <Link to="/fahrenheit/user/register/" className='w-full text-xs'>
                                    Don't have an account yet? Sign up here!
                                </Link>
                                <br />
                                <Link to="" className='w-full italic text-xs'>Forgot password?</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default LoginForm;