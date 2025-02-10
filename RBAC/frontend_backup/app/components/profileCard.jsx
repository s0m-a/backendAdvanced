import { useState, useEffect } from "react"
import axiosInstance from "../../lib/axios";
import toast from "react-hot-toast";
import { ArrowRight, Loader, Lock, Mail, User } from 'lucide-react';
import {useUser} from '../../context/UserContext'


const ProfileCard = () => {
    const [user, setUser]= useState(null);
    useEffect( ()=>{
        const fetchUser = async ()=>{
            try {
                const response = await axiosInstance.get('user/veiwProfile');
                setUser(response.data.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
                const errordata = response?.data?.message || 'error getting profile';
                toast.error(errordata)
            }
        }
        fetchUser();
    }, []);
    if (!user) return <p>Loading...</p>;
  return (
<div className="w-[90%] m-auto lg:w-[40%] bg-customYellow text-gray-700 p-6 capitalize flex flex-col shadow-lg mt-10">
    <h1 className="text-center uppercase antialiased font-bold text-xl mb-10">User Profile</h1>

    <div className="flex justify-start items-center border-dotted border-b-2 border-customBrownDark m-6">
        <div className="flex items-center">
            <User className="w-5 h-5 mr-2"/>  
            <span> First name:</span>
        </div>
        <p className="ml-2"> {user.firstName}</p>
    </div>

    <div className="flex justify-start items-center border-dotted border-b-2 border-customBrownDark m-6">
        <div className="flex items-center">
            <User className="w-5 h-5 mr-2"/>  
            <span> Last name:</span>
        </div>
        <p className="ml-2">{user.lastName}</p>
    </div>

    <div className="flex justify-start items-center border-dotted border-b-2 border-customBrownDark m-6">
        <div className="flex items-center">
            <Mail className="w-5 h-5 mr-2"/>  
            <span> Email:</span>
        </div>
        <p className="ml-2"> {user.email}</p>
    </div>
    <div className="">
    <button 
    className="bg-customGreen text-white font-semibold py-4 px-4 rounded-md w-[45%]
            hover:bg-white hover:border hover:border-customGreen hover:text-gray-500 
            transition duration-200 my-4  shadow-md lg:m-4 ">edit profile</button>
    </div>

</div>
  )
}

export default ProfileCard
