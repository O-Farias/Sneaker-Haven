import React, { useState } from "react";
import "../index.css";

const GaleriaDeFotos = () => {
  // Exemplo de estado com detalhes do produto, incluindo um array de fotos
  const [produto, setProduto] = useState({
    nome: "Tênis Exemplo",
    descricao: "Descrição detalhada do tênis aqui.",
    fotos: [
      "urlDaFoto1.jpg",
      "urlDaFoto2.jpg",
      // Adicione mais URLs de fotos conforme necessário
    ],
    detalhes: [
      "Detalhe 1",
      "Detalhe 2",
      // Adicione mais detalhes conforme necessário
    ],
  });

  return (
    <div>
      <h2>{produto.nome}</h2>
      <p>{produto.descricao}</p>
      <div className="galeria">
        {produto.fotos.map((foto, index) => (
          <img key={index} src={foto} alt={`Foto ${index + 1}`} />
        ))}
      </div>
      <ul>
        {produto.detalhes.map((detalhe, index) => (
          <li key={index}>{detalhe}</li>
        ))}
      </ul>
    </div>
  );
};

export default GaleriaDeFotos;
