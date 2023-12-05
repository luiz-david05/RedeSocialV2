import { AplicacaoError } from "./AplicacaoError.js";
export class PerfilJaExisteError extends AplicacaoError {
    constructor(mensagem) {
        super(mensagem);
    }
}
