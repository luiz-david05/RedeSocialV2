import { Postagem } from "./Postagem.js";

export class Perfil {
    constructor(
        private _id: string,
        private _nome: string,
        private _email: string
    ) {}

    private _postagens: Postagem[] = [];

    get postagens(): Postagem[] {
        return this._postagens;
    }

    get id() {
        return this._id;
    }

    get nome() {
        return this._nome;
    }

    get email() {
        return this._email;
    }

    set nome(nome: string) {
        this._nome = nome;
    }

    set email(email: string) {
        this._email = email;
    }
}