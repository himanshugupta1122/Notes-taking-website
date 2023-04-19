import React, { useState } from 'react'
import Cookies from 'js-cookie'

export default function Signup() {

    function isValidEmailAddress(address) {
        return !! address.match(/.+@.+/);
    }
    const signUpHandle = async () => {
        if (email.length === 0 || password.length === 0) {
            seterror(true)
            return
        }
        try {
            if(!isValidEmailAddress(email)){
                setErrorText("Invalid Email")
                seterror(true)
                return
            }
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, username })
            };
            const response = await fetch('/auth/signup', requestOptions);
            const data = await response.json();
            await Cookies.set('token', data.token, { expires: 7 })
            await window.location.replace("/")
        } catch (error) {
            console.log(error);
            seterror(true)
        }
    }

    const [username, setusername] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [error, seterror] = useState(false);
    const [errorText, setErrorText] = useState("Empty Task");

    return (
        <>
          <div>
        <h1 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Create New Accout</h1>
      
        
      </div>
      <div class="max-w-md w-full mx-auto bg-white shadow rounded-lg p-7 space-y-6">

        <div class="flex flex-col">
          <label class="text-sm font-bold text-gray-600 mb-1" for="email">Your Name</label>
          <input class="border rounded-md bg-white px-3 py-2" type="text" name="Name" id="name" placeholder="Enter Your name" onChange={e => setusername(e.target.value)}/>
        </div>

        <div class="flex flex-col">
          <label class="text-sm font-bold text-gray-600 mb-1" for="password">Email Address</label>
          <input class="border rounded-md bg-white px-3 py-2" type="email" name="password" id="password" placeholder="Enter Your address"  onChange={e => setemail(e.target.value)}/>
        </div>

         <div class="flex flex-col">
          <label class="text-sm font-bold text-gray-600 mb-1" for="password">Password</label>
          <input class="border rounded-md bg-white px-3 py-2" type="password" name="password" id="password" placeholder="Enter your Password"  onChange={e => setpassword(e.target.value)}/>
        </div>

        <div class="flex justify-between text-sm">
          <div class="flex items-center space-x-2">
            <input class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" type="checkbox" name="remember" id="remember" />
            <label for="remember">Remember me</label>
          </div>
        </div>
        <div>
          <button class="w-full bg-indigo-600 text-white rounded-md p-2" onClick={signUpHandle}>Singup</button>
        </div>
        <div class="relative pb-2">
          <div class="absolute top-0 left-0 w-full border-b"></div>
          <div class="absolute -top-3 left-0 w-full text-center">
            
          </div>
        </div>
        
      </div>

            {error && <h1 className="pb-2 pt-4 justify-center">OOPs : {errorText}</h1>}
        </>
    )
}
