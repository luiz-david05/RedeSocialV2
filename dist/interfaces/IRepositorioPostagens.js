import { PostagemAvancada } from "../entidades/PostagemAvancada.js";
export class repositorioPostagensArray {
    _postagens = [];
    getPostagens() {
        return this._postagens;
    }
    incluirPostagem(postagem) {
        this._postagens.push(postagem);
        postagem.perfil.postagens.push(postagem);
    }
    consultarPostagem(id, texto, hashtag, perfil) {
        return this._postagens.filter((postagem) => (postagem.id == null || postagem.id == id) &&
            (postagem.texto == null || postagem.texto.indexOf(texto) != 1) &&
            (hashtag == null ||
                (postagem instanceof PostagemAvancada &&
                    postagem.existeHashtag(hashtag))) &&
            (perfil == null || postagem.perfil == perfil));
    }
    excluirPostagem(id) {
        for (let i = 0; i < this._postagens.length; i++) {
            if (this._postagens[i].id == id) {
                this._postagens.splice(i, 1);
                break;
            }
        }
    }
}
