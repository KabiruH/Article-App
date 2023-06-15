import React, { useState } from 'react'
import Control from '../assets/control.png'
import Logo from '../assets/logo.png';
import Book from '../assets/Folder.png'
import Person from '../assets/User.png'
import Home from '../assets/Home.png'
import Logout from '../assets/Logout.png'
import Profiles from '../assets/Profile.png'
import Categ from '../assets/Category.png'
import Feed from '../components/Feed';
import Articles from '../components/Articles';
import Users from '../components/Users';
import Categories from '../components/Categories';
import Category from '../components/Category';
import Profile from '../components/Profile';

function Dashboards({ user, handleLogout }) {

    const [open, setOpen] = useState(true)
    const [activeDashboard, setActiveDashboard] = useState('feed');

    function handleClick(dashboard){
        setActiveDashboard(dashboard);
    }

    // console.log(user)

    function handleSignout(){
        // Logout
        fetch('http://localhost:3000/logout', {
          method: 'DELETE',
        })
        .then(response => {
          if (response.ok) {
            // handle successful logout
            handleLogout();
            
          } else {
            throw new Error('Logout failed');
          }
        })
        .catch(error => console.error(error));
    }

  return (
    <div className='flex '>
        <div className={`${open ? "w-72" : "w-20"} duration-300 h-screen p-5 pt-8 bg-[#101f3c] relative `}>
            <img
                src={Control}
                className={`absolute cursor-pointer rounded-full -right-3 top-9 w-7 border-2 border-[#101f3c] ${!open && 'rotate-180'}`}
                onClick={() => setOpen(!open)}
            />
            <div className='flex gap-x-4 items-center'>
                <img 
                    src={Logo} 
                    className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"}`} 
                />
                <h1 className={`text-white origin-left font-medium text-2xl duration-300 ${!open && "scale-0"}`}>MS Daily Dev</h1>
            </div>
            {/* Sidebar Menu */}
            <ul className='pt-12'>
                <li className={`${activeDashboard === 'feed' ? 'bg-[rgba(255,255,255,0.17)]' : ""} pt-4 pb-4 text-white hover:text-[#F9500D] text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-[rgba(255,255,255,0.17)] rounded-md`} 
                    onClick={() => handleClick('feed')}
                >
                    <img src={Home}/>
                    <span className={`${!open && 'hidden'} origin-left duration-200`}>Feed</span>
                </li>
                <li className={`${activeDashboard === 'articles' ? 'bg-[rgba(255,255,255,0.17)]' : ""} pt-4 pb-4 text-white hover:text-[#F9500D] text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-[rgba(255,255,255,0.17)] rounded-md`} 
                    onClick={() => handleClick('articles')}
                >
                    <img src={Book}/>
                    <span className={`${!open && 'hidden'} origin-left duration-200`}>Articles</span>
                </li>
                {user.role === 'admin' &&
                    <li className={`${activeDashboard === 'categories' ? 'bg-[rgba(255,255,255,0.17)]' : ""} pt-4 pb-4 text-white hover:text-[#F9500D] text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-[rgba(255,255,255,0.17)] rounded-md`} 
                        onClick={() => handleClick('categories')}
                    >
                        <img src={Categ} className="w-6 h-6" />
                        <span className={`${!open && 'hidden'} origin-left duration-200`}>Categories</span>
                    </li>
                }
                {user.role === 'admin' &&
                    <li className={`${activeDashboard === 'users' ? 'bg-[rgba(255,255,255,0.17)]' : ""} pt-4 pb-4 text-white hover:text-[#F9500D] text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-[rgba(255,255,255,0.17)] rounded-md`} 
                        onClick={() => handleClick('users')}
                    >
                        <img src={Person}/>
                        <span className={`${!open && 'hidden'} origin-left duration-200`}>Users</span>
                    </li>
                }
                {/* Logout & Profile */}
                <li className={`${activeDashboard === 'logout' ? 'bg-[rgba(255,255,255,0.17)]' : ""} pt-4 pb-4 text-white hover:text-[#F9500D] text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-[rgba(255,255,255,0.17)] rounded-md`} 
                    onClick={() => handleSignout()}
                >
                    <img src={Logout}/>
                    <span className={`${!open && 'hidden'} origin-left duration-200`}>Logout</span>
                </li>
                <li className={`${activeDashboard === 'profile' ? 'bg-[rgba(255,255,255,0.17)]' : ""} pt-4 pb-4 text-white hover:text-[#F9500D] text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-[rgba(255,255,255,0.17)] rounded-md`} 
                    onClick={() => handleClick('profile')}
                >
                    <img src={Profiles}/>
                    <span className={`${!open && 'hidden'} origin-left duration-200`}>Profile</span>
                </li>
            </ul>
        </div>
        <div className='p-7 text-2xl flex-1 h-screen'>
            {/* <h1 className='pb-4'>Dashboard</h1> */}
            {activeDashboard === 'feed' && <Feed user={user} />}
            {activeDashboard === 'articles' && <Articles user={user}/>}
            {activeDashboard === 'users' && <Users />}
            {activeDashboard === 'categories' && <Categories user={user} />}
            {/* {activeDashboard === 'categories' && <Category user={user} />} */}
            {activeDashboard === 'profile' && <Profile user={user} />}
        </div>
    </div>
  )
}

export default Dashboards