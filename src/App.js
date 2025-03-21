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
import {AuthProvider} from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";

export default function App() {
    return (
        <AuthProvider>
            <Router>
                <Header/>
                <div className="container">
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/exemplos" element={<Exemplos/>}/>
                        <Route path="/todo" element={<TodoPage/>}/>
                        <Route path="/data" element={<Data/>}/>
                        <Route path="/login" element={<LoginPage/>}/>
                        <Route
                            path="/users-list"
                            element={
                                <ProtectedRoute>
                                    <UsersListPage/>
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </div>
                <Footer/>
            </Router>
        </AuthProvider>
    );
}
