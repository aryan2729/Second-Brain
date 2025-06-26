import type { ReactElement } from "react";

interface SidebarItemProp {
    text : string ;
    icon : ReactElement;
}

export function SidebarItem(props : SidebarItemProp ){


    return <div className="flex items-center  text-gray-600  cursor-pointer hover:bg-gray-200 transition-all  duration-150 ease-in-out rounded max-w-48 ml-10 p-4"  >

        <div className="pr-2 ">
            {props.icon}
        </div>
        <div>
            {props.text}
        </div>



            


    </div>

}