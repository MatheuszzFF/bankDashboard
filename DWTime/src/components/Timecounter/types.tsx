import { Timestamp } from "firebase/firestore";

export type TTimerITem = {
    name: string | null,
    time: number,
    id: string,
    isCompleted: boolean,
    createdAt: Timestamp,
}