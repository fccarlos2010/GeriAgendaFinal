const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Rota principal da API
app.get("/", (req, res) => {
    res.json({
        sistema: "GeriAgenda",
        mensagem: "API do GeriAgenda funcionando!",
        versao: "1.0.0"
    });
});

// Pacientes
app.get("/api/pacientes", (req, res) => {
    res.json([
        {
            id: 1,
            nome: "Maria Silva",
            cpf: "000.000.000-00",
            telefone: "(86) 99999-0000"
        },
        {
            id: 2,
            nome: "João Santos",
            cpf: "111.111.111-11",
            telefone: "(86) 98888-1111"
        },
        {
            id: 3,
            nome: "Ana Oliveira",
            cpf: "222.222.222-22",
            telefone: "(86) 97777-2222"
        }
    ]);
});

// Datas disponíveis
app.get("/api/datas", (req, res) => {
    res.json([
        {
            id: 1,
            data: "15/09/2026",
            vagas: 20
        },
        {
            id: 2,
            data: "29/09/2026",
            vagas: 20
        },
        {
            id: 3,
            data: "13/10/2026",
            vagas: 20
        }
    ]);
});

// Agendamentos
app.get("/api/agendamentos", (req, res) => {
    res.json([
        {
            id: 1,
            paciente: "Maria Silva",
            data: "15/09/2026",
            horario: "07:30",
            status: "confirmado",
            protocolo: "GERI-123086"
        }
    ]);
});

// Criar agendamento
app.post("/api/agendamentos", (req, res) => {
    const { paciente, data, horario } = req.body;

    if (!paciente || !data || !horario) {
        return res.status(400).json({
            erro: "Paciente, data e horário são obrigatórios."
        });
    }

    res.status(201).json({
        mensagem: "Agendamento realizado com sucesso!",
        agendamento: {
            paciente,
            data,
            horario,
            status: "confirmado",
            protocolo: `GERI-${Date.now()}`
        }
    });
});

// Relatórios
app.get("/api/relatorios", (req, res) => {
    res.json({
        totalConsultas: 31,
        confirmadas: 27,
        canceladas: 4,
        vagasDisponiveis: 19
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`API GeriAgenda funcionando na porta ${PORT}`);
});