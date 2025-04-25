const express = require('express');
const cors = require('cors');
const senhaRoutes = require('./routes/senhaRoutes');
const relatorioRoutes = require('./relatorioRoutes');


const app = express();
app.use(cors());
app.use(express.json());

app.use('/senhas', senhaRoutes);
app.use('/relatorios', relatorioRoutes);


const PORT = 3000;
app.listen(PORT, () => console.log(`Backend rodando na porta ${PORT}`));
