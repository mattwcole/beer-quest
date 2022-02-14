import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { forceCheck } from "react-lazyload";
import PubCard, { Pub } from "./PubCard";

export interface PubListProps {
  pubs: Pub[];
}

const PubList: React.FC<PubListProps> = ({ pubs }) => {
  const [nameFilter, setNameFilter] = useState("");

  const filteredPubs = pubs.filter(
    (pub) => pub.name.toLowerCase().indexOf(nameFilter.toLowerCase()) !== -1
  );

  // Lazy loaded images may move into view upon filtering
  useEffect(forceCheck);

  return (
    <Container>
      <Row className="justify-content-center mb-3">
        <Col xs="8" md="6">
          <Form>
            <Form.Control
              role="search"
              type="text"
              placeholder="Filter"
              onChange={(e) => setNameFilter(e.target.value)}
            />
          </Form>
        </Col>
      </Row>
      <Row xs="1" md="2" lg="3" xl="4">
        {filteredPubs.map((pub) => (
          <Col key={pub.id}>
            <PubCard pub={pub} className="text-body m-3" />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default PubList;
