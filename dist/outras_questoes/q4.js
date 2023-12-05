/* abstract class FiguraGeometrica {
    constructor(protected _base: number, protected _altura: number) {}

    abstract calcularArea(): number
    abstract calcularPerimetro(): number
}

class Quadrado extends FiguraGeometrica {
    calcularArea(): number {
        return Math.pow(this._base, 2)
    }

    calcularPerimetro(): number {
        return 4 * this._base
    }
}

class Triangulo extends FiguraGeometrica {
    constructor(base: number, altura: number, private _ladoA: number, private _ladoB: number, private _ladoC: number) {
        super(base, altura)
    }

    calcularArea(): number {
        return (this._base * this._altura) / 2
    }

    calcularPerimetro(): number {
        return this._ladoA + this._ladoB + this._ladoC
    }
}

class Retangulo extends FiguraGeometrica {
    calcularArea(): number {
        return this._base * this._altura
    }

    calcularPerimetro(): number {
        return 2 * (this._base + this._altura)
    }
}
*/ 
