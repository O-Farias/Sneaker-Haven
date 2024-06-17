const express = require("express");
const SneaksAPI = require("sneaks-api");
const sneaks = new SneaksAPI();
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());

app.get("/api/sneakers", (req, res) => {
  const {
    palavraChave,
    marca,
    tamanho,
    precoMin,
    precoMax,
    pagina = 1,
    limite = 10,
  } = req.query;
  console.log("Recebido:", {
    palavraChave,
    marca,
    tamanho,
    precoMin,
    precoMax,
    pagina,
    limite,
  });

  sneaks.getProducts(palavraChave, 50, (err, products) => {
    if (err) {
      res.status(500).send(err);
    } else {
      let filtrados = products;
      if (marca) {
        filtrados = filtrados.filter(
          (p) => p.brand && p.brand.toLowerCase() === marca.toLowerCase()
        );
      }
      if (tamanho) {
        filtrados = filtrados.filter(
          (p) => p.sizes && p.sizes.includes(tamanho)
        );
      }
      if (precoMin) {
        filtrados = filtrados.filter(
          (p) => p.retailPrice && p.retailPrice >= parseFloat(precoMin)
        );
      }
      if (precoMax) {
        filtrados = filtrados.filter(
          (p) => p.retailPrice && p.retailPrice <= parseFloat(precoMax)
        );
      }

      const inicio = (pagina - 1) * limite;
      const fim = inicio + limite;
      const paginados = filtrados.slice(inicio, fim);

      res.json({
        total: filtrados.length,
        pagina,
        limite,
        resultados: paginados,
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
