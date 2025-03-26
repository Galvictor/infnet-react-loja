import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import TodoPage from "./pages/TodoPage";
import UsersListPage from "./pages/UsersListPage";
import {AuthProvider} from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import LojaPage from "./pages/LojaPage";
import CarrinhoPage from "./pages/CarrinhoPage";
import {CartProvider} from "./contexts/CartContext"; // Importe o CartProvider

export default function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <Router>
                    <Header/>
                    <div className="container">
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/todo" element={<TodoPage/>}/>
                            <Route path="/login" element={<LoginPage/>}/>
                            <Route
                                path="/users-list"
                                element={
                                    <ProtectedRoute>
                                        <UsersListPage/>
                                    </ProtectedRoute>
                                }
                            />
                            <Route path="/loja" element={<ProtectedRoute><LojaPage/></ProtectedRoute>}/>
                            <Route path="/cart" element={<ProtectedRoute><CarrinhoPage/></ProtectedRoute>}/>
                        </Routes>
                    </div>
                    <Footer/>
                </Router>
            </CartProvider>
        </AuthProvider>
    );
}