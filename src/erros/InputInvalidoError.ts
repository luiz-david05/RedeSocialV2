import { AplicacaoError } from "./AplicacaoError.js";

export class InputInvalidoError extends AplicacaoError {
    constructor(mensagem: string) {
        super(mensagem);
    }
}