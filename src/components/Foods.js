import React from "react";
import { Container, Row, Col, Card, CardBody, CardTitle, CardText, CardImg, Spinner, Alert } from "reactstrap";
import useFetch from "../hook/useFetch";

const Foods = () => {
    const [data, loading, error] = useFetch("https://api.npoint.io/60f0e85d4d2c10680b05");

    return (
        <Container className="mt-5">
            <h2 className="text-center mb-4">My Foods</h2>
            {loading && <div className="text-center"><Spinner color="primary" /></div>}
            {error && <Alert color="danger">Error fetching data</Alert>}
            <Row>
                {data && data.map((food, index) => (
                    <Col md={4} key={index} className="mb-4">
                        <Card className="shadow-sm h-100 d-flex flex-column">
                            <CardImg top src={food.image} alt={food.name} style={{ height: "200px", objectFit: "cover" }} />
                            <CardBody className="d-flex flex-column">
                                <CardTitle tag="h5" className="text-primary">{food.name}</CardTitle>
                                <CardText><strong>Benefits:</strong> {food.benefits}</CardText>
                                <CardText><strong>Importance:</strong> {food.importance}</CardText>
                                <CardText><strong>Best Time to Intake:</strong> {food.best_time_to_intake}</CardText>
                                <div className="mt-auto"></div>
                            </CardBody>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Foods;
