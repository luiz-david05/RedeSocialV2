import { AplicacaoError } from "./AplicacaoError.js";

export class PerfilInexistenteError extends AplicacaoError {
    constructor(mensagem: string) {
        super(mensagem);
    }
}