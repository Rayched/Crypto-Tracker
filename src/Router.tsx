import { BrowserRouter, Route, Routes } from "react-router-dom";
import Coins from "./routes/Coins";
import Coin from "./routes/Coin";

function Router(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Coins />}/>
                <Route path="/:coinID/*" element={<Coin />}/>
            </Routes>
        </BrowserRouter>
    );
}

export default Router;