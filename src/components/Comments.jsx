import React, { useState } from "react";
import "../styles/comments.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Componente para exibir uma única avaliação
const Avaliacao = ({ avaliacao, removerAvaliacao }) => (
  <div className="card my-3">
    <div className="card-body">
      <p>Classificação: {avaliacao.classificacao} Estrelas</p>
      <p>Comentário: {avaliacao.comentario}</p>
      <button
        className="btn btn-danger"
        onClick={() => removerAvaliacao(avaliacao.id)}
      >
        Remover
      </button>
    </div>
  </div>
);

// Componente para coletar uma nova avaliação
const FormularioAvaliacao = ({ adicionarAvaliacao }) => {
  const [classificacao, setClassificacao] = useState(5);
  const [comentario, setComentario] = useState("");
  const [error, setError] = useState("");

  // Função para lidar com o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    if (classificacao < 1 || classificacao > 5) {
      setError("A classificação deve estar entre 1 e 5.");
      return;
    }
    if (comentario.trim() === "") {
      setError("O comentário não pode estar vazio.");
      return;
    }
    adicionarAvaliacao({ classificacao, comentario, id: Date.now() });
    setClassificacao(5); // Reseta o estado
    setComentario(""); // Reseta o estado
    setError(""); // Reseta o estado
  };

  return (
    <div className="formulario-avaliacao card p-4 my-4">
      <form onSubmit={handleSubmit}>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="form-group">
          <label>Classificação:</label>
          <input
            type="number"
            className="form-control"
            value={classificacao}
            onChange={(e) => setClassificacao(e.target.value)}
            min="1"
            max="5"
          />
        </div>
        <div className="form-group">
          <label>Comentário:</label>
          <textarea
            className="form-control"
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Enviar Avaliação
        </button>
      </form>
    </div>
  );
};

// Componente principal que engloba tudo
const AvaliacoesEComentarios = () => {
  const [avaliacoes, setAvaliacoes] = useState([]);

  // Função para adicionar uma nova avaliação
  const adicionarAvaliacao = (avaliacao) => {
    setAvaliacoes([...avaliacoes, avaliacao]);
  };

  // Função para remover uma avaliação existente
  const removerAvaliacao = (id) => {
    setAvaliacoes(avaliacoes.filter((avaliacao) => avaliacao.id !== id));
  };

  return (
    <div className="avaliacoes-e-comentarios-container container mt-5">
      <h2 className="text-center mb-4">Avaliações e Comentários</h2>
      <FormularioAvaliacao adicionarAvaliacao={adicionarAvaliacao} />
      {avaliacoes.map((avaliacao) => (
        <Avaliacao
          key={avaliacao.id}
          avaliacao={avaliacao}
          removerAvaliacao={removerAvaliacao}
        />
      ))}
    </div>
  );
};

export default AvaliacoesEComentarios;
