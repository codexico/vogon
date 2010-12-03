#language: pt

Funcionalidade: Produtos
    Para escolher um produto
    Como um usuário do sistema
    Eu quero buscar fazer uma busca
    
        Cenário: Inicio da app
            Dado que estou na pagina inicial
            Entao eu deveria ver "Buscar produto"

        @javascript    
        Cenário: Buscando um produto inexistente
            Dado que estou na pagina inicial
            E preencho o campo "txtSearch" com "asdfasdfasdfadsfasdfasdf"
            E aperto o botao "Buscar"
            Entao eu deveria ver "tente novamente"
            
        @javascript    
        Cenário: Buscando um produto
            Dado que estou na pagina inicial
            E preencho o campo "txtSearch" com "wii"
            E aperto o botao "Buscar"
            Entao eu deveria ver "Nintendo Wii"
            E eu deveria ver "Ver detalhes"
            
        @javascript    
        Cenário: Buscando detalhes
            Dado que estou na pagina inicial
            E preencho o campo "txtSearch" com "macbook"
            E aperto o botao "Buscar"
            E clico em "Ver detalhes"
            Entao eu deveria ver "Detalhes do Produto:"
            
        @javascript    
        Cenário: Criando um alerta
            Dado que estou na pagina inicial
            E preencho o campo "txtSearch" com "wii"
            E aperto o botao "Buscar"
            Entao eu deveria ver "Nintendo Wii"
            E preencho o campo "user[email]" com "adsf@adsf.com"
            E preencho o campo "alerta[valor]" com "123"
            E aperto o botao "Enviar"
            Entao eu deveria ver "OK, assim que o produto atingir este valor um email será enviado"
