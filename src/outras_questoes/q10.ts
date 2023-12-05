interface Tributavel {
    calcularTributo(): number;
}

class Conta {
    constructor(private _nome: string, private _saldo: number) {}

    get nome(): string {
        return this._nome;
    }

    // set nome(nome: string) {
    //     this._nome = nome
    // }

    get saldo(): number {
        return this._saldo;
    }

    //  set saldo(saldo: number) {
    //      this._saldo = saldo
    //  }
}

class ContaCorrente extends Conta implements Tributavel {
    calcularTributo(): number {
        return super.saldo * 0.1;
    }
}

class SeguroDeVida implements Tributavel {
    calcularTributo(): number {
        return 50;
    }
}

export { ContaCorrente, SeguroDeVida, Tributavel };