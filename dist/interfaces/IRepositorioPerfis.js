export class repositorioPerfisArray {
    _perfis = [];
    incluirPerfil(perfil) {
        this._perfis.push(perfil);
    }
    consultarPerfil(id, nome, email) {
        for (const perfil of this._perfis) {
            if (perfil.id == id)
                return perfil;
            else if (perfil.email == email)
                return perfil;
            else if (perfil.nome == nome)
                return perfil;
        }
        return null;
    }
    getPerfis() {
        return this._perfis;
    }
    excluirPerfil(id) {
        for (let i = 0; i < this._perfis.length; i++) {
            if (this._perfis[i].id == id) {
                this._perfis.splice(i, 1);
                break;
            }
        }
    }
}
