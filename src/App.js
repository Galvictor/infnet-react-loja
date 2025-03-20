import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Exemplos from "./pages/Exemplos";
import Home from "./pages/Home";
import TodoPage from "./pages/TodoPage";
import Data from "./pages/Data";
import UsersListPage from "./pages/UsersListPage";

export default function App() {
    return (
        <Router>
            <Header/>
            <div className="container">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/exemplos" element={<Exemplos/>}/>
                    <Route path="/todo" element={<TodoPage/>}/>
                    <Route path="/data" element={<Data/>}/>
                    <Route path="/users-list" element={<UsersListPage/>}/>
                </Routes>
            </div>
            <Footer/>
        </Router>
    );
}