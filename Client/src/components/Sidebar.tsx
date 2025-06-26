import { BrainIcon } from "../icons/BrainIcon";
import { DocumentIcon } from "../icons/DocumentIcon";
import { GithubIcon } from "../icons/GithubIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  setTypeFilter: (type: string | null) => void;
}




export function Sidebar({ setTypeFilter }: SidebarProps) {
    
    const navigate = useNavigate();



    return <div className="h-screen w-72 fixed border-r border-gray-200 bg-white left-0 top-0"  >

        <div className="text-gray-800  items-center pt-4 pl-10  flex   text-2xl  font-bold">
                <div className="pr-2">
                    <BrainIcon/>
                </div>
                <div >
                    Second Brain
                </div>
        </div>

        <div className="pl-2 pt-8 " >
        <div onClick={() => setTypeFilter("twitter")}>
            <SidebarItem icon={<TwitterIcon/>} text="Twitter"/>
        </div>
        <div onClick={() => setTypeFilter("youtube")}>
            <SidebarItem icon={<YoutubeIcon/>} text="Youtube"/>
        </div>
        <div onClick={() => setTypeFilter("document")}>
            <SidebarItem icon={<DocumentIcon/>} text="Document"/>
        </div>
        <div onClick={() => setTypeFilter("github")}>
            <SidebarItem icon={<GithubIcon/>} text="Github"/>
        </div>
        <div onClick={() => setTypeFilter(null)}>
            <SidebarItem icon={<span/>} text="All"/>
        </div>

        

        <div className="absolute inset-x-0 bottom-5 ">
        <button onClick={()=>{
            localStorage.removeItem("token");
            navigate("/homepage");
        }}
         className="w-40  h-10  text-white  bg-black border-1  ml-13 rounded-xl  ">Logout </button>
        </div>
        </div>
        
    </div>
}