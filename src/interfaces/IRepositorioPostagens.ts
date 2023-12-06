import { Perfil } from "../entidades/Perfil.js";
import { PostagemAvancada } from "../entidades/PostagemAvancada.js";
import { Postagem } from "../entidades/Postagem.js";

export interface IRepositorioPostagens {
    incluirPostagem(postagem: Postagem): void;
    consultarPostagem(id: string, texto: string, hashtag: string, perfil: Perfil): Postagem[];

    getPostagens(): Postagem[];
    excluirPostagem(id: string): void;
}

export class repositorioPostagensArray implements IRepositorioPostagens {
    private _postagens: Postagem[] = [];

    getPostagens(): Postagem[] {
        return this._postagens;
    }

    incluirPostagem(postagem: Postagem): void {
        this._postagens.push(postagem);
        postagem.perfil.postagens.push(postagem);
    }

    consultarPostagem(
        id: string,
        texto: string,
        hashtag: string,
        perfil: Perfil
    ): Postagem[] {
        return this._postagens.filter(
            (postagem) =>
                (postagem.id === null || postagem.id === id) &&
                (postagem.texto === null || postagem.texto.indexOf(texto) != 1) &&
                (hashtag === null ||
                    (postagem instanceof PostagemAvancada &&
                        postagem.existeHashtag(hashtag))) &&
                (perfil === null || postagem.perfil === perfil)
        );
    }

    excluirPostagem(id: string): void {
        for (let i = 0; i < this._postagens.length; i++) {
            if (this._postagens[i].id == id) {
                this._postagens.splice(i, 1);
                break;
            }
        }
    }
}