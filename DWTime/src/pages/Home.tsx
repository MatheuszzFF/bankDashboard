import { useContext, useEffect, useState } from "react"
import { Timerlist } from "../components/"
import { TTimerITem } from "../components/Timecounter/types"
import FirestoreContext from "../contexts/Firebase/Firestore"
import AuthContext from "../contexts/Firebase/Auth";


export const Homepage = () => {
    
    const [timers, setTimers] = useState<TTimerITem[]>([])
    const firestoreContext = useContext(FirestoreContext)
    const {getDocument} = firestoreContext;
    const auth = useContext(AuthContext);
    const authState = auth.authState;

    useEffect(() => {
        getDocument(`users/${authState.uid}/timers`, "sanjkds")
        .then(res => setTimers(res))
    },[])
    
    return (
        <>
            <Timerlist timersArray={timers} setTimers={setTimers} userUid={authState.uid} />
        </>
    )
}