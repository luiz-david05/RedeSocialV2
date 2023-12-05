import { AplicacaoError } from "./AplicacaoError.js";

export class ArquivoError extends AplicacaoError {
    constructor(mensagem: string) {
        super(mensagem);
    }
}