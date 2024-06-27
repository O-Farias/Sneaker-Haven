import React, { useState, useEffect } from "react";
import "../styles/features.css";
import axios from "axios";
import { Container, Row, Col, Card, Spinner, Alert } from "react-bootstrap";
import Footer from "../components/Footer";
import Comments from "../components/Comments";

const GaleriaDeFotos = () => {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDados = async () => {
      try {
        const resposta = await axios.get("http://localhost:5000/api/sneakers");
        const dados = resposta.data.resultados;

        // Ordenar produtos por data de lançamento mais recente
        const produtosOrdenados = dados.sort(
          (a, b) => new Date(b.releaseDate) - new Date(a.releaseDate)
        );

        // Limitar a quantidade de produtos exibidos na galeria
        setProdutos(produtosOrdenados);
        setLoading(false);
      } catch (erro) {
        setError("Erro ao buscar dados da API");
        setLoading(false);
        console.error("Erro ao buscar dados da API:", erro);
      }
    };

    fetchDados();
  }, []); // O array vazio indica que o useEffect será executado apenas uma vez após o componente ser montado.

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  // Renderizar a galeria de fotos
  return (
    <>
      <Container>
        <h2 className="titulo-produtos">Modelos Lançados Recentemente</h2>
        <Row className="galeria">
          {produtos.map((produto, index) => (
            <Col key={index} sm={12} md={6} lg={4} className="mb-4">
              <Card className="h-100">
                <Card.Img
                  variant="top"
                  src={produto.thumbnail}
                  alt={produto.shoeName}
                  className="card-img-top"
                />
                <Card.Body>
                  <Card.Title>{produto.shoeName}</Card.Title>
                  <Card.Text>
                    {produto.description || "Sem descrição disponível"}
                  </Card.Text>
                  <ul className="list-unstyled">
                    <li>
                      <strong>Marca:</strong> {produto.make}
                    </li>
                    <li>
                      <strong>Cor:</strong> {produto.colorway}
                    </li>
                    <li>
                      <strong>Preço:</strong>{" "}
                      {produto.retailPrice
                        ? `$${produto.retailPrice}`
                        : "Preço não disponível"}
                    </li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <Comments />
      <Footer />
    </>
  );
};

// No final do seu arquivo Features.jsx

export default GaleriaDeFotos;
