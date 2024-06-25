import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  Card,
  Spinner,
  Alert,
  Pagination,
  Navbar,
  Nav,
  Carousel,
} from "react-bootstrap";
import "./index.css";
import Footer from "./components/Footer";

// Componente principal da aplicação
function App() {
  const [palavraChave, setPalavraChave] = useState("");
  const [marca, setMarca] = useState("");
  const [tamanho, setTamanho] = useState("");
  const [precoMin, setPrecoMin] = useState("");
  const [precoMax, setPrecoMax] = useState("");
  const [tenis, setTenis] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [carrosselTenis, setCarrosselTenis] = useState([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

  // Função que será executada assim que o componente for montado
  useEffect(() => {
    const buscarTenisAleatorios = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/sneakers", {
          params: { palavraChave: "Nike", pagina: 1 },
        });
        const resultados = response.data.resultados;
        // Gera 5 fotos aleatórias entre 0 e o tamanho do array de resultados
        const aleatorios = [];
        while (aleatorios.length < 5 && resultados.length > 0) {
          const indexAleatorio = Math.floor(Math.random() * resultados.length);
          aleatorios.push(resultados.splice(indexAleatorio, 1)[0]);
        }
        setCarrosselTenis(aleatorios);
      } catch (err) {
        console.error("Falha ao buscar tênis para o carrossel:", err);
      }
    };

    buscarTenisAleatorios();
  }, []);

  // Função que busca os tênis de acordo com os filtros
  const buscarTenis = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:5000/api/sneakers", {
        params: { palavraChave, marca, tamanho, precoMin, precoMax, pagina },
      });
      setTenis(response.data.resultados);
      setTotalPaginas(Math.ceil(response.data.total / 10));
      setProdutoSelecionado(response.data.resultados[0] || null);
    } catch (err) {
      setError("Falha ao buscar tênis. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };
  // Função que muda a página de resultados
  const handlePaginaChange = (numeroPagina) => {
    setPagina(numeroPagina);
    buscarTenis({ preventDefault: () => {} });
  };
  // Renderiza o componente
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Sneaker Haven</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Carousel className="my-4 custom-carousel">
        {carrosselTenis.map((tenisItem, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block w-100"
              src={tenisItem.thumbnail}
              alt={`Slide ${index + 1}`}
            />
            <Carousel.Caption>
              <h3>{tenisItem.shoeName}</h3>
              <p>{tenisItem.colorway}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
      <Container>
        <h2 className="section-title">Filtros</h2>
        <Form onSubmit={buscarTenis} className="mb-4">
          <Form.Group controlId="palavraChave">
            <Form.Label>Palavra-chave</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite a palavra-chave do tênis..."
              value={palavraChave}
              onChange={(e) => setPalavraChave(e.target.value)}
            />
            {produtoSelecionado && (
              <Form.Text>{produtoSelecionado.name}</Form.Text>
            )}
          </Form.Group>
          <Form.Group controlId="marca" className="mt-2">
            <Form.Control
              type="text"
              placeholder="Marca"
              value={marca}
              onChange={(e) => setMarca(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="tamanho" className="mt-2">
            <Form.Control
              type="text"
              placeholder="Tamanho"
              value={tamanho}
              onChange={(e) => setTamanho(e.target.value)}
            />
          </Form.Group>
          <Row className="mt-2">
            <Col>
              <Form.Group controlId="precoMin">
                <Form.Control
                  type="number"
                  placeholder="Preço Mínimo"
                  value={precoMin}
                  onChange={(e) => setPrecoMin(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="precoMax">
                <Form.Control
                  type="number"
                  placeholder="Preço Máximo"
                  value={precoMax}
                  onChange={(e) => setPrecoMax(e.target.value)}
                />
                {produtoSelecionado && (
                  <Form.Text> {produtoSelecionado.price}</Form.Text>
                )}
              </Form.Group>
            </Col>
          </Row>
          <Button variant="primary" type="submit" className="mt-2">
            Buscar
          </Button>
        </Form>
        {loading && <Spinner animation="border" />}
        {error && <Alert variant="danger">{error}</Alert>}
        <Row>
          {tenis.map((tenisItem, index) => (
            <Col key={index} sm={12} md={6} lg={4} className="mb-4">
              <Card className="sneaker-card">
                <Card.Img variant="top" src={tenisItem.thumbnail} />
                <Card.Body>
                  <Card.Title>{tenisItem.shoeName}</Card.Title>
                  <Card.Text>{tenisItem.colorway}</Card.Text>
                  <Card.Text>
                    {tenisItem.retailPrice
                      ? `$${tenisItem.retailPrice}`
                      : "Preço não disponível"}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        {totalPaginas > 1 && (
          <Pagination className="pagination">
            {[...Array(totalPaginas).keys()].map((numero) => (
              <Pagination.Item
                key={numero + 1}
                active={numero + 1 === pagina}
                onClick={() => handlePaginaChange(numero + 1)}
              >
                {numero + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        )}
      </Container>
      <Footer />
    </>
  );
}

export default App;
