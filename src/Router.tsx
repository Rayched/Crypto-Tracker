import { BrowserRouter, Route, Routes } from "react-router-dom";
import Coins from "./routes/Coins";
import Coin from "./routes/Coin";

function Router(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Coins />}></Route>
                <Route path="/:coinID/*" element={<Coin />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default Router;