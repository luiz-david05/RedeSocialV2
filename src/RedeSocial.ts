import { Perfil } from "./entidades/Perfil.js";
import { Postagem } from "./entidades/Postagem.js";
import { PostagemAvancada } from "./entidades/PostagemAvancada.js";
import { HashtagJaExisteError } from "./erros/HashtagJaExisteError.js";
import { InputInvalidoError } from "./erros/InputInvalidoError.js";
import { PerfilInexistenteError } from "./erros/PerfilInexistenteError.js";
import { PerfilJaExisteError } from "./erros/PerfilJaExisteError.js";
import { PostagemInexistenteErro } from "./erros/PostagemInexistenteError.js";
import { PostagemJaExisteError } from "./erros/PostagemJaExisteError.js";
import { VisualizacoesEsgotadasError } from "./erros/VisualizacoesEsgotadasError.js";
import { IRepositorioPerfis } from "./interfaces/IRepositorioPerfis.js";
import { IRepositorioPostagens } from "./interfaces/IRepositorioPostagens.js";
import * as utils from "./Utils.js";
import chalk from "chalk";

class RedeSocial {
    constructor(
        private _repositorioPerfis: IRepositorioPerfis,
        private _repositorioPostagens: IRepositorioPostagens
    ) {}

    get repositorioPerfis() {
        return this._repositorioPerfis;
    }

    get repositorioPostagens() {
        return this._repositorioPostagens;
    }

    incluirPerfil(perfil: Perfil): void {
        try {
            this.consultarPerfil(perfil.id, perfil.nome, perfil.email);
            throw new PerfilJaExisteError("Este Perfil já existe.");
        } catch (e: any) {
            if (e instanceof PerfilJaExisteError) {
                throw e;
            } else {
                this._repositorioPerfis.incluirPerfil(perfil);
            }
        }
    }

    consultarPerfil(id: string, nome: string, email: string): Perfil {
        const perfil = this._repositorioPerfis.consultarPerfil(id, nome, email);
        if (perfil === null) {
            throw new PerfilInexistenteError("Este Perfil não existe.");
        }
        return perfil;
    }

    incluirPostagem(postagem: Postagem): void {
        try {
            this.consultarPostagem(
                postagem.id,
                postagem.texto,
                null,
                postagem.perfil
            );
            throw new PostagemJaExisteError("Esta Postagem já existe.");
        } catch (e: any) {
            if (e instanceof PostagemJaExisteError) {
                throw e;
            } else {
                this._repositorioPostagens.incluirPostagem(postagem);
            }
        }
    }

    consultarPostagem(
        id: string,
        texto: string,
        hashtag: string,
        perfil: Perfil
    ): Postagem[] {
        const postagens = this._repositorioPostagens.consultarPostagem(
            id,
            texto,
            hashtag,
            perfil
        );

        if (postagens.length === 0) {
            throw new PostagemInexistenteErro("Nenhuma postagem encontrada.");
        }

        return postagens;
    }

    curtirPostagem(id: string): void {
        const postagens = this._repositorioPostagens.consultarPostagem(
            id,
            null,
            null,
            null
        );

        postagens[0].curtir();
    }

    descurtirPostagem(id: string): void {
        const postagens = this._repositorioPostagens.consultarPostagem(
            id,
            null,
            null,
            null
        );

        postagens[0].descurtir();
    }

    decrementarVisualizacoes(postagem: PostagemAvancada): void {
        if (postagem.visualizacoesRestantes > 0) {
            postagem.diminuirVisualizacoes();
        }
    }

    // mudei para pesquisar pelo nome do perfil
    exibirPostagensPerfil(nomePerfil: string): Postagem[] {
        const perfil = this.consultarPerfil(null, nomePerfil, null);
        const postagensPerfil: Postagem[] = [];

        perfil.postagens.forEach((postagem) => {
            if (
                postagem instanceof PostagemAvancada &&
                postagem.visualizacoesRestantes > 0
            ) {
                postagensPerfil.push(postagem);
            }

            if (postagem instanceof PostagemAvancada) {
                this.decrementarVisualizacoes(postagem);
            } else if (postagem instanceof Postagem) {
                postagensPerfil.push(postagem);
            }
        });

        return postagensPerfil;
    }

    exibirPostagensHashtag(hashtag: string): PostagemAvancada[] {
        const postagens = this._repositorioPostagens.getPostagens();
        const postagensHashtag: PostagemAvancada[] = [];

        if (postagens.length === 0) {
            throw new PostagemInexistenteErro("Nenhuma postagem encontrada.");
        }

        postagens.forEach((postagem) => {
            if (
                postagem instanceof PostagemAvancada &&
                postagem.visualizacoesRestantes > 0 &&
                postagem.existeHashtag(hashtag)
            ) {
                postagensHashtag.push(postagem);
            }

            if (postagem instanceof PostagemAvancada) {
                this.decrementarVisualizacoes(postagem);
            }
        });

        return postagensHashtag;
    }

