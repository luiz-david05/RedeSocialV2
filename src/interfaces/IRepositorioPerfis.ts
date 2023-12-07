import { Perfil } from "../entidades/Perfil.js";

export interface IRepositorioPerfis {
    incluirPerfil(perfil: Perfil): void;
    consultarPerfil(id: string, nome: string, email: string): Perfil | null;

    getPerfis(): Perfil[];
    excluirPerfil(id: string): void;
    editarPerfil(id: string, nome: string, email: string): void;
}

export class repositorioPerfisArray implements IRepositorioPerfis {
    private _perfis: Perfil[] = [];

    incluirPerfil(perfil: Perfil): void {
        this._perfis.push(perfil);
    }

    consultarPerfil(id: string, nome: string, email: string): Perfil | null {
        for (const perfil of this._perfis) {
            if (perfil.id == id) return perfil;
            else if (perfil.email == email) return perfil;
            else if (perfil.nome == nome) return perfil;
        }

        return null
    }

    getPerfis(): Perfil[] {
        return this._perfis;
    }

    excluirPerfil(id: string): void {
        for (let i = 0; i < this._perfis.length; i++) {
            if (this._perfis[i].id == id) {
                this._perfis.splice(i, 1);
                break;
            }
        }
    }

    editarPerfil(id: string, nome: string, email: string): void {
        for (const perfil of this._perfis) {
            if (perfil.id == id) {
                perfil.nome = nome;
                perfil.email = email;
                break;
            }
        }
    }
}