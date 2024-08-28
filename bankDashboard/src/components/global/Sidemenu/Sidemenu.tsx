export const Sidemenu = () => {
    const menuItens = [
        {   
            icon: "/img/menu/home.png",
            iconActive: "/img/menu/homeActive.png",
            title: "Dashboard",
            path: "/",
        },
    ]
    
    return (
        <aside className="w-[300px] bg-red-500 h-screen">
            <div className="logo py-[35px] pl-[40px] pr-[28px]">
                <img src="/img/bankLogo.png" alt="Logo do banco" />
            </div>
        </aside>
    )
}