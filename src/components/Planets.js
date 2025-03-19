import React from "react";
import { Container, Row, Col, Card, CardBody, CardTitle, CardText, Spinner, Alert } from "reactstrap";
import useFetch from "../hook/useFetch";

const Planets = () => {
    const [data, loading, error] = useFetch("https://api.npoint.io/52c9ad7afe45dc91c53d");

    return (
        <Container className="mt-5">
            <h2 className="text-center mb-4">My Planets</h2>
            {loading && <div className="text-center"><Spinner color="primary" /></div>}
            {error && <Alert color="danger">Error fetching data</Alert>}
            <Row>
                {data && data.map((planet, index) => (
                    <Col md={4} key={index} className="mb-4">
                        <Card className="shadow-sm">
                            <CardBody>
                                <CardTitle tag="h5" className="text-primary">{planet.nome}</CardTitle>
                                <CardText><strong>Tipo:</strong> {planet.tipo}</CardText>
                                <CardText><strong>Diâmetro:</strong> {planet.diâmetro}</CardText>
                                <CardText><strong>Gravidade:</strong> {planet.gravidade}</CardText>
                                <CardText><strong>Temperatura Média:</strong> {planet.temperatura_media}</CardText>
                            </CardBody>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Planets;
