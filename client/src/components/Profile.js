import React, { useState, useEffect } from 'react'
import CreateProfile from './CreateProfile';


function Profile({ user }) {

  // Find if any profile is attached to that id
  const [profile, setProfile] = useState(null)

  const [sortedProfile, setSortedProfile] = useState(null);

  const [error, setError] = useState(false)

  useEffect(() => {
    fetch(`http://localhost:3000/profiles`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Profile not found');
        }
        return response.json();
      })
      .then(data => {
        let filteredArray = data.filter((item) => item.user_id === user.id);
        if (filteredArray.length > 0) {
          setSortedProfile(filteredArray[0]);
        } else {
          setSortedProfile(false);
        }
      })
      .catch(error => {
        console.error(error);
        setError(true);
      });
  }, [user.id]);

  return (
    <div>
      {sortedProfile ? (
        <div className='className="flex justify-center items-center h-screen bg-[#fafbfc]'>
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
            <div className="md:flex">
              <div className="md:flex-shrink-0">
                <img src={sortedProfile.image_url} alt={sortedProfile.full_name} className="w-24 h-24 rounded-full pl-2 pt-2" />
              </div>
              <div className="p-8">
                <div className="uppercase tracking-wide text-sm text-[#F9500D] font-semibold">
                  {sortedProfile.full_name}
                </div>
                <div className="mt-2">
                  <p className="text-gray-600 text-lg">{sortedProfile.bio}</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      ) : (      
        <div>
          <p>No profile yet created for user</p>
          <CreateProfile user={user} setError={setError} />
        </div>
      )}

    </div>
  )
}

export default Profile