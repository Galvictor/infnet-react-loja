import { Navbar } from "reactstrap";

export default function Footer() {
  const data = new Date();

  return (
    <footer>
      <Navbar className="mt-2 py-4" color="dark" dark>
        <div className="d-flex justify-content-center w-100">
          <p className="text-white m-0">
            João Victor {data.getFullYear()} © Todos os direitos reservados
          </p>
        </div>
      </Navbar>
    </footer>
  );
}
