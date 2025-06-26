import { useRef, useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import { BACKEND_URL } from "../config";
import axios from "axios";

enum ContentType {
    Youtube = "youtube",
    Twitter = "twitter",
    Document = "document",
    Github = "github"
}

interface CreateContentModalProps {
  open: boolean;
  onClose: () => void;
}

export function CreateContentModal({open, onClose}: CreateContentModalProps){
    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const textRef = useRef<HTMLInputElement>(null);


    const[type , setType] = useState(ContentType.Youtube);

    async function addContent(){

        const title = titleRef.current?.value;
        const link = linkRef.current?.value;
        const text = textRef.current?.value;

        await axios.post(`${BACKEND_URL}/api/v1/content`,{
            link , 
            title , 
            text,
            type , 
        },{
            headers : {
                "Authorization": localStorage.getItem("token")
            }
        })
        onClose();
    }
return <div>
        {open && (
            <div>
                <div className="fixed inset-0 bg-slate-500 opacity-60 z-40"></div>
                <div className="fixed inset-0 flex items-center justify-center z-50 transition-all duration-300">
                    <div className="bg-white p-8 rounded-2xl shadow-2xl min-w-[350px] max-w-full transition-all duration-300 scale-100">
                        <div className="flex justify-end mb-2">
                            <button onClick={onClose} className="text-3xl leading-none hover:text-red-500 transition-colors duration-200">
                                <CrossIcon />
                            </button>
                        </div>
                        <div className="space-y-5 mb-6">
                            <Input ref={titleRef} placeholder={"Title"}  />
                            <Input ref={linkRef} placeholder={"Link"} />
                            <Input ref={textRef} placeholder={"Text"} />
                        </div>
                        <div className="flex gap-3 justify-center pb-4">
                            <Button text="Youtube" variant={type === ContentType.Youtube ? "secondary" : "primary"} onClick={() => { setType(ContentType.Youtube) }} />
                            <Button text="Twitter" variant={type === ContentType.Twitter ?  "secondary" : "primary"} onClick={() => { setType(ContentType.Twitter) }} />
                            <Button text="Document" variant={type === ContentType.Document ?  "secondary" : "primary"} onClick={() => { setType(ContentType.Document) }} />
                            <Button text="Github" variant={type === ContentType.Github ?  "secondary" : "primary"} onClick={() => { setType(ContentType.Github) }} />
                        </div>
                        <div className="flex justify-center">
                            <button
                                onClick={addContent}
                                className="flex justify-center text-white bg-blue-800 px-16 py-3 rounded-full text-lg font-semibold shadow hover:bg-blue-900 transition-all duration-200"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </div>
}