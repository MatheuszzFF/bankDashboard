import { Input, useDisclosure } from "@chakra-ui/react";
import { Bell, Search, Settings } from "lucide-react";
import { PopupSettings } from "./PopupSettings";

export function Header() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <header className="bg-white h-max w-full py-[32px] px-[40px]">
                <div className="flex justify-between items-center">
                    <h1 className="text-secondary text-[28px] text-left font-semibold w-max">Overview</h1>
                    <div className="flex gap-8 items-center">
                        <div className="search flex items-center gap-4 bg-headerIconsBg rounded-[50px] w-max py-4 px-8">
                            <Search color="#343C6A" />
                            <Input type="text" placeholder="Search for something" className="bg-transparent placeholder:text-[#8BA3CB] text-[#8BA3CB] outline-none border-none"/>
                        </div>
                        <div onClick={onOpen} className="settings bg-headerIconsBg p-3 flex items-center justify-center rounded-full cursor-pointer transition-opacity hover:opacity-60">
                            <Settings color="#343C6A"/>
                        </div>
                        <div className="notifications bg-headerIconsBg p-3 flex items-center justify-center rounded-full cursor-pointer transition-opacity hover:opacity-60">
                            <Bell color="#343C6A"/>
                        </div>
                        <div className="perfil">
                            <img src="/img/perfil.png"/>
                        </div>
                    </div>
                </div>
            </header>
            {isOpen &&  <PopupSettings isOpen={isOpen} onOpen={onOpen} onClose={onClose}/>}

        </>
    )
}