function gerarTabela() {
    let container = document.getElementById("container");

    let table = document.createElement("table");
    table.setAttribute("id", "tab");

    // criando um array com os nomes das colunas
    cols = ["Nome", "Email", "Cidade", "Telefone"];

    let line = document.createElement("tr");
    
    for(i = 0; i < cols.length; i++) {
        let th = document.createElement("th");
        th.innerText = cols[i];
        line.appendChild(th);
    }
    table.appendChild(line); 

    for(i = 0; i < 10; i++) {
        let line = document.createElement("tr")
        for(j = 0; j < cols.length; j++) {
            let td = document.createElement("td")
            td.innerText = "texto " + j
            line.appendChild(td)
        }
        table.appendChild(line);
    }
    container.appendChild(table);
}

function formToJson() {
    //...
}