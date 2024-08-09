import { BrowserRouter, Route, Routes } from "react-router-dom";
import Coins from "./routes/Coins";
import Coin from "./routes/Coin";

export interface theme {
    isTheme: boolean|undefined;
    onToggle: Function;   
}

function Router({isTheme, onToggle}: theme){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Coins isTheme={isTheme} onToggle={onToggle}/>}></Route>
                <Route path="/:coinID/*" element={<Coin isTheme={isTheme} onToggle={onToggle}/>}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default Router;