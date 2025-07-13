import React from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate()
    return (
        <div className=' flex items-center justify-center h-screen bg-slate-50'>
            <div className=' bg-white w-96 border-[4px] items-center border-[#dd9038] rounded-3xl shadow-lg shadow-gray-400 py-8'>
                <div className='flex flex-col mx-auto items-center h-full'>
                    <h1 className='text-[#FEBE77] text-4xl font-bold'>Login</h1>
                    <input type='email' placeholder='Enter Your Email' className='border-b-2 border-gray-200 p-2 w-[90%] mt-10 focus:outline-none focus:border-orange-300 font-normal ' />
                    <input type='password' placeholder='Enter Password' className='border-b-2 border-gray-200 p-2 w-[90%] mt-5 focus:outline-none focus:border-orange-300 ' />
                    <button className='bg-[#FF6E40] bg-transparent border-[1px] hover:border-none text-[#FF6E40] hover:text-white hover:bg-[#FF6E40] p-2 px-10 rounded-md mt-10 font-semibold shadow-md hover:shadow-slate-700 duration-300'
                        onClick={() => navigate('/')}
                    >Login</button>

                </div>
            </div>
        </div>
    )
}

export default Login