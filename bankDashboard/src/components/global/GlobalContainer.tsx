import { Header } from "./Header";
import { Sidemenu } from "./Sidemenu/Sidemenu";


export function GlobalContainer() {
    return (
        <div className="flex">
            <Sidemenu/>
            <Header/>
        </div>
    )
}