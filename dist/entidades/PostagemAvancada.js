import { Postagem } from "./Postagem.js";
export class PostagemAvancada extends Postagem {
    _hashtags;
    _visualizacoesRestantes;
    constructor(id, texto, curtidas, descurtidas, data, perfil, _hashtags = [], _visualizacoesRestantes) {
        super(id, texto, curtidas, descurtidas, data, perfil);
        this._hashtags = _hashtags;
        this._visualizacoesRestantes = _visualizacoesRestantes;
    }
    get hashtags() {
        return this._hashtags;
    }
    get visualizacoesRestantes() {
        return this._visualizacoesRestantes;
    }
    adicionarHashtag(hashtag) {
        this.hashtags.push(hashtag);
    }
    existeHashtag(hashtag) {
        return this._hashtags.includes(hashtag);
    }
    diminuirVisualizacoes() {
        this._visualizacoesRestantes--;
    }
}
