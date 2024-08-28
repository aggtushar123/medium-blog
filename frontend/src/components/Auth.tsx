import { SignupInput } from "@aggtushar123/medium-common";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";
import { BACKEND_URL } from "../config";
export const Auth = ({type}:  {type: "signup" | "signin"}) => {
    const navigate = useNavigate()
    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: "",
        userName: "",
        password: ""
    })

    async function sendRequest (){
        try {
            const response = await axios.post(`${BACKEND_URL}api/v1/user/${type=== "signup" ? "signup" : "signin"}`, postInputs)
            const jwt = response.data
            localStorage.setItem("token", jwt)
            navigate('/blog')
        } catch (error) {
            alert("Error signing up")
        }
    }

    return <div className="h-screen flex justify-center flex-col">
        <div className="flex flex-col justify-center">
            <div>
                <div className="text-3xl text-center font-extrabold">
                    {type ==="signin" ? "Login to your account" : "Create an Account"}
                </div>
                <div className="text-center text-slate-400">
                    {type ==="signin" ? "Don't have an account?": "Already have an account?"} 
                    <Link className="pl-2 underline" to={type ==="signin" ? "/signup" : "/signin"}>{type ==="signin" ? "Create Account": "Login"}</Link>
                </div>
            </div>
            <div className="flex flex-col p-12">
                {type === "signup" ? <LabelledInput label="Name" type={"text"} placeholder="name" onChange={(e)=> {
                    setPostInputs({
                        ...postInputs,
                        name: e.target.value
                    })
                }}/> : null}
                <LabelledInput label="Username" placeholder="username" onChange={(e)=> {
                    setPostInputs({
                        ...postInputs,
                        userName: e.target.value
                    })
                }}/>
                <LabelledInput label="Password" placeholder="password" type={"password"} onChange={(e)=> {
                    setPostInputs({
                        ...postInputs,
                        password: e.target.value
                    })
                }}/>  
                <button onClick={sendRequest} type="button" className="mt-10 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type==="signup" ? "Sign Up": "Sign In"}</button>

            </div>
        </div>
    </div>
}
interface LabelledInputType {
    label: string;
    placeholder: string;
    type?: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

function LabelledInput({label, placeholder, type, onChange}: LabelledInputType) {
    return <div>
    <label className="block mt-4 mb-2 text-sm text-gray-900 dark:text-white font-semibold">{label}</label>
    <input type={type || "text"} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} onChange={onChange} required />
</div>
}