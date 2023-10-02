import { Router } from "express"
import { imovelCreate, imovelIndex } from "./controllers/imovelController.js"
import { aluguelCreate, aluguelIndex, finalizarAluguel } from "./controllers/aluguelController.js"

const router = Router()

router.get('/imoveis', imovelIndex)
      .post('/imoveis', imovelCreate)

router.get('/alugueis', aluguelIndex)
      .post('/alugueis', aluguelCreate)
      .put('/alugueis/:aluguel_id', finalizarAluguel);

export default router