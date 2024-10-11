import { Plus } from "lucide-react"
import { TTimerITem } from "./types";

type TAddTimerButton = {
    onClick: React.Dispatch<React.SetStateAction<TTimerITem>>; 
}
export const AddTimerButton = (props: TAddTimerButton) => {
    return (
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-4 rounded-[50%] fixed right-[30px] bottom-[50px] shadow-md transition" onClick={props.onClick}>
            <Plus size={32}/>
        </button>
    )
}