import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import Stack from "react-bootstrap/Stack";
import PubList from "./PubList";
import { Pub } from "./PubCard";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_HOST,
});

const App = () => {
  const [pubs, setPubs] = useState<{
    data?: Pub[];
    error?: string;
    loading: boolean;
  }>();

  const getPubs = async () => {
    try {
      setPubs({ loading: true });
      const { data } = await api.get<Pub[]>("/pubs");
      setPubs({ data, loading: false });
    } catch {
      setPubs({
        error: "Failed to fetch pubs",
        loading: false,
      });
    }
  };

  useEffect(() => {
    if (!pubs) getPubs();
  });

  return (
    <Container
      fluid={true}
      className="min-vh-100 d-flex flex-column bg-dark text-center text-white"
    >
      <header className="mt-5">
        <h1>Beer Quest</h1>
        <p className="lead">A list of pubs in Leeds...</p>
        <p className="fst-italic">Please drink responsibly</p>
      </header>
      <main>
        {pubs && (
          <Stack gap={4} className="align-items-center">
            <Button onClick={getPubs} disabled={pubs.loading}>
              Refresh list
            </Button>
            {pubs.loading && <Spinner animation="border" />}
            {pubs.data && <PubList pubs={pubs.data} />}
            {pubs.error && <Alert variant="danger">{pubs.error}</Alert>}
          </Stack>
        )}
      </main>
      <footer className="text-white-50 mt-auto pt-5">
        <p>
          By{" "}
          <a href="https://github.com/mattwcole" className="text-white">
            mattwcole
          </a>
        </p>
      </footer>
    </Container>
  );
};

export default App;
