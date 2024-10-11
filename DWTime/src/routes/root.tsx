import { useState } from "react";
import { MenuItem } from "../components";

export const NavigatorRoot = () => {
    const [url, setUrl] = useState<string>(window.location.pathname);
    
    const menuItens = [
        {   
            icon: "img/global/menu/home.png",
            iconActive: "/img/global/menu/homeActive.png",
            title: "Dashboard",
            path: "/",
        },
        {   
            icon: "/img/global/menu/transfer.png",
            iconActive: "/img/global/menu/transferActive.png",
            title: "Transactions",
            path: "/transactions",
        },
        {   
            icon: "/img/global/menu/account.png",
            iconActive: "/img/global/menu/accountActive.png",
            title: "Accounts",
            path: "/accounts",
        },
        {   
            icon: "/img/global/menu/investments.png",
            iconActive: "/img/global/menu/investmentsActive.png",
            title: "Investments",
            path: "/investments",
        },
        {   
            icon: "/img/global/menu/creditCards.png",
            iconActive: "/img/global/menu/creditCardsActive.png",
            title: "Credit Cards",
            path: "/credit-cards",
        },
        {   
            icon: "/img/global/menu/loans.png",
            iconActive: "/img/global/menu/loansActive.png",
            title: "Loans",
            path: "/loans",
        },
        {   
            icon: "/img/global/menu/services.png",
            iconActive: "/img/global/menu/servicesActive.png",
            title: "Services",
            path: "/services",
        },
        {   
            icon: "/img/global/menu/privileges.png",
            iconActive: "/img/global/menu/privilegesActive.png",
            title: "My Privileges",
            path: "/privileges",
        },
        {   
            icon: "/img/global/menu/settings.png",
            iconActive: "/img/global/menu/settingsActive.png",
            title: "Settings",
            path: "/settings",
        },

    ]
    
    return (
        <aside className="w-[300px] bg-white h-full relative">
            <div className="absolute -right-[1px] top-0 w-[1px] h-full bg-[#E6EFF5]"></div>
            <div className="logo py-[35px] pl-[40px] pr-[28px] h-[124px] flex items-center">
                <img src="/img/bankLogo.png" alt="Logo do banco"/>
            </div>

            <ul className="flex flex-col gap-[20px] pr-[20px] py-[20px]">
                {menuItens.map(({ icon, iconActive, title, path }, index) => (
                    <MenuItem key={index} icon={icon} iconActive={iconActive} title={title} path={path} isActive={`${url}` === path ? true : false} onClick={() => {setUrl(path)}} />
                ))}
            </ul>
        </aside>
    )
}