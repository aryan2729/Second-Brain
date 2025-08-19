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
            const jwt = (response as any).data.token;
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

    return <div className="min-h-screen flex items-center justify-center animate-gradient bg-gradient-to-r from-indigo-800 via-purple-600 via-pink-600 via-red-500 to-stone-700 px-4">

  <div className="relative p-[2px] rounded-3xl animate-glow bg-gradient-to-r from-indigo-500 via-pink-500 to-red-500 w-full max-w-sm sm:max-w-md md:max-w-md">
    

    <div className="relative bg-white/90 backdrop-blur-md p-6 sm:p-8 md:p-10 lg:p-12 rounded-3xl shadow-2xl w-full transition-all duration-500 hover:scale-105 hover:shadow-3xl overflow-hidden">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 text-gray-800">Signin</h2>
      <Input ref={usernameRef} placeholder="Username" />
      <Input ref={passwordRef} placeholder="Password" />
      {error && <div className="text-red-500 text-center mt-2 mb-2">{error}</div>}
      <div className="flex justify-center pt-6">
        <Button onClick={signinFun} variant="secondary" text="Signin" fullWidth={true} loading={false}/>
      </div>



      <div className="mt-4 sm:mt-6 text-center text-md sm:text-md text-gray-600 flex flex-col sm:flex-row items-center justify-center gap-1">
            <span>Don’t have an account?</span>
            <a
              href="/signup"
              className="text-indigo-600 font-medium hover:underline hover:text-indigo-700 transition-colors duration-200"
            >
              Sign up
            </a>
          </div>


    </div>

  </div>
</div>

}
