const express = require("express");
const app = express();
app.use(express.json());

const baseConsulta = {};

const funcoes = {
    ClienteCriado: (cliente) => {
        baseConsulta[cliente.contador] = cliente;
    },
    IngressoCriado: (ingresso) => {
        const ingressos =
            baseConsulta[ingresso.clienteId]["ingressos"] || [];
            ingressos.push(ingresso);
            baseConsulta[ingresso.clienteId]["ingressos"] = ingressos;
    }
};

app.get("/clientes", (req, res) => {
    res.status(200).send(baseConsulta);
});

app.post("/eventos", (req, res) => {
    funcoes[req.body.tipo](req.body.dados);
    res.status(200).send(baseConsulta);
});

app.listen(6000, () => console.log("Consultas. Porta 6000"));