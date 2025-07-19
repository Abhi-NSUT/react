import React, { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom'

function Github() {
    const data=useLoaderData()
    // const[data,setData]=useState([]);
    // useEffect(()=>{
    //     fetch('https://api.github.com/users/Abhi-NSUT')
    //     .then((res)=>res.json())
    //     .then(data=>{
    //         setData(data);
    //     })
    // },[])
  return (
    //to know what to write in next line we have to study api call
    <div className='text-center bg-gray-600 p-4 m-4 text-3xl'>Github Followers:{data.followers}
    <img src={data.avatar_url} alt="Git picture" width='300' /></div>
  )
}

export default Github
export const githubInfoLoader=async()=>{
    const response =await fetch('https://api.github.com/users/Abhi-NSUT')
    return response.json()
}