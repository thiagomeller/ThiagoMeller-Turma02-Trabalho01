const Banco = require('../src/banco');

describe('Testes da classe Banco', () => {
let bancoA;
let bancoB;

beforeEach(() => {
    bancoA = new Banco("Banco A", 1000)
    bancoB = new Banco("Banco B", 2000)
})

test("Depositar no banco", async () => {
    expect(bancoA.depositar(500)).toStrictEqual(1500);
});

test("Sacar no banco", async () => {
    expect(bancoA.sacar(800)).toStrictEqual(200);
});

test("Transferencia no banco", async () => {
    bancoA.transferir(600, bancoB)
    expect(bancoA.obterSaldo()).toBe(400)
    expect(bancoB.obterSaldo()).toBe(2600)
    expect(bancoA.transacoes).toContainEqual({ tipo: 'Transferência', valor: 600, destino: 'Banco B' });
});

test("Obter saldo no banco", async () => {
    expect(bancoA.obterSaldo()).toStrictEqual(1000);
});

test('Obter histórico de transações', () => {
    bancoA.depositar(500);
    bancoA.sacar(200);
    expect(bancoA.obterHistorico()).toContainEqual({ tipo: 'Depósito', valor: 500 });
    expect(bancoA.obterHistorico()).toContainEqual({ tipo: 'Saque', valor: 200 });
});

test("Definir saldo limite", async () => {
    bancoA.definirLimiteDeSaque(500);
    expect(bancoA.verificarLimiteDeSaque(400)).toBe(true);
    expect(() => bancoA.verificarLimiteDeSaque(600)).toThrow('Saque acima do limite permitido');
});

test("Aplicação de juros", async () => {
    bancoA.aplicarJuros(5)
    expect(bancoA.saldo).toBeCloseTo(1050);
    expect(bancoA.transacoes).toContainEqual({ tipo: 'Juros', valor: 50 });
})

test("Pagar uma conta", async () => {
    bancoA.pagarConta(500, 'Descricao')
    expect(bancoA.saldo).toBe(500);
    expect(bancoA.transacoes).toContainEqual({ tipo: 'Pagamento', valor: 500, descricao: 'Descricao' })
})

test("Total depositado", async () => {
    bancoA.depositar(400);
    bancoA.depositar(600);
    expect(bancoA.obterTotalDepositado()).toBe(1000)
})

})
