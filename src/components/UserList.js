import React, {useEffect, useState} from "react";
import {fetchUsers} from "../services/apiService";
import {Container, Table, Spinner, Alert, Button} from "reactstrap";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    const limit = 5; // Número de usuários por página

    useEffect(() => {
        const loadUsers = async () => {
            setLoading(true);
            try {
                const data = await fetchUsers(limit, currentPage * limit);
                setUsers(data.users);
                setTotalUsers(data.total);
            } catch (err) {
                setError("Erro ao carregar usuários.");
            } finally {
                setLoading(false);
            }
        };

        loadUsers();
    }, [currentPage]); // Atualiza sempre que a página muda

    if (loading) return <Spinner color="primary"/>;
    if (error) return <Alert color="danger">{error}</Alert>;

    return (
        <Container className="mt-4">
            <h2 className="text-center mb-3">Lista de Usuários</h2>

            <Table striped bordered hover responsive>
                <thead className="bg-primary text-white">
                <tr>
                    <th>ID</th>
                    <th>Foto</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Telefone</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>
                            <img src={user.image} alt={user.firstName} width="40" height="40"
                                 className="rounded-circle"/>
                        </td>
                        <td>{user.firstName} {user.lastName}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                    </tr>
                ))}
                </tbody>
            </Table>

            {/* Controles de Paginação */}
            <div className="d-flex justify-content-between mt-4">
                <Button
                    color="primary"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
                    disabled={currentPage === 0}
                >
                    Anterior
                </Button>

                <Button
                    color="primary"
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    disabled={(currentPage + 1) * limit >= totalUsers}
                >
                    Próximo
                </Button>
            </div>
        </Container>
    );
};

export default UserList;