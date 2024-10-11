import { Spinner } from "@chakra-ui/react";

export const LoadingScreen = ()=> {
    return (
        <div className="flex items-center justify-center w-screen h-screen">
            <Spinner className="w-[200px] h-[200px]"/>
        </div>
    ); 
}