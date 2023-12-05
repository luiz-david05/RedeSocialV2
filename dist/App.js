import { Perfil } from "./entidades/Perfil.js";
import { Postagem } from "./entidades/Postagem.js";
import { PostagemAvancada } from "./entidades/PostagemAvancada.js";
import { repositorioPerfisArray } from "./interfaces/IRepositorioPerfis.js";
import { repositorioPostagensArray } from "./interfaces/IRepositorioPostagens.js";
import { InputInvalidoError } from "./erros/InputInvalidoError.js";
import * as utils from "./Utils.js";
import { RedeSocial } from "./RedeSocial.js";
import { AplicacaoError } from "./erros/AplicacaoError.js";
import { ArquivoError } from "./erros/ArquivoError.js";
import fs from "fs";
class App {
    _redeSocial = new RedeSocial(new repositorioPerfisArray(), new repositorioPostagensArray());
    static main() {
        new App().run();
    }
    validaDadosPerfil(nome, email) {
        if (nome.length < 5 || nome.length > 100) {
            throw new InputInvalidoError("Nome inválido: o comprimento deve estar entre 5 e 100 caracteres");
        }
        if (!/^[a-zA-ZÀ-ÿ\s'-]+$/.test(nome)) {
            throw new InputInvalidoError("Nome inválido: caracteres não permitidos encontrados.");
        }
        if (!email.includes("@")) {
            throw new InputInvalidoError("Email inválido: o email deve conter um '@'.");
        }
        if (!email.includes(".")) {
            throw new InputInvalidoError("Email inválido: o email deve conter um '.'.");
        }
        if (email.indexOf("@") > email.lastIndexOf(".")) {
            throw new InputInvalidoError("Email inválido: o '@' deve estar antes do '.'.");
        }
        if (email.indexOf("@") === 0) {
            throw new InputInvalidoError("Email inválido: o '@' não pode ser o primeiro caractere.");
        }
        if (email.lastIndexOf(".") === email.length - 1) {
            throw new InputInvalidoError("Email inválido: o '.' não pode ser o último caractere.");
        }
        if (email.lastIndexOf("@") !== email.indexOf("@")) {
            throw new InputInvalidoError("Email inválido: o email não pode conter mais de um '@'.");
        }
        if (email.lastIndexOf(".") < email.indexOf("@")) {
            throw new InputInvalidoError("Email inválido: o '.' deve estar depois do '@'.");
        }
        if (email.lastIndexOf(".") - email.indexOf("@") === 1) {
            throw new InputInvalidoError("Email inválido: o '.' não pode estar logo depois do '@'.");
        }
    }
    validaDadosPostagem(texto) {
        if (texto.length < 10 || texto.length > 500) {
            throw new InputInvalidoError("Texto inválido: o comprimento deve estar entre 10 e 500 caracteres");
        }
    }
    salvarPerfis() {
        try {
            const perfis = this._redeSocial.repositorioPerfis.getPerfis();
            const perfisParaEscrever = perfis.map((perfil) => {
                return this._redeSocial.toStringPerfilArquivo(perfil);
            });
            fs.writeFileSync("./perfis.txt", "");
            fs.appendFileSync("./perfis.txt", perfisParaEscrever.join("\n"));
        }
        catch {
            throw new ArquivoError("Erro ao salvar perfis.");
        }
    }
    carregarPerfis() {
        try {
            const perfisFile = fs
                .readFileSync("./perfis.txt")
                .toString()
                .split("\n");
            for (let perfil of perfisFile) {
                const dadosPerfil = perfil.split(";");
                const [id, nome, email] = dadosPerfil;
                let novoPerfil = new Perfil(id, nome, email);
                this._redeSocial.incluirPerfil(novoPerfil);
            }
        }
        catch {
            throw new ArquivoError("Erro ao carregar perfis.");
        }
    }
    salvarPostagens() {
        try {
            const postagens = this._redeSocial.repositorioPostagens.getPostagens();
            const postagensParaEscrever = postagens.map((postagem) => {
                return this._redeSocial.toStringPostagemArquivo(postagem);
            });
            fs.writeFileSync("./postagens.txt", "");
            fs.appendFileSync("./postagens.txt", postagensParaEscrever.join("\n"));
        }
        catch {
            throw new ArquivoError("Erro ao salvar postagens.");
        }
    }
    carregarPostagens() {
        try {
            const postagensFile = fs
                .readFileSync("./postagens.txt")
                .toString()
                .split("\n");
            for (const postagem of postagensFile) {
                const trimmedPostagem = postagem.trim();
                if (trimmedPostagem != "") {
                    const dadosPostagem = trimmedPostagem.split(";");
                    let [tipo, id, texto, curtidas, descurtidas, data, perfilId, hashtags, vizualizacoesRestantes,] = dadosPostagem;
                    const hashtagArray = (hashtags || "").split(",");
                    let novaPostagem = new Postagem(id, texto, Number(curtidas), Number(descurtidas), data, this._redeSocial.consultarPerfil(perfilId, null, null));
                    if (tipo == "pa") {
                        novaPostagem = new PostagemAvancada(id, texto, Number(curtidas), Number(descurtidas), data, this._redeSocial.consultarPerfil(perfilId, null, null), hashtagArray, Number(vizualizacoesRestantes));
                    }
                    this._redeSocial.incluirPostagem(novaPostagem);
                }
            }
        }
        catch {
            throw new ArquivoError("Erro ao carregar postagens.");
        }
    }
    criarPerfil() {
        const id = utils.gerarId();
        const nome = utils.input("Digite o nome do usuário: ");
        const email = utils.input("Digite o email do usuário: ");
        this.validaDadosPerfil(nome, email);
        this._redeSocial.incluirPerfil(new Perfil(id, nome, email));
        console.log(`\nPerfil "${nome}" criado com sucesso!`);
    }
    criarPostagem() {
        const id = utils.gerarId();
        const nomeAutor = utils.input("Digite o nome de usuário do autor da postagem: ");
        const autor = this._redeSocial.consultarPerfil(null, nomeAutor, null);
        const texto = utils.input("Digite o texto da postagem: ");
        this.validaDadosPostagem(texto);
        let tipo = utils.getNumber("Digite o tipo da postagem (1 - Normal, 2 - Avançada): ");
        let postagem;
        if (tipo === 1) {
            postagem = new Postagem(id, texto, 0, 0, this._redeSocial.formatarData(new Date()), autor);
        }
        else if (tipo === 2) {
            postagem = new PostagemAvancada(id, texto, 0, 0, this._redeSocial.formatarData(new Date()), autor, [], 300);
            while (true) {
                const nomeHashtag = utils.input("Digite o nome da hashtag (0 para sair): ");
                if (nomeHashtag.includes("#")) {
                    this._redeSocial.inserirHashtag(postagem, nomeHashtag);
                }
                else {
                    console.log("\nHashtag inválida: a hashtag deve começar com '#'.");
                }
                if (nomeHashtag === "0") {
                    break;
                }
            }
        }
        this._redeSocial.incluirPostagem(postagem);
        console.log(`\nPostagem criada com sucesso!`);
    }
    exibirFeed() {
        console.log("\nFeed de postagens:");
        const postagens = this._redeSocial.exibirFeedPostagens();
        for (let i = 0; i < postagens.length; i++) {
            const postagem = postagens[i];
            console.log(`\nPostagem [${i + 1}]`);
            console.log(`${this._redeSocial.toStringPostagem(postagem)}`);
            const opcao = utils.getNumber("\nDigite 1 para curtir, 2 para descurtir ou 0 para sair: ");
            if (opcao === 1) {
                this._redeSocial.curtirPostagem(postagem.id);
            }
            else if (opcao === 2) {
                this._redeSocial.descurtirPostagem(postagem.id);
            }
            else if (opcao === 0) {
                break;
            }
        }
        console.log("\nFeed de postagens atualizado!");
    }
    consultarPerfil() {
        const busca = utils.getNumber("Digite 1 para buscar por id, 2 para buscar por nome ou 3 para buscar por email: ");
        let perfilPesquisado;
        if (busca === 1) {
            const id = utils.input("Digite o id do perfil: ");
            perfilPesquisado = this._redeSocial.consultarPerfil(id, null, null);
        }
        else if (busca === 2) {
            const nome = utils.input("Digite o nome do perfil: ");
            perfilPesquisado = this._redeSocial.consultarPerfil(null, nome, null);
        }
        else if (busca === 3) {
            const email = utils.input("Digite o email do perfil: ");
            perfilPesquisado = this._redeSocial.consultarPerfil(null, null, email);
        }
        else {
            throw new InputInvalidoError("Opção inválida: a opção deve ser 1, 2 ou 3.");
        }
        console.log(`\nPerfil encontrado: ${this._redeSocial.toStringPerfil(perfilPesquisado)}`);
    }
    consultarPostagem() {
        const id = utils.input("Digite o id da postagem: ");
        const postagemPesquisada = this._redeSocial.consultarPostagem(id, null, null, null);
        console.log(`\nPostagem encontrada: ${this._redeSocial.toStringPostagem(postagemPesquisada[0])}`);
    }
    menu() {
        console.log("\nOpções disponíveis:");
        const texto = '\n\t1 - Criar Perfil\n' +
            '\n\t2 - Criar Postagem\n' +
            '\n\t3 - Exibir feed\n' +
            '\n\t4 - Consultar perfil\n' +
            '\n\t5 - Consultar postagem\n' +
            '\n\t0 - sair\n';
        console.log(texto);
    }
    run() {
        console.log("CARREGANDO DADOS...");
        let opcao;
        try {
            this.carregarPerfis();
            this.carregarPostagens();
            console.log("\nDADOS CARREGADOS COM SUCESSO!");
        }
        catch (e) {
            console.log(`\nNão foi possível carregar os dados: ${e.message}`);
            if (!(e instanceof AplicacaoError)) {
                console.log(`\n${e.message}, Ops :/, este erro não foi reconhecido, por favor, entre em contato com o administrador.`);
            }
        }
        do {
            utils.input("\nPressione ENTER para continuar...");
            this.menu();
            opcao = utils.getNumber("\nDigite a opção desejada: ");
            try {
                switch (opcao) {
                    case 0:
                        this.salvarPerfis();
                        this.salvarPostagens();
                        break;
                    case 1:
                        this.criarPerfil();
                        break;
                    case 2:
                        this.criarPostagem();
                        break;
                    case 3:
                        this.exibirFeed();
                        break;
                    case 4:
                        this.consultarPerfil();
                        break;
                    case 5:
                        this.consultarPostagem();
                        break;
                }
            }
            catch (e) {
                console.log(`\nNão foi possível concluir a operação: ${e.message}`);
                if (!(e instanceof AplicacaoError)) {
                    console.log(`${e.message}, Ops :/, este erro não foi reconhecido, por favor, entre em contato com o administrador.`);
                }
            }
        } while (opcao != 0);
        console.log("\nAPLICAÇÃO FINALIZADA!");
    }
}
App.main();
