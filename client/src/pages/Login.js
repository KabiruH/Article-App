import React, { useState } from 'react';
import { Link, useNavigate, NavLink } from 'react-router-dom';

function Login({ handleLogin }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const navigate = useNavigate();
  
    const handleSubmit = (event) => {
      event.preventDefault();
      setIsLoading(true);
      setError(null);
  
      // Perform login request
      fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password }),
      })
        .then((response) => {
          setIsLoading(false);
          
          if (response.ok) {
            response.json().then((data) => {
              console.log(data.role)
              handleLogin(data)
              navigate("/dashboard")
            });
          } else {
            response.json().then((err) => setError(err.errors));
          }
  
          // Handle successful login
        })
        .catch(() => {
          setIsLoading(false);
          setError('Wrong email password combination');
        });
    };

  return (
    <section className="gradient-form h-screen bg-white dark:bg-white flex items-center justify-center h-screen">
        <div className="container h-full p-10 mx-auto">
        <div
            className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
            <div className="w-auto border border-gray-300 rounded-2xl p-4">
            <div
                className="block rounded-3xl"
                style={{
                // background: 'linear-gradient(to top, #101F3C, white, white, white, white, white)'
                }}>
                <div className="g-0 lg:flex lg:flex-wrap">
                {/* <!-- Left column container--> */}
                <div >
                    <div className="md:mx-2 md:p-12">
                    {/* <!--Logo--> */}
                    <NavLink to='/'>
                        <div className="text-center">
                        <img
                            className="mx-auto w-52"
                            src="https://moringaschool.com/wp-content/themes/moringa/public/images/logo.png"
                            alt="logo" />
                        </div>
                    </NavLink>
                    <div className='text-center'>
                        <p className="mb-4 mt-6 pb-1 text-2xl font-semibold text-blue-900">Nurturing Africa’s Tech Talent</p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className='text-center'>
                        <p className="mb-2 pb-1 text-xl font-semibold">Please login to your account</p>
                        </div>
                        
                        {/* <!--Username input--> */}
                        <br />
                        {error && <div className="error text-red-500 font-bold text-center">{error}</div>}
                        <div className="relative mb-4" data-te-input-wrapper-init>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="peer block min-h-[auto] w-full rounded border bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-black [&:not([data-te-input-placeholder-active])]"
                            id="email"
                            placeholder="Email"
                            autoComplete="off"
                            required 
                        />

                        </div>

                        {/* <!--Password input--> */}
                        <div className="relative mb-4" data-te-input-wrapper-init>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="peer block min-h-[auto] w-full rounded border bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]"
                            id="password"
                            placeholder="Password"
                            required />
                        </div>

                        {/* <!--Submit button--> */}
                        <div className="mb-12 pb-1 pt-1 text-center">
                        <button
                        
                            className="mb-3 inline-block w-full rounded-full px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                            type="submit"
                            disabled={isLoading}
                            data-te-ripple-init
                            data-te-ripple-color="light"
                            style={{
                            background: ' #F9500D'
                            }}>
                            {isLoading ? 'Loading...' : 'Log In'}
                        </button>

                        {/* <!--Forgot password link--> */}
                        <Link to="/reset">Forgot password?</Link>
                        </div>

                        {/* <!--Register button--> */}
                        <div className="flex items-center justify-between pb-6">
                        <p className="mb-0 mr-2">Don't have an account?</p>
                        <Link
                            to="/signup"
                            type="button"
                            className="inline-block rounded-full border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal  text-white transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                            data-te-ripple-init
                            data-te-ripple-color="light"
                            style={{
                            background: ' #F9500D'
                            }}>
                            Register
                        </Link>
                        </div>
                    </form>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    </section>
  )
}

export default Login