    exibirPostagensPopulares(): Postagem[] {
        const postagens = this._repositorioPostagens.getPostagens();
        const postagensPopulares: Postagem[] = [];

        if (postagens.length === 0) {
            throw new PostagemInexistenteErro("Nenhuma postagem encontrada.");
        }

        postagens.forEach((postagem) => {
            if (
                postagem instanceof PostagemAvancada &&
                postagem.visualizacoesRestantes > 0 &&
                postagem.ehPopular()
            ) {
                postagensPopulares.push(postagem);
            }

            if (postagem instanceof PostagemAvancada) {
                this.decrementarVisualizacoes(postagem);
            }

            if (postagem instanceof Postagem && postagem.ehPopular()) {
                postagensPopulares.push(postagem);
            }

            postagensPopulares.sort((a, b) => b.curtidas - a.curtidas);
        });

        return postagensPopulares.slice(0, 10);
    }

    // extra
    exibirPerfisPopulares(): Perfil[] {
        const postagensPopulares: Postagem[] = this.exibirPostagensPopulares()

        const perfisPopulares: Perfil[] = []

        postagensPopulares.forEach((postagem) => {
            if (!perfisPopulares.includes(postagem.perfil)) {
                perfisPopulares.push(postagem.perfil)
            }
        })

        return perfisPopulares.slice(0, 10)
    }

    exibirHashtagsPopulares(): string[] {
        const postagens = this._repositorioPostagens.getPostagens();

        if (postagens.length === 0) {
            throw new PostagemInexistenteErro("Nenhuma postagem encontrada.");
        }

        const todasHashtags: string[] = [];

        postagens.forEach((postagem) => {
            if (
                postagem instanceof PostagemAvancada &&
                postagem.visualizacoesRestantes > 0
            ) {
                todasHashtags.push(...postagem.hashtags);
            }
        });

        const countHashtags = new Map<string, number>();
        todasHashtags.forEach((hashtag) => {
            const count = countHashtags.get(hashtag);
            countHashtags.set(hashtag, count + 1);
        });

        const hashtagsPopulares = Array.from(countHashtags.entries())
            .sort((a, b) => b[1] - a[1])
            .map(([hashtag]) => hashtag);

        return hashtagsPopulares;
    }

    exibirFeedPostagens(): Postagem[] {
        const postagens = this._repositorioPostagens.getPostagens();
        const postagensFeed: Postagem[] = [];

        if (postagens.length === 0) {
            throw new PostagemInexistenteErro("Nenhuma postagem encontrada.");
        }

        postagens.forEach((postagem) => {
            if (
                postagem instanceof PostagemAvancada &&
                postagem.visualizacoesRestantes > 0
            ) {
                postagensFeed.push(postagem);
            }

            if (postagem instanceof PostagemAvancada) {
                this.decrementarVisualizacoes(postagem);
            } else if (postagem instanceof Postagem) {
                postagensFeed.push(postagem);
            }

            postagensFeed.sort((a, b) => b.curtidas - a.curtidas);
        });

        return postagensFeed;
    }

    excluirPerfil(id: string): void {
        const perfil = this.consultarPerfil(id, null, null);

        if (perfil.postagens.length > 0) {
            perfil.postagens.forEach((postagem) => {
                this._repositorioPostagens.excluirPostagem(postagem.id);
            });
        }

        this._repositorioPerfis.excluirPerfil(id);
    }

    excluirPostagem(id: string): void {
        const postagem = this.consultarPostagem(id, null, null, null);

        this._repositorioPostagens.excluirPostagem(id);
    }

    editarPerfil(perfil: Perfil): void {
        this.consultarPerfil(perfil.id, null, null);
        
        this._repositorioPerfis.editarPerfil(perfil.id, perfil.nome, perfil.email);
    }

    inserirHashtag(postagem: PostagemAvancada, hashtag: string): void {
        if (postagem.existeHashtag(hashtag)) {
            throw new HashtagJaExisteError("Hashtag já existe.");
        }

        postagem.adicionarHashtag(hashtag);
    }

    criarPerfilAletorio(): Perfil {
        const nomes = [
            "Orca",
            "Crocodilo",
            "Urso marrom",
            "Urso polar",
            "Gorila",
            "Lobo cinzento",
            "Hipopótamo",
            "Dragão de Komodo",
            "Tubarão branco",
            "Hiena",
            "Tartaruga mordedora",
            "Leopardo",
            "Tigre siberiano",
            "Pantera negra",
            "Onça pintada",
            "Sucuri",
            "Águia cabeça branca",
            "Guepardo",
            "Leão",
        ];

        const dominios = ["gmail", "hotmail", "outlook"];

        const id = utils.gerarId();
        const nome = nomes[Math.floor(Math.random() * nomes.length)];
        const email = `${nome.replace(" ", "_")}@${
            dominios[Math.floor(Math.random() * dominios.length)]
        }.com`;

        return new Perfil(id, nome, email);
    }

