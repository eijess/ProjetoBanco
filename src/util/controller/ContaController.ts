import { colors } from "../Colors";
import { Conta } from "../model/Conta";
import { ContaRepository } from "../repository/ContaRepository";

export class ContaController implements ContaRepository {
    private listaContas: Array<Conta> = new Array<Conta>();
    numero: number = 0;

    cadastrar(conta: Conta): void {
        this.listaContas.push(conta);
        console.log(colors.fg.green, `\nA conta número ${conta.numero} foi criada com sucesso!`, colors.reset);
    }

    listarTodas(): void {
        for (let conta of this.listaContas) {
            conta.visualizar();
        }
    }

    procurarPorNumero(numero: number): void {
        let buscaConta = this.buscarNoArray(numero);

        if (buscaConta != null) {
            buscaConta.visualizar();
        } else {
            console.log(colors.fg.red, `\nA conta número ${numero} não foi encontrada!`, colors.reset);
        }
    }

    atualizar(conta: Conta): void {
        let buscaConta = this.buscarNoArray(conta.numero);

        if (buscaConta != null) {
            this.listaContas[this.listaContas.indexOf(buscaConta)] = conta;
            console.log(colors.fg.green, `\nA conta número ${conta.numero} foi atualizada com sucesso!`, colors.reset);
        } else {
            console.log(colors.fg.red, `\nA conta número ${conta.numero} não foi encontrada!`, colors.reset);
        }
    }

    deletar(numero: number): void {
        let buscaConta = this.buscarNoArray(numero);

        if (buscaConta != null) {
            this.listaContas.splice(this.listaContas.indexOf(buscaConta), 1);
            console.log(colors.fg.green, `\nA conta número ${numero} foi deletada com sucesso!`, colors.reset);
        } else {
            console.log(colors.fg.red, `\nA conta número ${numero} não foi encontrada!`, colors.reset);
        }
    }

    sacar(numero: number, valor: number): void {
        let conta = this.buscarNoArray(numero);

        if (conta != null) {
            if (conta.saldo >= valor) {
                conta.saldo -= valor;
                console.log(colors.fg.green, `\nO saque na conta número ${numero} foi efetuado com sucesso!`, colors.reset);
            } else {
                console.log(colors.fg.red, `\nSaldo insuficiente na conta número ${numero}!`, colors.reset);
            }
        } else {
            console.log(colors.fg.red, `\nA conta número ${numero} não foi encontrada!`, colors.reset);
        }
    }

    depositar(numero: number, valor: number): void {
        let conta = this.buscarNoArray(numero);

        if (conta != null) {
            conta.depositar(valor);
            console.log(colors.fg.green, `\nO depósito na conta número ${numero} foi efetuado com sucesso!`, colors.reset);
        } else {
            console.log(colors.fg.red, `\nA conta número ${numero} não foi encontrada!`, colors.reset);
        }
    }

    public transferir(numeroOrigem: number, numeroDestino: number, valor: number): void {
        let contaOrigem = this.buscarNoArray(numeroOrigem);
        let contaDestino = this.buscarNoArray(numeroDestino);

        if (contaOrigem != null && contaDestino != null) {
            if(contaOrigem.sacar(valor) == true){
                contaDestino.depositar(valor);
                console.log(colors.fg.green, "\nA transferência da conta número: " + numeroOrigem + " para a conta número: " + " foi efetuada com sucesso!", colors.reset);
            }
        } else
        console.log(colors.fg.red, "\nA conta número: " + numeroOrigem + " e/ou a conta número: " + numeroDestino + " não foram encontradas!", colors.reset);
    }

    public gerarNumero(): number {
        return ++this.numero;
    }

    public buscarNoArray(numero: number): Conta | null {
        for (let conta of this.listaContas) {
            if (conta.numero === numero) {
                return conta;
            }
        }
        return null;
    }
}
