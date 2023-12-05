import { AplicacaoError } from "./AplicacaoError.js";

export class PerfilJaExisteError extends AplicacaoError {
    constructor(mensagem: string) {
        super(mensagem);
    }
}