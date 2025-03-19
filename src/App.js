import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Exemplos from "./Exemplos";
import Home from "./Home";
import TodoPage from "./TodoPage";
import Data from "./Data";

export default function App() {
    return (
        <Router>
            <Header/>
            <div className="container">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/exemplos" element={<Exemplos/>}/>
                    <Route path="/todo" element={<TodoPage/>}/>
                    <Route path="/Data" element={<Data/>}/>
                </Routes>
            </div>
            <Footer/>
        </Router>
    );
}