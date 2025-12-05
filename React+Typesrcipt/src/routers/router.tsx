import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { Modulo1Page } from "../pages/Modulo1Page";
import { Modulo2Page } from "../pages/Modulo2Page";
export function MyRoutes() {
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/modulo1" element={<Modulo1Page/>}/>
            <Route path="/modulo2" element={<Modulo2Page/>}/>
        </Routes>
        </BrowserRouter>
    )
}