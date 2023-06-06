import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Context } from "../context";

import homeIcon from "../assets/home-alt-2-solid-24.png";
import newIcon from "../assets/file-plus-solid-24.png";
import reportIcon from "../assets/report-solid-24.png";
import editIcon from "../assets/edit-solid-24.png";

const menu = [
    {name:"Home", link:"", icon:homeIcon},
    {name:"New", link:"new", icon:newIcon},
    {name:"Report", link:"report", icon:reportIcon},
    {name:"Specialty", link:"specialty", icon:editIcon},
    {name:"Specialist", link:"specialist", icon:editIcon},
];

function Item () {
    const {pathname} = useLocation();
    const navigate = useNavigate();

    const route = pathname.split("/")[2] || "";

    const isActive = (link:string):string => {
        return link === route ? "border-slate-300 bg-slate-300" : "";
    };
    return(
        <>
            {
                menu.map((item)=>
                    <li
                        key={item.name}
                        className={`w-full flex items-center justify-center py-4 cursor-pointer border transition-all duration-300 hover:bg-slate-300 ${isActive(item.link)}`}
                        onClick={()=>navigate(item.link)}
                    >
                        <div className="w-6/12 flex items-center justify-start gap-4">
                            <img src={item.icon} alt={item.name} />
                            {item.name}
                        </div>
                    </li>
                )
            }
        </>
    );
}

function Sidebar() {
    const { dispatch } = useContext(Context);

    const logOut = () => dispatch({ type:"removeToken"});

    return (
        <div className="col-span-2 bg-slate-200 grid grid-rows-6">
            <h1 className="m-auto font-black text-2xl text-blue-950">Medical Oficce</h1>
            <ul className="row-span-4 flex flex-col items-center" >
                <Item />
            </ul>
            <button
                className="row-start-6 m-auto bg-red-600 py-1 px-6 rounded-md text-white font-bold border-2 border-red-800 transition-all duration-300 hover:bg-red-500 hover:shadow-lg hover:border-red-600"
                onClick={logOut}
            >
                Log Out
            </button>
        </div>
    );
}

export default Sidebar;
export { Sidebar };