import React from 'react'
import Logo from '../assets/logo.png';
import Newsletter from '../assets/newsletter.png';
import { Link } from 'react-router-dom';

import '../index.css';


function LandingPage() {
  return (
    <div className='landing-page'>
      <div className='flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-white '>
            <img src={Logo} alt='logo' className='object-left' />

            <h1 className='w-full text-3xl font-bold text-[#F9500D]'>MORINGA.</h1>
            <ul className='md:flex'>
                <li className='p-4 text-white hover:text-[#F9500D]'>
                    <Link to="/"> Home</Link>
                </li>
                <li className='p-4 text-white hover:text-[#F9500D]'>
                    <Link to="/login"> Login</Link>
                </li>
                <li className='p-4 text-white hover:text-[#F9500D]'>
                    <Link to='/signup'>Register</Link>
                </li>
            </ul>
      </div>

      {/* Hero */}
      <div className='text-white'>
            <div className='max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center'>
            <p className='text-[#F9500D] font-bold p-2'>
                A COMMUNITY OF AMAZING DEVELOPERS
            </p>
            <h1 className='md:text-7xl sm:text-6xl text-4xl font-bold md:py-6'>
                Grow with other devs.
            </h1>
            <div className='flex justify-center items-center'>
            
                    <div className="relative h-[98%] flex items-center w-full justify-end pr-40 bg-[url(https://mcdn.wallpapersafari.com/medium/36/71/6IYbTr.jpg)] bg-cover">
                        <video autoPlay muted loop className="h-5/6 opacity-90">
                            <source
                            src="https://videos.ctfassets.net/5ltrds677kah/4egYmxaUbJ9lFo6eUwe3kc/b5634a0710986b2c34743931c8a2d68e/blog_to_video.mp4"
                            type="video/mp4"
                            />
                        </video>
                    </div>

            </div>
            <p className='md:text-2xl text-xl font-bold text-gray-500'>A place where coders share, stay up-to-date and grow their careers. </p>
            <Link className='bg-[#F9500D] hover:bg-black w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black hover:text-[#F9500D]' to='signup'>Get Started</Link>
            {/* Redirect button -> change to link -> Signup screen*/}
            </div>
      </div>

      {/* Sample Article */}
      <div className='w-full bg-white py-16 px-4'>
            <div className='max-w-[1240px] mx-auto grid md:grid-cols-2'>
                {/* <img className='w-[500px] mx-auto my-4' src={Laptop} alt='/' /> */}
                <div className='flex flex-col justify-center'>
                    <p className='text-[#F9500D] font-bold '>DATA ANALYTICS </p>
                    <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2'>How To Manage Data Analytics Centrally</h1>
                    <p>
                        Data analytics draws from a range of disciplines — including computer programming, mathematics, and statistics — to perform analysis on data in an effort to describe, predict, and improve performance. To ensure robust analysis, data analytics teams leverage a range of data management techniques, including data mining, data cleansing, data transformation, data modeling, and more.
                    </p>
                    <Link to='/login' className='bg-[#F9500D] hover:bg-black text-black hover:text-[#F9500D] w-[200px] rounded-md font-medium my-6 mx-auto md:mx-0 py-3 text-center'>Continue Reading</Link>
                </div>
            </div>
      </div>

      {/* Newsletter */}
      <div className='w-full py-16 text-white px-4'>
            <div className='max-w-[1240px] mx-auto grid lg:grid-cols-3'>
                <div className='lg:col-span-2 my-4'>
                    <h1 className='md:text-4xl sm:text-3xl text-2xl font-medium py-2'>
                    Want announcements and tech articles updates sent directly to your inbox? </h1>

                    <p>Sign up to our newsletter and stay up to date. </p>
                    <img src={Newsletter} alt='newsletter' className='w-[4rem]' />

                </div>
                <div className='my-4'>
                    <div className='flex flex-col sm:flex-row items-center justify-between w-full'>
                        <input
                            className='p-3 flex w-full rounded-md text-black'
                            type='email'
                            placeholder='Enter Email'
                        />
                        <button className='bg-[#F9500D] hover:bg-black text-black hover:text-[#F9500D] rounded-md font-medium w-[200px] ml-4 my-6 px-6 py-3'>
                            Notify Me
                        </button>
                    </div>
                    <p>
                        We care about the protection of your data. Read our{' '}
                        <span className='text-[#F9500D]'>Privacy Policy.</span>
                    </p>
                </div>
            </div>
      </div>


    </div>
  )
}

export default LandingPage