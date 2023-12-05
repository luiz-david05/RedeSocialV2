abstract class Funcionario {
    constructor(protected _salario: number) {}

    abstract getBonificacao(): number
}

class Gerente extends Funcionario {
    getBonificacao(): number {
        return this._salario * 0.4
    }
}

class Diretor extends Funcionario {
    getBonificacao(): number {
        return this._salario * 0.6
    }
}

class Presidente extends Funcionario {
    getBonificacao(): number {
        return this._salario + 1000
    }
}