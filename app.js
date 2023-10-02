import express from 'express'
import cors from "cors"
import routes from './routes.js'
import { sequelize } from './databases/conecta.js'
import { Aluguel } from './models/Aluguel.js'
import { Inquilino } from './models/Inquilino.js'
import { Proprietario } from './models/Proprietario.js'
import { Imovel } from './models/Imovel.js'

const app = express()
const port = 3000

app.use(express.json())
app.use(cors())
app.use(routes)

async function conecta_db() {
  try {
    await sequelize.authenticate();
    console.log('Conexão com banco de dados realizada com sucesso');

    await Proprietario.sync()
    await Inquilino.sync()
    await Imovel.sync()
    await Aluguel.sync()

  } catch (error) {
    console.error('Erro na conexão com o banco: ', error);
  }
}
conecta_db()

app.get('/', (req, res) => {
  res.send('API para Controlar Imobiliaria')
})

app.listen(port, () => {
  console.log(`Servidor Rodando na Porta: ${port}`)
})