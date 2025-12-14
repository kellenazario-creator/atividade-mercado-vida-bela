const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// DTO padrao
function resposta(ok, mensagem, dados = null){
    return { ok, mensagem, dados };
}

// Simulacao de banco em memoria
let usuarios = [];
let pedidos = [];

// CADASTRO USUARIO
app.post('/api/usuarios/cadastro', (req, res) => {
    try{
        const { nome, email, telefone } = req.body;

        if(!nome || !email || !telefone){
            return res.status(400).json(resposta(false,'Dados obrigatorios ausentes'));
        }

        usuarios.push({ nome, email, telefone });
        res.json(resposta(true,'Usuario cadastrado com sucesso'));
    }catch(e){
        res.status(500).json(resposta(false,'Erro ao cadastrar usuario'));
    }
});

// LOGIN
app.post('/api/usuarios/login', (req, res) => {
    try{
        const { email } = req.body;

        if(!email){
            return res.status(400).json(resposta(false,'Email obrigatorio'));
        }

        res.json(resposta(true,'Login realizado'));
    }catch(e){
        res.status(500).json(resposta(false,'Erro no login'));
    }
});

// CRIAR PEDIDO
app.post('/api/pedidos', (req, res) => {
    try{
        const { itens, pagamento, entrega } = req.body;

        if(!itens || itens.length === 0){
            return res.status(400).json(resposta(false,'Carrinho vazio'));
        }

        if(!pagamento){
            return res.status(400).json(resposta(false,'Forma de pagamento obrigatoria'));
        }

        const pedido = {
            id: pedidos.length + 1,
            itens,
            pagamento,
            entrega,
            status: 'Finalizado'
        };

        pedidos.push(pedido);
        res.json(resposta(true,'Pedido finalizado com sucesso', pedido));
    }catch(e){
        res.status(500).json(resposta(false,'Erro ao criar pedido'));
    }
});

// LISTAR PEDIDOS
app.get('/api/pedidos', (req, res) => {
    res.json(resposta(true,'Lista de pedidos', pedidos));
});

// ERRO GLOBAL
app.use((err, req, res, next) => {
    res.status(500).json(resposta(false,'Erro interno do servidor'));
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
