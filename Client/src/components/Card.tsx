import { ShareIcon } from "../icons/shareIcon"
import { YoutubeIcon } from "../icons/YoutubeIcon"
import { TwitterIcon } from "../icons/TwitterIcon"
import { DocumentIcon } from "../icons/DocumentIcon"
import { GithubIcon } from "../icons/GithubIcon"
import { DeleteIcon } from "../icons/DeleteIcon"
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    twttr?: any;
  }
}

interface CardProps {
    id: string;
    title : string ;
    type : "youtube" | "twitter" | "document" | "github";
    text : string ;
    link : string  ;
    onDelete?: (id: string) => void;
}

const getTypeIcon = (type: string) => {
    if (type === "youtube") return <YoutubeIcon />;
    if (type === "twitter") return <TwitterIcon />;
    if (type === "document") return <DocumentIcon />;
    if (type === "github") return <GithubIcon />;
    return null;
}

export const Card = ( props: CardProps) => {
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (props.type === "twitter" && window.twttr && window.twttr.widgets) {
            window.twttr.widgets.load(cardRef.current);
        }
    }, [props.type, props.link]);

    return <div ref={cardRef}>
        <div className="p-4 bg-white rounded-md border-gray-200  max-w-80  border-2 min-h-48 min-w-72">
            <div className="flex justify-between">
                <div className="flex items-center text-md">
                    <div className="text-gray-500 pr-3 ">
                        {getTypeIcon(props.type)}
                    </div>
                    {props.title}
                </div>
                <div className="flex ">
                    <div className="pr-2 flex items-center text-gray-500">
                        <a href={props.link} target="_blank">
                             <ShareIcon/>
                        </a>
                    </div>
                    <div className="text-gray-500 flex " >
                        <button className="cursor-pointer " onClick={() => props.onDelete?.(props.id)}>
                            <DeleteIcon />
                        </button>
                    </div>
                </div> 
                               
            </div>
            <div className="pt-2">
                { props.type ===  "youtube" &&    <iframe   className="w-full" src={props.link.replace("watch" , "embed").replace("?v=","/")}  title={props.title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}
                { props.type === "twitter" &&  <blockquote className="twitter-tweet"><a href={props.link.replace("x","twitter")}> </a></blockquote>}
                { props.type === "document" && <a href={props.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Open Document</a>}
                { props.type === "github" && <a href={props.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Open Github Repo</a>}
            </div>

            <div className="pt-3">
                 <p>{props.text}</p>
            </div>
        </div>
    </div>
}