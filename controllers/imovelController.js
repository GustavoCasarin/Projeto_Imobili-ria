import { Imovel } from '../models/Imovel.js';
import { Proprietario } from '../models/Proprietario.js';

export const imovelIndex = async (req, res) => {
  try {
    const imoveis = await Imovel.findAll({
    include: Proprietario
    });
    res.status(200).json(imoveis)
  } catch (error) {
    res.status(400).send(error)
  }
}

export const imovelCreate = async (req, res) => {
  const { endereco, proprietario_id } = req.body

  if (!endereco|| !proprietario_id) {
    res.status(400).json({ id: 0, msg: "OPS! Precisa informar os dados" })
    return
  }

  try {
    const imovel = await Imovel.create({
      endereco, proprietario_id
    });
    res.status(201).json(imovel)
  } catch (error) {
    res.status(400).send(error)
  }
}