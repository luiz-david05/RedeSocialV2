import { AplicacaoError } from "./AplicacaoError.js";
export class PostagemInexistenteErro extends AplicacaoError {
    constructor(mensagem) {
        super(mensagem);
    }
}
