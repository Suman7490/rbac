import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Profile = () => {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8081/auth/profile', { withCredentials: true })
      .then(result => {
        if(result.data.success){
          setInfo(result.data.data)
        } else{
          alert(result.data.error)
        }
      })
      .catch(err => {
        alert(err.response?.data?.error || "An error occurred");
        console.error("Axios error: ", err);
      })
  }, [])

  if (!info) return <div>Loading...</div>;

  return (
    <>
      <div className="flex items-center h-screen w-full justify-center">
        <div className="max-w-xs">
          <div className="bg-white shadow-xl rounded-lg py-3 px-5">
            <div className="photo-wrapper p-2">
              <img className="w-32 h-32 rounded-full mx-auto" src={`http://localhost:8081/Images/` + info.photo} alt="John Doe" />
            </div>
            <div className="p-2">
              <h3 className="text-center text-xl text-gray-900 font-medium leading-8">{info.name}</h3>
              <div className="text-center text-gray-400 text-xs font-semibold">
                <p>{info.role}</p>
              </div>
              <table className="text-xs my-3">
                <tbody><tr>
                  <td className="px-2 py-2 text-gray-500 font-semibold">Address</td>
                  <td className="px-2 py-2">{info.address}</td>
                </tr>
                  {/* <tr>
                    <td className="px-2 py-2 text-gray-500 font-semibold">Phone</td>
                    <td className="px-2 py-2">+977 9955221114</td>
                  </tr> */}
                  <tr>
                    <td className="px-2 py-2 text-gray-500 font-semibold">Email</td>
                    <td className="px-2 py-2">{info.email}</td>
                  </tr>
                </tbody></table>

              <div className="text-center my-3">
                <a className="text-xs text-indigo-500 italic hover:underline hover:text-indigo-600 font-medium" href="#">View Profile</a>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
