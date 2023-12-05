import { Perfil } from "./Perfil.js";
import { Postagem } from "./Postagem.js";

export class PostagemAvancada extends Postagem {
    constructor(
        id: string,
        texto: string,
        curtidas: number,
        descurtidas: number,
        data: string,
        perfil: Perfil,
        private _hashtags: string[] = [],
        private _visualizacoesRestantes: number
    ) {
        super(id, texto, curtidas, descurtidas, data, perfil);
    }

    get hashtags(): string[] {
        return this._hashtags;
    }

    get visualizacoesRestantes() {
        return this._visualizacoesRestantes;
    }

    adicionarHashtag(hashtag: string): void {
        this.hashtags.push(hashtag);
    }

    existeHashtag(hashtag: string): boolean {
        return this._hashtags.includes(hashtag);
    }

    diminuirVisualizacoes() {
        this._visualizacoesRestantes--;
    }

    // private validaHashtags(): void {
    //     if (this._hashtags.length > 5) {
    //         throw new Error("Número máximo de hashtags excedido");
    //     }

    //     for (const hashtag of this._hashtags) {
    //         if (hashtag.length > 100) {
    //             throw new Error("Hashtag com mais de 100 caracteres");
    //         }
    //     }

    //     if (this._hashtags.length == 0) {
    //         throw new Error("Deve haver pelo menos uma hashtag");
    //     }

    //     if (this._hashtags.length != new Set(this._hashtags).size) {
    //         throw new Error("Hashtags duplicadas");
    //     }

    //     if (this._hashtags.some((hashtag) => hashtag.indexOf("#") != 0)) {
    //         throw new Error("Hashtags devem começar com #");
    //     }
    // }
}