import { useNavigate } from "react-router-dom";

export const ErrorPage = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-black">
            <div className="mb-8 animate-bounce">
                <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 512 512" fill="none">
                    <circle cx="256" cy="256" r="256" fill="#fff"/>
                    <path d="M256 120c-8.8 0-16 7.2-16 16v144c0 8.8 7.2 16 16 16s16-7.2 16-16V136c0-8.8-7.2-16-16-16zm0 240a24 24 0 1 0 0 48 24 24 0 0 0 0-48z" fill="#000"/>
                </svg>
            </div>
            <div className="text-5xl font-extrabold text-white mb-4 tracking-tight drop-shadow-lg">Oops! Wrong Page</div>
            <div className="text-lg text-gray-300 mb-8">The page you are looking for doesn't exist or has been moved.</div>
            <button
                onClick={() => navigate("/")}
                className="px-8 py-3 bg-white text-black rounded-full shadow-lg font-semibold text-lg hover:scale-105 transition-transform border border-white"
            >
                Go Home
            </button>
        </div>
    );
}