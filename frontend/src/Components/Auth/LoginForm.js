import { Link } from "react-router-dom";

import Google from '../../assets/Google.png';
import Instagram from '../../assets/Instagram.png';

const LoginForm = () => {
    const inputClassName = "w-full h-9 mt-1 pl-5 shadow-md shadow-black/20 border-solid border border-input-fill/30 rounded-lg bg-input-fill/30 focus:border-input-fill hover:bg-input-fill/10 focus:text-sm focus:outline-none focus:bg-input-fill/10";
    const sectionClassName = "h-16 w-4/5 m-auto text-xs";

    return (
        <div className="h-5/6 w-1/3 m-auto flex text-input-fill/60">
            <div className="w-full h-4/6 flex my-auto self-center bg-bg-fill/30 rounded-lg shadow shadow-md shadow-bg-fill/40">
                <div className="h-auto w-full my-auto p-2">
                <p className="w-full text-center font-bold text-3xl">Sign In</p>

                <form className="h-auto w-full my-auto">
                    <div className={sectionClassName}>
                        <label htmlFor='email' className="w-full">Email</label>
                        <br />
                        <input type='email' className={inputClassName} required placeholder="Email" />
                    </div>
                    <div className={sectionClassName}>
                        <label htmlFor='password'>Password</label>
                        <br />
                        <input type='password' className={inputClassName} required placeholder="Password" />
                    </div>
                    <div className={sectionClassName}>
                        <div className="mt-3 text-center pb-2">
                            <input type='checkbox' className="focus:outline-none" />
                            <label htmlFor='remember' className="ml-2 text-xs">Remember me</label>
                        </div>
                        
                        <button type='button' className="w-full text-sm h-10 shadow-md shadow-black/20 border-solid border border-input-fill/30 rounded-lg bg-input-fill/30 hover:bg-input-fill/10">
                            Sign In
                        </button>
                    </div>

                    <div className="flex w-1/2 m-auto justify-self-center mt-5 h-5">
                        <p className="w-16 h-3 float-left border-b-2 border-solid border-white/30"></p>
                        <div className="w-6 m-auto float-left text-center border-solid border border-input-fill/40 rounded-md bg-input-fill/20">    
                            <p className="text-xs">Or</p>
                        </div>
                        <p className="w-16 h-3 float-left border-b-2 border-solid border-white/30"></p>
                    </div>

                    <div className="flex w-4/5 h-8 m-auto text-center mt-3">
                        <button className='w-28 float-left p-1 m-auto text-xs h-7 shadow-md shadow-black/20 border-solid border border-input-fill/30 rounded-lg bg-input-fill/30 hover:bg-input-fill/10'>
                            <p className="h-5 w-3/5 text-center m-auto">
                                <img src={Google} alt="googleLogo" className="h-4 float-left" />
                                Google
                            </p>
                        </button>
                        <button className='w-28 float-left p-1 m-auto text-xs h-7 shadow-md shadow-black/20 border-solid border border-input-fill/30 rounded-lg bg-input-fill/30 hover:bg-input-fill/10'>
                            <p className="h-5 w-4/5 text-center m-auto">
                                <img src={Instagram} alt="instagramLogo" className="h-4 float-left" />
                                Instagram
                            </p>
                        </button>
                    </div>
                    
                    <div className="w-full h-12 mt-5 text-center">
                        <Link to="" className='w-full text-xs'>
                            Don't have an account yet? Sign up here!
                        </Link>
                        <br />
                        <Link to="" className='w-full italic text-xs'>Forgot password?</Link>
                    </div>
                </form>
            </div></div>
        </div>
    );
};

export default LoginForm;