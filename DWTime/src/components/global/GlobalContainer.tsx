import { Outlet } from "react-router-dom";
import { NavigatorRoot } from "../../routes/root";
import { Header } from "./Header";



export function GlobalContainer({children}: {children?: React.ReactNode}  ) {
    return (
        <div className="flex h-screen w-screen overflow-hidden">
            <NavigatorRoot/>
            <div className='w-full'>
                <Header/>
                <div className="content px-[40px] pt-6 h-full bg-[#F5F7FA]">
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}