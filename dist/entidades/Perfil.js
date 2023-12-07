export class Perfil {
    _id;
    _nome;
    _email;
    constructor(_id, _nome, _email) {
        this._id = _id;
        this._nome = _nome;
        this._email = _email;
    }
    _postagens = [];
    get postagens() {
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
    set nome(nome) {
        this._nome = nome;
    }
    set email(email) {
        this._email = email;
    }
}
