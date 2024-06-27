import React, { useState } from "react";
import "../styles/comments.css";

// Componente para exibir uma única avaliação
const Avaliacao = ({ avaliacao }) => (
  <div>
    <p>Classificação: {avaliacao.classificacao} Estrelas</p>
    <p>Comentário: {avaliacao.comentario}</p>
  </div>
);

// Componente para coletar uma nova avaliação
const FormularioAvaliacao = ({ adicionarAvaliacao }) => {
  const [classificacao, setClassificacao] = useState(5);
  const [comentario, setComentario] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    adicionarAvaliacao({ classificacao, comentario });
    setClassificacao(5); // Reseta o estado
    setComentario(""); // Reseta o estado
  };

  return (
    <div className="formulario-avaliacao">
      <form onSubmit={handleSubmit}>
        <label>
          Classificação:
          <input
            type="number"
            value={classificacao}
            onChange={(e) => setClassificacao(e.target.value)}
            min="1"
            max="5"
          />
        </label>
        <label>
          Comentário:
          <textarea
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
          />
        </label>
        <button type="submit">Enviar Avaliação</button>
      </form>
    </div>
  );
};

// Componente principal que engloba tudo
const AvaliacoesEComentarios = () => {
  const [avaliacoes, setAvaliacoes] = useState([]);

  const adicionarAvaliacao = (avaliacao) => {
    setAvaliacoes([...avaliacoes, avaliacao]);
  };

  return (
    <div className="avaliacoes-e-comentarios-container">
      <h2>Avaliações e Comentários</h2>
      <FormularioAvaliacao
        adicionarAvaliacao={adicionarAvaliacao}
        className="formulario-avaliacao"
      />
      {avaliacoes.map((avaliacao, index) => (
        <Avaliacao key={index} avaliacao={avaliacao} className="avaliacao" />
      ))}
    </div>
  );
};

export default AvaliacoesEComentarios;
