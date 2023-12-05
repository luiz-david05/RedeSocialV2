class Quadrado {
    _base;
    constructor(_base) {
        this._base = _base;
    }
    calcularArea() {
        return Math.pow(this._base, 2);
    }
    calcularPerimetro() {
        return 4 * this._base;
    }
    comparar(figuraGeometrica) {
        if (this.calcularArea() > figuraGeometrica.calcularArea()) {
            return 1;
        }
        else if (this.calcularArea() == figuraGeometrica.calcularArea()) {
            return 0;
        }
        return -1;
    }
}
class Triangulo {
    _base;
    _altura;
    _ladoA;
    _ladoB;
    _ladoC;
    constructor(_base, _altura, _ladoA, _ladoB, _ladoC) {
        this._base = _base;
        this._altura = _altura;
        this._ladoA = _ladoA;
        this._ladoB = _ladoB;
        this._ladoC = _ladoC;
    }
    calcularArea() {
        return (this._base * this._altura) / 2;
    }
    calcularPerimetro() {
        return this._ladoA + this._ladoB + this._ladoC;
    }
    comparar(figuraGeometrica) {
        if (this.calcularArea() > figuraGeometrica.calcularArea()) {
            return 1;
        }
        else if (this.calcularArea() == figuraGeometrica.calcularArea()) {
            return 0;
        }
        return -1;
    }
}
class Retangulo {
    _base;
    _altura;
    constructor(_base, _altura) {
        this._base = _base;
        this._altura = _altura;
    }
    calcularArea() {
        return this._base * this._altura;
    }
    calcularPerimetro() {
        return 2 * (this._base + this._altura);
    }
    comparar(figuraGeometrica) {
        if (this.calcularArea() > figuraGeometrica.calcularArea()) {
            return 1;
        }
        else if (this.calcularArea() == figuraGeometrica.calcularArea()) {
            return 0;
        }
        return -1;
    }
}
// questão 9
class App {
    static main() {
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
