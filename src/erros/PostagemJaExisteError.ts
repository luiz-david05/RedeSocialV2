import { AplicacaoError } from "./AplicacaoError.js";

export class PostagemJaExisteError extends AplicacaoError {
    constructor(mensagem: string) {
        super(mensagem);
    }
}