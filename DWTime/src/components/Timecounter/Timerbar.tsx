import { CloseButton } from "@chakra-ui/react"
import { Pause, Pencil, Play } from "lucide-react"
import { useContext, useEffect, useRef, useState } from "react"
import { TTimerITem } from "./types"
import FirestoreContext from "../../contexts/Firebase/Firestore"
import { Timestamp } from "firebase/firestore"

export const Timerbar = (props: {timerItem: TTimerITem, userUid: string}) => {
    const timer = props.timerItem

    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [name, setName] = useState<string | null>(timer.name)
    const [time, setTime] = useState<number>(timer.time);
    const [isPlaying, setIsPlaying] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const inputRef = useRef<HTMLInputElement>(null)
    const intervalRef = useRef<number>(0)
    const { userUid } = props

    const fsContext = useContext(FirestoreContext);
    const { setDocument, queryDocuments } = fsContext;
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    useEffect(() => { 
        setLoading(true)
        queryDocuments(`users/${userUid}/timers`, "id", "==", timer.id)
        .then(res => {
            const findedTimer = res[0]
            console.log(findedTimer)
            if(findedTimer.isPlaying) {
                const newTimer = Timestamp.now() - findedTimer.lastUpdated + findedTimer.time
                setDocument(`users/${userUid}/timers/${timer.id}`, {time: newTimer, lastUpdated: Timestamp.now()} );
                setIsPlaying(findedTimer.isPlaying) 
                setTime(newTimer)
                intervalRef.current = setInterval(countTime, 1000);
            } 
            setLoading(false)
        })
    },[])

    const formatTime = (seconds: number) => {
        const hours = Math.floor(seconds / 3600); 
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = Math.floor(seconds % 60); // Garantindo que seja inteiro
    
        const formattedHours = hours > 0 ? `${hours}` : "0";
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes.toString(); 
        const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds.toString();
    
        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    };
    

    const handleEditClick = () => setIsEditing(!isEditing)
    const countTime = () => setTime((prevTime) => prevTime + 1)
    
    const handlePlay = () => {
        if(!isPlaying) {
            intervalRef.current = setInterval(countTime, 1000);
            setDocument(`users/${userUid}/timers/${timer.id}`, {isPlaying: true, lastUpdated: Timestamp.now()})
            setIsPlaying(true)
            return
        }

        setIsPlaying(false);
        setDocument(`users/${userUid}/timers/${timer.id}`, 
        {
            time: time, 
            lastUpdated: Timestamp.now(), 
            isPlaying: false
        })
        clearInterval(intervalRef.current);
    }

    useEffect(() => {
        if(isEditing) inputRef.current?.focus()
    },[isEditing])

    return (
        <div className="rounded-md border border-primary bg-white w-full p-2 h-12 flex justify-between items-center">
            {loading? <p>Carregando...</p>:
                <>
                    { isEditing && 
                        (
                            <input 
                            ref={inputRef}
                            value={name || ""}
                            type="text"
                            onChange={handleOnChange}
                            className="border-none outline-none"
                            />
                        )
                    }

                    
                    {!isEditing && <p className="text-primary">{name}</p>}

                    <div className="flex gap-6 items-center ch-5">
                        <div className=" p-2 flex items-center justify-center rounded-md transition-opacity">   
                            <p>{formatTime(time)}</p>
                        </div>

                        <div className="bg-headerIconsBg p-2 flex items-center justify-center rounded-md cursor-pointer transition-opacity hover:opacity-60" onClick={handlePlay}>   
                            {isPlaying ? <Pause className="h-5"/> : <Play className="h-5"/> }
                        </div>

                        <div className="bg-headerIconsBg p-2 flex items-center justify-center rounded-md cursor-pointer transition-opacity hover:opacity-60"  onClick={handleEditClick}>   
                            {isEditing ? <CloseButton className="h-5"/> : <Pencil className="h-5" />}
                        </div>

                    </div>
                </>
            }

            
        </div>
    )
}