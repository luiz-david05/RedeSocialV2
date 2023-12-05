class Funcionario {
    _salario;
    constructor(_salario) {
        this._salario = _salario;
    }
}
class Gerente extends Funcionario {
    getBonificacao() {
        return this._salario * 0.4;
    }
}
class Diretor extends Funcionario {
    getBonificacao() {
        return this._salario * 0.6;
    }
}
class Presidente extends Funcionario {
    getBonificacao() {
        return this._salario + 1000;
    }
}
