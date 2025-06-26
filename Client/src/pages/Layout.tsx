import { useNavigate , Outlet } from "react-router-dom"
import './layout.css';
import { BrainIcon } from "../icons/BrainIcon"
import { GithubIcon } from "../icons/GithubIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import img1 from '../assets/1.png';
import img2 from '../assets/2.png';
import img7 from '../assets/3.png';
import img4 from '../assets/4.png';
import img5 from '../assets/5.png';
import img3 from '../assets/6.png';
import img6 from '../assets/11.png';
import img8 from '../assets/8.png';
import header from '../assets/header.mp4'
import end from '../assets/end.mp4'
import head from '../assets/head.png'





export const Layout = () => {

    const navigate = useNavigate();

    const images = [img1, img2, img3, img4, img5, img6 , img7  , img8 ];

    return <div className="min-h-screen bg-white">

        <nav className="mt-6 flex flex-col sm:flex-row items-center font-sans text-black text-2xl sm:text-4xl font-medium tracking-tight leading-none px-4 sm:px-10">
            <BrainIcon />
            <span className="ml-2 sm:ml-4">Second Brain</span>
            <div className="mt-4 sm:mt-0 sm:ml-auto flex gap-2 sm:gap-4">
                <button onClick={() => navigate("/signup")} className="px-4 py-2 text-sm sm:text-base text-gray-900 font-extrabold uppercase tracking-super-widest focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 liquid-fill-button hover:border-white border-2 sm:border-3 border-gray-900 rounded-full">
                    Signup
                </button>
                <button onClick={() => navigate("/signin")} className="px-4 py-2 text-sm sm:text-base text-gray-900 font-extrabold uppercase tracking-super-widest focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 liquid-fill-button hover:border-white border-2 sm:border-3 border-gray-900 rounded-full">
                    Signin
                </button>
            </div>
        </nav>

        <div className="w-full mt-6 flex flex-col md:flex-row items-center">
            <div className="font-sans text-black text-3xl sm:text-5xl md:text-6xl leading-tight font-light p-4 sm:p-8 md:p-16 lg:p-24">
                Your second brain to<br />
                connect your <span className="italic font-normal">digital world</span>
            </div>
            <div className="w-full max-w-xs sm:max-w-md md:max-w-md lg:max-w-lg flex justify-center">
                <img className="rounded-full mt-4 sm:mt-8 shadow-md w-full aspect-video object-cover overflow-hidden" src={head} />
            </div>
        </div>

        <div className="w-full min-h-[350px] sm:min-h-[540px] bg-black text-white rounded-t-[2.5rem] sm:rounded-t-[5rem] mt-30">
            <div className="px-4 sm:px-16 md:px-20 lg:ml-28 flex flex-col items-center sm:items-start">
                <h2 className="text-4xl sm:text-6xl md:text-[120px] leading-tight pt-8 sm:pt-16 font-normal text-featured-size text-center sm:text-left">
                    Featured your
                </h2>
                <div className="flex flex-col sm:flex-row items-center">
                    <video autoPlay loop playsInline muted className="rounded-full ml-0 sm:ml-12 shadow-lg w-full max-w-xs sm:max-w-sm aspect-video object-cover overflow-hidden" src={header}></video>
                    <div className="text-5xl sm:text-7xl md:text-[150px] pl-0 sm:pl-4 tracking-wide font-light italic mt-4 sm:mt-0">cards</div>
                </div>
                <div className="mt-8 sm:mt-16 flex flex-wrap gap-4 sm:gap-10 justify-center items-center bg-black py-6 sm:py-10">
                    {images.map((img, idx) => (
                        <img
                            key={idx}
                            src={img}
                            alt={`Showcase ${idx + 1}`}
                            className="rounded-3xl shadow-2xl w-40 sm:w-64 md:w-96 max-h-40 sm:max-h-80 md:max-h-[28rem] object-contain bg-white"
                        />
                    ))}
                </div>
            </div>
        </div>

        <div className="w-full mt-2">
            <div className="w-full flex flex-col md:flex-row items-center bg-white px-4 sm:px-10 md:px-20 lg:px-40 mt-2 md:mt-4">
                <video autoPlay loop muted playsInline className="border-none bg-white shadow-[0_0_0_0px_white] pt-5 rounded-full w-full max-w-xs sm:max-w-md md:max-w-lg" src={end}></video>
                <div className="flex flex-col items-center">
                    <div className="text-4xl sm:text-6xl md:text-[120px] leading-tight pt-6 sm:pt-12 pl-4 sm:pl-12 font-normal text-featured-size">
                        Ready to
                    </div>
                    <div className="text-4xl sm:text-6xl md:text-[120px] leading-tight pt-2 sm:pt-6 pl-4 sm:pl-14 tracking-wide font-light italic">
                        begin?
                    </div>
                    <button onClick={() => navigate("/signup")} className="mt-4 sm:mt-6 px-6 sm:px-10 py-4 sm:py-8 text-base text-gray-900 font-extrabold uppercase tracking-super-widest focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 liquid-fill-button hover:border-white border-2 sm:border-4 border-gray-900 rounded-full">
                        Click here
                    </button>
                </div>
            </div>
        </div>

        <div className="bg-white">
            <Outlet />
        </div>

        <footer className="w-full bg-white py-4 sm:py-6 border-t border-gray-200 shadow-[0_-2px_12px_0_rgba(0,0,0,0.04)] flex flex-col md:flex-row items-center md:justify-between justify-center gap-2 sm:gap-4 text-gray-600 font-medium text-base sm:text-lg mt-13 sm:mt-20 px-4 sm:px-6">
            <div className="flex items-center gap-2">
                <span>Made with <span aria-label="love" role="img">❤️</span> by <span className="font-semibold">Aryan</span></span>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
                <a href="https://github.com/aryan2729" target="_blank" rel="noopener noreferrer" aria-label="Github" className="hover:text-black transition-colors">
                    <span style={{ width: '28px', height: '28px', display: 'inline-block' }}><GithubIcon /></span>
                </a>
                <a href="https://www.linkedin.com/in/aryan-code-28b3aa2a7" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-blue-700 transition-colors">
                    <span style={{ width: '28px', height: '28px', display: 'inline-block' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.968v5.699h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.838-1.563 3.036 0 3.6 2 3.6 4.594v5.602z"/></svg>
                    </span>
                </a>
                <a href="https://twitter.com/aryancode27" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-blue-500 transition-colors">
                    <span style={{ width: '28px', height: '28px', display: 'inline-block' }}><TwitterIcon /></span>
                </a>
            </div>
        </footer>
    </div>
}