    criarPostagemAleatoria(perfil: Perfil): Postagem {
        const textos = [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            "Nulla facilisi. Donec euismod, velit eget aliquam dapibus, odio urna elementum sapien, eget ultricies velit quam sit amet justo.",
            "Sed auctor, nisl eget aliquet ultricies, nunc elit aliquam velit, nec ultricies arcu nisl quis lectus.",
            "Sed vitae nisl et leo aliquet ultricies.",
            "vini vidi vici",
            "Etiam id nulla sit amet velit ultricies lacinia.",
            "Sed eget nulla et nisl aliquam aliquet.",
        ]

        const id = utils.gerarId();
        const texto = textos[Math.floor(Math.random() * textos.length)];
        const data = new Date();
        const tipo = utils.getNumber("Digite 0 para postagem normal ou 1 para postagem avançada: ");

        if (tipo === 0) {
            return new Postagem(id, texto, 0, 0, this.formatarData(data), perfil);
        } else if (tipo === 1) {
            const hashtags = ["#feliz", "#triste", "#depre", "#fome", "#sono", "#cansado", "#alegre", "#chateado", "#raiva", "#amor"];
            const hashtag = hashtags[Math.floor(Math.random() * hashtags.length)];

            return new PostagemAvancada(id, texto, 0, 0, this.formatarData(data), perfil, [hashtag], 100);
        } else {
            throw new InputInvalidoError("Tipo de postagem inválido.");
        }
    }

    // metodos tostring objetos
    toStringPostagem(postagem: Postagem): string {
        let texto =
            chalk.underline(
                "\n---------------- POSTAGEM ------------------------\n"
            ) +
            chalk.whiteBright("\nid postagem: ") +
            chalk.yellowBright(postagem.id) +
            chalk.whiteBright(`\n${postagem.perfil.nome}`) +
            chalk.gray(`\t@${postagem.perfil.nome}\n`) +
            `Postagem feita em: ${postagem.data}\n` +
            `Post: ` +
            chalk.greenBright(`"${postagem.texto}"\n`) +
            `Curtidas: ` +
            chalk.yellowBright(`${postagem.curtidas}, `) +
            `Descurtidas: ` +
            chalk.yellowBright(`${postagem.descurtidas}`) +
            "\n";

        if (postagem instanceof PostagemAvancada) {
            texto += "Hashtags: ";
            texto +=
                postagem.hashtags
                    .map((hashtag) => chalk.blue(`${hashtag}`))
                    .join(", ") + "\n";
            texto +=
                `Vizualizações restantes: ` +
                chalk.yellowBright(`${postagem.visualizacoesRestantes}`) +
                "\n";
        }

        texto += chalk.underline(
            "\n--------------- FIM DA POSTAGEM ------------------"
        );
        return texto;
    }

    toStringPerfil(perfil: Perfil) {
        let texto =
            chalk.underline(
                `\n -------------------- Perfil --------------------\n`
            ) +
            chalk.whiteBright(`\nid: `) +
            chalk.yellowBright(perfil.id) +
            chalk.whiteBright(`\nnome: `) +
            chalk.green(perfil.nome) +
            chalk.whiteBright(`\ne-mail: `) +
            chalk.red(perfil.email);

        return texto;
    }

    formatarData(data: Date): string {
        const dia = data.getDate().toString().padStart(2, "0");
        const mes = (data.getMonth() + 1).toString().padStart(2, "0");
        const ano = data.getFullYear();

        return `${dia}/${mes}/${ano}`;
    }

    // metodos arquivo para string

    toStringPerfilArquivo(perfil: Perfil) {
        return `${perfil.id};${perfil.nome};${perfil.email}`;
    }

    toStringPostagemArquivo(postagem: Postagem): string {
        let tipo = "p";

        if (postagem instanceof PostagemAvancada) {
            tipo = "pa";
        }

        let postagemString = `${tipo};${postagem.id};${postagem.texto};${postagem.curtidas};${postagem.descurtidas};${postagem.data};${postagem.perfil.id}`;

        if (postagem instanceof PostagemAvancada) {
            const hashtagsString = postagem.hashtags.join(",");
            postagemString += `;${hashtagsString};${postagem.visualizacoesRestantes}`;
        }

        return postagemString;
    }
}

export { RedeSocial };