import {ContaCorrente, SeguroDeVida, Tributavel} from "./q10.js";

class AuditoriaInterna {
    private _tributaveis: Tributavel[] = [];

    get tributaveis(): Tributavel[] {
        return this._tributaveis;
    }

    adicionarTributavel(tributavel: Tributavel): void {
        this._tributaveis.push(tributavel);
    }

    calcularTributos(): number {
        // let total = 0
        // this.tributaveis.forEach(tributavel => {
        //     total += tributavel.calcularTributo()
        // })
        // return total

        return this.tributaveis.reduce(
            (total, tributavel) => total + tributavel.calcularTributo(),
            0
        );
    }
}

class Teste {
    static main(): void {
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