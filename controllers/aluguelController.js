import { sequelize } from '../databases/conecta.js';
import { Aluguel } from '../models/Aluguel.js';
import { Imovel } from '../models/Imovel.js';
import { Inquilino } from '../models/Inquilino.js';

export const aluguelIndex = async (req, res) => {
  try {
    const alugueis = await Aluguel.findAll({
        include: [
          { model: Inquilino },
          { model: Imovel }
        ]
      });
    res.status(200).json(alugueis)
  } catch (error) {
    res.status(400).send(error)
  }
}

export const aluguelCreate = async (req, res) => {
    const { data_final, imovel_id, inquilino_id } = req.body;
    console.log(data_final);
    console.log(inquilino_id);
    console.log(imovel_id);
    if (!data_final || !imovel_id || !inquilino_id) {
      res.status(400).json({ id: 0, msg: "Necessita informar os dados..." });
      return;
    }
  
    const t = await sequelize.transaction();
  
    try {
      const imovel = await Imovel.findByPk(imovel_id);
      if (imovel.status === 1) {
        res.status(400).json({ id: 0, msg: "Já possuiu inquilinos nesse imovel" });
        return;
      }
  
      const aluguel = await Aluguel.create(
        { data_final, imovel_id, inquilino_id },

        { transaction: t }
      );
  
      await Imovel.increment(
        'status',
        { by: 1, where: { id: imovel_id }, transaction: t }
      );
  
      await t.commit();
      res.status(201).json(aluguel);
  
    } catch (error) {
      await t.rollback();
      res.status(400).json({ id: 0, Erro: error });
    }
  };

  export const finalizarAluguel = async (req, res) => {
    const { aluguel_id } = req.params;

  const t = await sequelize.transaction();

  try {
    const aluguel = await Aluguel.findByPk(aluguel_id);

    if (!aluguel) {
      res.status(400).json({ id: 0, msg: "Não possui nenhum contrato..." });
      return;
    }

    if (aluguel.data_final) {
      res.status(400).json({ id: 0, msg: "OPS!! Esse contrato já está fechado" });
      return;
    }

    await Aluguel.update({ finalizado: true }, {
      where: { id: aluguel_id },
      transaction: t
    });

    const imovel_id = aluguel.imovel_id;

    await Imovel.update({ status: 0 }, {
      where: { id: imovel_id },
      transaction: t
    });

    await t.commit();
    res.status(200).json({ id: aluguel_id, msg: "Ok, este contrato esta finalizado" });
  } catch (error) {
    await t.rollback();
    res.status(400).json({ id: 0, Erro: error });
  }
}