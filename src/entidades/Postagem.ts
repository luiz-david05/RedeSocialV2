import { Perfil } from "./Perfil.js";

export class Postagem {
    constructor(
        private _id: string,
        private _texto: string,
        private _curtidas: number,
        private _descurtidas: number,
        private _data: string,
        private _perfil: Perfil
    ) {}

    get id() {
        return this._id;
    }

    get texto() {
        return this._texto;
    }

    get curtidas() {
        return this._curtidas;
    }

    get descurtidas() {
        return this._descurtidas;
    }

    get data() {
        return this._data;
    }

    get perfil() {
        return this._perfil;
    }

    curtir() {
        this._curtidas++;
    }

    descurtir() {
        this._descurtidas++;
    }

    ehPopular(): boolean {
        return this._curtidas > 1.5 * this._descurtidas;
    }
}