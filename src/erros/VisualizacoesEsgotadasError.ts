import { AplicacaoError } from "./AplicacaoError.js";

export class VisualizacoesEsgotadasError extends AplicacaoError {
    constructor(mensagem: string) {
        super(mensagem);
    }
}