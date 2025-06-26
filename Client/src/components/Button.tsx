import type { ReactElement } from "react";

interface Buttonprop {
    variant : "primary"| "secondary" | "third";
    text : string ;
    startIcon ? : ReactElement;
    onClick ? : () => void ;       
    fullWidth ? : boolean;
    loading ? : boolean;
    disabled?: boolean;
}

const variantStyles = {
    primary : "bg-purpleLow text-purpleMid",
    secondary : "bg-purpleHigh text-white",
    third : "bg-slate-700 text-white "
}


const defaultStyle = "px-4 py-2 rounded-md font-light flex item-center cursor-pointer border-2 border-black"


export function Button( props : Buttonprop){

    return <button onClick={props.onClick} className= {` ${variantStyles[props.variant]}  ${defaultStyle} ${props.fullWidth ? "w-full flex justify-center items-center " : ""} ${props.loading ? "opacity-45" : ""} ${props.disabled ? "opacity-50 cursor-not-allowed" : ""}  `} disabled={props.loading || props.disabled} >

        <div className="pr-2 pt-0.5">
            {props.startIcon}
        </div>
        {props.text}

        

    </button>
}