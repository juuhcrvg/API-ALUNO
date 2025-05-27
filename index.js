//passo1
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

//passo2
const db = new sqlite3.Database('./banco_de_dados.db', (err) => {
if (err) {
console.error(err.message);
}
console.log('Conectado ao banco de dados SQLite.');
});
//passo3
db.run(`CREATE TABLE IF NOT EXISTS Alunos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL
    )`, (err) => {
    if (err) {
    console.error(err.message);
    }
    console.log('Tabela Alunos criada.');
    });
//passo4
app.get('/', (req, res) => {
    res.send('API funcionando!');
    });
    //passo5
    app.get('/alunos', (req, res) => {
        const sql = 'SELECT * FROM Alunos';
        db.all(sql, [], (err, rows) => {
        if (err) {
        res.status(500).json({ error: err.message });
        return;
        }
        res.json(rows);
        });
        });
//passo6
        app.post('/alunos', (req, res) => {
            const { nome } = req.body;
            const sql = 'INSERT INTO Alunos (nome) VALUES (?)';
            db.run(sql, [nome], (err) => {
            if (err) {
            res.status(500).json({ error: err.message });
            return;
            }
            res.json({ message: 'Aluno criado com sucesso!' });
            });
            });
            //passo7
            app.listen(port, () => {
                console.log(`Servidor rodando em h
                
                p://localhost:${port}`);
                
                });



