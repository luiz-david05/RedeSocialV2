class Conta {
    _nome;
    _saldo;
    constructor(_nome, _saldo) {
        this._nome = _nome;
        this._saldo = _saldo;
    }
    get nome() {
        return this._nome;
    }
    // set nome(nome: string) {
    //     this._nome = nome
    // }
    get saldo() {
        return this._saldo;
    }
}
class ContaCorrente extends Conta {
    calcularTributo() {
        return super.saldo * 0.1;
    }
}
class SeguroDeVida {
    calcularTributo() {
        return 50;
    }
}
export { ContaCorrente, SeguroDeVida };
