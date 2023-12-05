import { AplicacaoError } from "./AplicacaoError.js";
export class HashtagJaExisteError extends AplicacaoError {
    constructor(mensagem) {
        super(mensagem);
    }
}
