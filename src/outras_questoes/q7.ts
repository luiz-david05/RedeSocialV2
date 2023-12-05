interface FiguraGeometrica {
    calcularArea(): number
    calcularPerimetro(): number
}

// questão 7/8
interface IComparavel {
    comparar(figuraGeometrica: FiguraGeometrica): number
}

class Quadrado implements FiguraGeometrica, IComparavel {
    constructor(private _base: number) {}

    calcularArea(): number {
        return Math.pow(this._base, 2)
    }

    calcularPerimetro(): number {
        return 4 * this._base
    }

    comparar(figuraGeometrica: FiguraGeometrica): number {
        if (this.calcularArea() > figuraGeometrica.calcularArea()) {
            return 1
        } else if (this.calcularArea() == figuraGeometrica.calcularArea()) {
            return 0
        } 
        return -1
    }
}

class Triangulo implements FiguraGeometrica, IComparavel {
    constructor(private _base: number, private _altura: number, private _ladoA: number, private _ladoB: number, private _ladoC: number) {}

    calcularArea(): number {
        return (this._base * this._altura) / 2
    }

    calcularPerimetro(): number {
        return this._ladoA + this._ladoB + this._ladoC
    }

    comparar(figuraGeometrica: FiguraGeometrica): number {
        if (this.calcularArea() > figuraGeometrica.calcularArea()) {
            return 1
        } else if (this.calcularArea() == figuraGeometrica.calcularArea()) {
            return 0
        } 
        return -1
    }
}

class Retangulo implements FiguraGeometrica, IComparavel {
    constructor(private _base: number, private _altura: number) {}

    calcularArea(): number {
        return this._base * this._altura
    }

    calcularPerimetro(): number {
        return 2 * (this._base + this._altura)
    }

    comparar(figuraGeometrica: FiguraGeometrica): number {
        if (this.calcularArea() > figuraGeometrica.calcularArea()) {
            return 1
        } else if (this.calcularArea() == figuraGeometrica.calcularArea()) {
            return 0
        } 
        return -1
    }
}

// questão 9
class App {
    static main(): void {
        let app = new App();
    }

    constructor() {
        let quadrado = new Quadrado(10);
        let triangulo = new Triangulo(10, 20, 10, 10, 10);
        let retangulo = new Retangulo(10, 20);

        console.log(quadrado.comparar(triangulo));
        console.log(triangulo.comparar(retangulo));
        console.log(retangulo.comparar(quadrado));
    }
}

App.main();