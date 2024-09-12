const Biblioteca = require('../src/Trabalho01Turma02');

describe("Testes da classe Biblioteca", () => {
    let biblio;

    const livro = {
        id: 1,
        autor: "Stephen King",
        titulo: "It, a coisa",
        genero: 'Terror',
        ano: "1986",
        idMembro: null,
        emprestado: false
    }

    const membro = {
        id: 1,
        nome: "Thiago"
    }

    beforeEach(() => {
        biblio = new Biblioteca();
        biblio.adicionarLivro(livro);
        biblio.adicionarMembro(membro);
    })

    describe("CRUD de livros", () => {

        test("Adicionar livro", () => {
            const novoLivro = {
                id: 2,
                autor: "George R R Martin",
                titulo: "Cronicas de Gelo e Fogo",
                genero: 'Fantasia',
                ano: "1996",
                idMembro: null,
                emprestado: false
            };

            biblio.adicionarLivro(novoLivro);

            expect(biblio.listarLivros()).toContainEqual(novoLivro);
        })

        test("Remover livro", () => {
            biblio.removerLivro(1);

            expect(biblio.listarLivros()).toEqual([]);
        })

        test("Buscar livro por id", () => {
            expect(biblio.buscarLivroPorId(1)).toEqual(livro)
        })

        test("Buscar livro por título", () => {
            expect(biblio.buscarLivroPorTitulo("It, a coisa")).toContainEqual(livro)
        })

        test("Listar livros", () => {
            expect(biblio.listarLivros()).toContainEqual(livro)
        })

        test("Atualizar livro", () => {
            novosDados = {
                titulo: "Novo Nome",
            }

            biblio.atualizarInformacaoLivro(1, novosDados)

            expect(biblio.buscarLivroPorId(1)).toEqual({
                ano: "1986",
                autor: "Stephen King",
                emprestado: false,
                genero: "Terror",
                id: 1,
                idMembro: null,
                titulo: "Novo Nome",
            })
        })
    })

    describe("CRUD de membros", () => {

        test("Adicionar membro", () => {
            const novoMembro = {
                id: 1,
                nome: "Thiago"
            }

            biblio.adicionarMembro(novoMembro);

            expect(biblio.listarMembros()).toContainEqual(novoMembro);
        })

        test("Remover membro", () => {
            biblio.removerMembro(1);

            expect(biblio.listarMembros()).toEqual([]);
        })

        test("Buscar membro por id", () => {
            expect(biblio.buscarMembroPorId(1)).toEqual(membro)
        })

        test("Listar membros", () => {
            expect(biblio.listarMembros()).toContainEqual(membro)
        })
    })

    describe("Funções de emprestimo de livros", () => {

        test("Emprestar livro", () => {
            biblio.emprestarLivro(1,1)

            expect(biblio.listarLivrosEmprestados()).toContainEqual(livro)
        })

        test("Devolver livro", () => {
            biblio.emprestarLivro(1,1)
            biblio.devolverLivro(1)

            expect(biblio.listarLivrosDisponiveis()).toContainEqual(livro)
        })
    })

    describe("Listagem geral de livros", () => {

        test("Listar livros emprestados", () => {
            expect(biblio.listarLivrosEmprestados()).toEqual([])
        })

        test("Listar livros disponíveis", () => {
            expect(biblio.listarLivrosDisponiveis()).toEqual([livro])
        })

        test("Contar livros", () => {
            expect(biblio.contarLivros()).toEqual(1)
        })

        test("Listar livros por autor", () => {
            expect(biblio.listarLivrosPorAutor('Stephen King')).toContainEqual(livro)
        })

        test("Listar livros por genero", () => {
            expect(biblio.listarLivrosPorGenero('Terror')).toContainEqual(livro)
        })

        test("Listar livros por ano", () => {
            expect(biblio.listarLivrosPorAno('1986')).toContainEqual(livro)
        })
    })

    describe("Contagem de membros", () => {
        test("Contagem de membros", () => {
            expect(biblio.contarMembros()).toEqual(1)
        })
    })
})