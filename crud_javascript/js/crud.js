// pegando os dados de usuário
let usuarios = users;

// adiciona um novo id na lista de usuários
let novoId = users.length + 1;

// gera HTML da tabela de usuarios

function gerarTabelaUsuarios() {

    let tab = document.getElementById('tab');

    // se existir uma tabela antiga exclua
    if(tab) {
        tab.remove();
    }

    // criando a tabela
    let tabela = document.createElement("table");
    tabela.setAttribute("id", "tab");

    // criando o cabeçalho na tabela
    let cabecalho = tabela.createTHead();
    let linhaCabecalho = cabecalho.insertRow(); // testando parametro

    // pega o nome das chaves do objeto json (colunas da tabela)
    let chaves = Object.keys(usuarios[0]);
    let colunas = chaves;
    colunas.forEach(coluna => {
        let th = document.createElement('th');
        th.textContent = coluna;
        linhaCabecalho.appendChild(th);
    });

    //criando o corpo da tabela
    let corpo = tabela.createTBody();
    usuarios.forEach(usuario => {
        let linha = corpo.insertRow();
        Object.values(usuario).forEach(valor => {
            let cell = linha.insertCell();
            cell.textContent = valor;
        })
    });

    let divtab = document.getElementById("divtab");
    divtab.appendChild(tabela);

}

// adiciona na tabela a coluna CRUD
function adicionarColunaCRUD() {
    const btns = ["Editar", "Excluir"];
    let tabela = document.getElementById("tab");
    let thead = tabela.getElementsByTagName("thead")[0];
    let tbody = tabela.getElementsByTagName("tbody")[0];

    // adicionar o cabecalho da nova coluna
    let novaCelulaCabecalho = document.createElement('th');
    novaCelulaCabecalho.textContent = "Ações";
    thead.rows[0].appendChild(novaCelulaCabecalho);

    // cria os botões e as linhas da tabela
    for (i = 0; i < tbody.rows.length; i++) {
        let novaCelula = tbody.rows[i].insertCell(-1);

        btns.forEach(btn => {
            const createButton = document.createElement("button");
            if (btn == "Editar") {
                createButton.setAttribute("onclick", "editarLinha(this)");
            } else {
                createButton.setAttribute("onclick", "excluirUsuario(this)");
            }
            createButton.textContent = btn;
            novaCelula.appendChild(createButton);
        })
    }
}

// limpa os inputs do form
function limpaFormulario() {
    // pega todos os inputs do form
    const inputs = document.querySelectorAll('input');

    // itera pelo array dos inputs limpando o campo
    inputs.forEach(input => {
        input.value = "";
    });
}

// captura o botão da linha em que o botao foi clicado
function editarLinha(button) {
    // pega a tr da linha do botao
    const linha = button.closest("tr");

    // pega todas as celulas da linha
    const colunas = linha.getElementsByTagName("td");

    // cria um objeto json para transferir os dados do usuário
    const user = {
        id: colunas[0].textContent,
        nome: colunas[1].textContent,
        email: colunas[2].textContent,
        cidade: colunas[3].textContent,
        telefone: colunas[4].textContent
    };

    console.log(user);
    jsonToForm(user);

    // Posiciona a página com o scrool mostrando o formulário
    var section = document.querySelector('.container');
    section.scrollIntoView({ behavior: 'smooth' });

}

// atualiza a tabela e a coluna do CRUD
function atualizaTabela() {
    // Limpa os inputs do form
    limpaFormulario();
    // chama a função que gera a tabela novamente quando o usuários é atualizado
    gerarTabelaUsuarios();
    // chama a funçao que adiciona a coluna do CRUD
    adicionarColunaCRUD();
}

function jsonToForm(user) {
    for (const key in user) {
        const input = document.querySelector(`[name="${key}"]`);
        if (input) {
            input.value = user[key];
        }
    }
}

// transfere os dados do formulário para um user json
// transfere o user para o array de usuarios
// valida os dados da tabela
function formToJSON(event) {
    // não executar o submit do form
    event.preventDefault();

    let user = { id: "", nome: "", email: "", cidade: "", telefone: "" };

    // Seleciona todos os inputs do form
    const inputs = document.querySelectorAll('input');

    // pegue os valores dos inputs e transfere para o objeto json user
    inputs.forEach(input => {
        user[input.name] = input.value;
    });

    if(user.id != "") {
        let index = usuarios.findIndex(usuario => usuario.id === user.id);

        if(index !== -1) {
            usuarios[index] = user;
        }
    } else {
        inserirUsuario(user);
    }

    //inserirUsuario(user);
    console.log(user);
    atualizaTabela();
}

// insere o usuário no array json
function inserirUsuario(user) {
    user.id = novoId.toString();
    novoId += 1;
    usuarios.push(user);
}

function excluirUsuario(button) {
    // Pega a linha em que o botão foi clicado
    const linha = button.closest('tr');
    // Pega todas as colunas da linha
    const colunas = linha.getElementsByTagName('td');
    // Pega o ID do usuário
    const userId = colunas[0].textContent;
    // Percorre o array de usuários encontrar o usuario pelo ID
    const index = usuarios.findIndex(user => user.id === userId);
    console.log("Excluindo:" + index);

    if(index !== -1) {
        usuarios.splice(index, 1);
        atualizaTabela();
        console.log(`Usuário com o id ${userId} excluido com sucesso.`);
    } else {
        console.log(`Usuário com o id ${userId} não encontrado`);
    }
}