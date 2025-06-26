import { useRef, useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signin(){

    const navigate = useNavigate();
    const [error, setError] = useState("");

    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    async function signinFun() {
        setError("");
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        try {
            const response = await axios.post(BACKEND_URL + "/api/v1/signin", {
                username,
                password
            });
            const jwt = response.data.token;
            localStorage.setItem("token", jwt);
            navigate("/dashboard");
        } catch (err: any) {
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError("An error occurred. Please try again.");
            }
        }
    }

    return <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
        <div className="bg-white/80 backdrop-blur-md border border-gray-200 p-12 rounded-3xl shadow-2xl w-full max-w-md transition-all duration-300">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Signin</h2>
            <Input ref={usernameRef} placeholder="Username" />
            <Input ref={passwordRef} placeholder="Password" />
            {error && <div className="text-red-500 text-center mt-2 mb-2">{error}</div>}
            <div className="flex justify-center pt-6 ">
                <Button onClick={signinFun} variant="secondary" text="Signin" fullWidth={true} loading={false}/>
            </div>
        </div>
    </div>
}