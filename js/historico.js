
const mostrarTarefasNoHistorico = () => {

    const tarefasConcluidas = lerLocalStorage('tarefas-concluidas') ?? {};
    const tarefasHistoricoContainer = document.querySelector('#historico-container');
    const tarefasNoHistoricoVazia = document.querySelector('.historico__vazio');

    try{
        for(const tarefa of tarefasConcluidas){
            const dataConclusao = new Date();
            const tarefasNoHistorico = tarefasHistoricoContainer.querySelector('#tarefas-no-historico');
            const tarefasHistoricoDiv = document.createElement('div');
            tarefasHistoricoDiv.classList.add('tarefa__in_historico');
            const tarefaHistoricoConteudo = `
            
               
                <h2 id = "tarefa-no-historico-${tarefa.descricao}">
            Descricão: ${tarefa.descricao}
                </h2>

            <h3>
                 Data de Conclusão: ${formatarData(dataConclusao)}
            </h3>
            `;
            tarefasHistoricoDiv.innerHTML = tarefaHistoricoConteudo;
            tarefasNoHistorico.appendChild(tarefasHistoricoDiv);

            if(tarefasNoHistorico.length !== 0){
                tarefasNoHistoricoVazia.classList.add('is-not-empty');
            } else {
                tarefasNoHistoricoVazia.classList.remove('is-not-empty');
            }
        }


    } catch (e){
        console.log(`Nada aqui ainda!: ${e}`)
    }

}

const formatarData = (data) => {
    const dia = data.getDate();
    const mes = data.getMonth() + 1; 
    const ano = data.getFullYear();
    const hora = data.getHours();
    const minutos = data.getMinutes();

    return `${dia}/${mes}/${ano} ${hora}:${minutos}`;
};

const limparHistorico = () => {

    const limparHistorico = () => {
        const tarefasConcluidas = lerLocalStorage('tarefas-concluidas') || [];
        const dataAtual = new Date();
        const dataLimite = new Date(dataAtual);
        dataLimite.setDate(dataLimite.getDate() - 7);
    
        const tarefasNoHistoricoContainer = document.querySelector('#tarefas-no-historico');
    
        const tarefasFiltradas = tarefasConcluidas.filter((tarefa) => {
            const dataConclusao = new Date(tarefa.dataConclusao);
            return dataConclusao >= dataLimite;
        });
    
        tarefasNoHistoricoContainer.innerHTML = '';
    

        for (const tarefa of tarefasFiltradas) {
            const tarefaHistoricoDiv = document.createElement('div');
            tarefaHistoricoDiv.classList.add('tarefa__in_historico');
            const tarefaHistoricoConteudo = `
                <h2 id="tarefa-no-historico-${tarefa.descricao}">
                    Descricão: ${tarefa.descricao}
                </h2>
                <h3>
                    Data de Conclusão: ${formatarData(new Date(tarefa.dataConclusao))}
                </h3>
            `;
            tarefaHistoricoDiv.innerHTML = tarefaHistoricoConteudo;
            tarefasNoHistoricoContainer.appendChild(tarefaHistoricoDiv);
        }
    
        salvaLocalStorage('tarefas-concluidas', tarefasFiltradas);
    }

}

mostrarTarefasNoHistorico();
limparHistorico();