

function salvaLocalStorage (key, info) {
    localStorage.setItem(key ,JSON.stringify(info))
}

function lerLocalStorage (key){
    return JSON.parse(localStorage.getItem(key));
}

function deletarDoLocalStorage (key) {
    localStorage.removeItem(key);
}



// deletarDoLocalStorage('tarefas-concluidas')
// deletarDoLocalStorage('tarefa-adicionada')