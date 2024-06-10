/* eslint-disable linebreak-style */
import {
  describe, expect, it, jest,
} from '@jest/globals';
import Editora from '../../models/editora.js';

describe('Testando o modelo Editora', () => {
  const objEditora = {
    nome: 'CDC',
    cidade: 'São Paulo',
    email: 'CasaDoCodigo@email.com',
  };
  it('Deve instanciar uma nova editora', () => {
    const editora = new Editora(objEditora);
    expect(editora).toEqual(expect.objectContaining(objEditora));
  });
  it.skip('Deve salvar editora no DB', () => {
    const editora = new Editora(objEditora);
    editora.salvar().then((dados) => {
      expect(dados.nome).toBe('CDC');
    });
  });
  it.skip('Deve salvar no DB usando a sintaxe moderna', async () => {
    const editora = new Editora(objEditora);
    const dados = await editora.salvar();
    const retornado = await Editora.pegarPeloId(dados.id);

    expect(retornado).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        ...objEditora,
        created_at: expect.any(String),
        updated_at: expect.any(String),
      }),
    );
  });
  it('Deve fazer uma chamada simulada ao DB', () => {
    const editora = new Editora(objEditora);

    editora.salvar = jest.fn().mockReturnValue({
      id: 200,
      nome: 'CDC',
      cidade: 'São Paulo',
      email: 'CasaDoCodigo@email.com',
      created_at: '2022-10-01',
      updated_at: '2022-10-01',
    });

    const retorno = editora.salvar();
    expect(retorno).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        ...objEditora,
        created_at: expect.any(String),
        updated_at: expect.any(String),
      }),
    );
  });
});
