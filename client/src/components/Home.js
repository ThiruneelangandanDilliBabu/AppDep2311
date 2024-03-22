import React from 'react'
import { Link } from 'react-router-dom'
import TopNavigation from './TopNavigation';
import { useSelector } from 'react-redux';

function Home() {

    let storeObject=useSelector((store)=>{
        console.log(store)
        return store;
    });

  return (
    <div>
        <TopNavigation></TopNavigation>
        <h1>Home</h1>

      <h2>{`${storeObject.userDetails.firstName}${storeObject.userDetails.lastName}`} </h2>

      <img src={`/${storeObject.userDetails.profilePic}`}></img>

    </div>
  )
}

export default Home