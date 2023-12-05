import { ContaCorrente, SeguroDeVida } from "./q10.js";
class AuditoriaInterna {
    _tributaveis = [];
    get tributaveis() {
        return this._tributaveis;
    }
    adicionarTributavel(tributavel) {
        this._tributaveis.push(tributavel);
    }
    calcularTributos() {
        // let total = 0
        // this.tributaveis.forEach(tributavel => {
        //     total += tributavel.calcularTributo()
        // })
        // return total
        return this.tributaveis.reduce((total, tributavel) => total + tributavel.calcularTributo(), 0);
    }
}
class Teste {
    static main() {
        let contaCorrente = new ContaCorrente("Conta Corrente", 100);
        let contaCorrente2 = new ContaCorrente("Conta Corrente2", 100);
        let seguroDeVida = new SeguroDeVida();
        let seguroDeVida2 = new SeguroDeVida();
        let auditoriaInterna = new AuditoriaInterna();
        auditoriaInterna.adicionarTributavel(contaCorrente);
        auditoriaInterna.adicionarTributavel(contaCorrente2);
        auditoriaInterna.adicionarTributavel(seguroDeVida);
        auditoriaInterna.adicionarTributavel(seguroDeVida2);
        console.log(auditoriaInterna.calcularTributos());
    }
}
Teste.main();
