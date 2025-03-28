import {Navbar} from "reactstrap";
import {useTema} from "../contexts/TemaContext";

export default function Footer() {
    const data = new Date();
    const {temaEscuro} = useTema();

    return (
        <footer>
            <Navbar className="mt-2 py-4" color={temaEscuro ? "dark" : "light"} dark={temaEscuro}>
                <div className="d-flex justify-content-center w-100">
                    <p className={temaEscuro ? "text-white m-0" : "text-dark m-0"}>
                        João Victor {data.getFullYear()} © Todos os direitos reservados
                    </p>
                </div>
            </Navbar>
        </footer>
    );
}
