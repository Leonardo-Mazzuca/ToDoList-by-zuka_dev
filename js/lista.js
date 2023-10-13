
const btnAdicionarTarefa = document.querySelector('.btn__adicionar');

const inputElementTarefa = document.querySelector('#add-tarefa');

const tarefaVazia = document.querySelector('.tarefa__vazia');

const containerTarefas = document.querySelector('.tarefas__adicionadas');

const tarefasConcluidas = [];

const tarefasAdicionadas = [];

const tarefasSalvas = lerLocalStorage('tarefa-adicionada') ?? [];

let nextId = 1;


const validaInput = () => {

    const mensagemError = document.querySelector('.mensagem__error');

    if (inputElementTarefa.value.length === 0) {
        inputElementTarefa.classList.add('on-error');
        mensagemError.classList.add('on-error');
        setTimeout(() => {
            mensagemError.classList.remove('on-error');
        },2000)

        return false;
    } else {
        inputElementTarefa.classList.remove('on-error');
        return true;
    }
}

function criarIdUnico() {
    return `tarefa-id-${Date.now()}`;
  }

const adicionaTarefa = () => {

    if(validaInput()){
        tarefaVazia.classList.add('is-hidden');
        

        const tarefaAdicionada = document.createElement('article');
        tarefaAdicionada.classList.add('tarefa__adicionada');

        tarefaAdicionada.id = criarIdUnico();

        const tarefaAdicionadaConteudo = ` 
        
            <div class="tarefa__descricao">
            <p class="tarefa__content-${tarefaAdicionada.id}">
                ${inputElementTarefa.value}

                <span class = 'is-complete-icon'><i class="fa-solid fa-check"></i> </span>
            </p>
        </div>
        <div class="button__box">
            <button id="concluir-tarefa-${tarefaAdicionada.id}" class="concluir__btn">
                <i class="fa-solid fa-circle-check"></i>
            </button>
            <button id="retirar-tarefa${tarefaAdicionada.id}" class="retirar__btn">
                <i class="fa-solid fa-trash-can"></i>
            </button>
            <button id="marcar-tarefa-${tarefaAdicionada.id}" class = "marcar__btn">
            <i class="fa-regular fa-star marcar-tarefa-${tarefaAdicionada.id}"></i>
            </button>
        </div>
        
        `;
        tarefasAdicionadas.push({
            id: tarefaAdicionada.id,
            marcada : false,
            descricao: inputElementTarefa.value,
        });


        tarefaAdicionada.innerHTML = tarefaAdicionadaConteudo;
        containerTarefas.appendChild(tarefaAdicionada);

        document.getElementById(`concluir-tarefa-${tarefaAdicionada.id}`).addEventListener('click', () => {
            concluiTarefa(tarefaAdicionada.id);
        })

        document.getElementById(`retirar-tarefa${tarefaAdicionada.id}`).addEventListener('click',() => removeTarefa ( tarefaAdicionada.id))

        document.getElementById(`marcar-tarefa-${tarefaAdicionada.id}`).addEventListener('click', () => marcarTarefa(tarefaAdicionada.id));

        inputElementTarefa.value = '';

        salvaLocalStorage('tarefa-adicionada', tarefasAdicionadas);

    } 

}

const removeTarefa = (idTarefa) => {
    const tarefaParaRemover = document.getElementById(idTarefa);
  
    if (tarefaParaRemover) {
      tarefaParaRemover.remove();
  
      const index = tarefasAdicionadas.findIndex(item => item.id === idTarefa);
      if (index !== -1) {
        tarefasAdicionadas.splice(index, 1);
      }
  
      if (verificaTarefasVazias()) {
        tarefaVazia.classList.remove('is-hidden');
      }
  
    }
    salvaLocalStorage('tarefa-adicionada', tarefasAdicionadas);

  }

const concluiTarefa = (idTarefa) => {

    const tarefaConluida = document.getElementById(idTarefa);
    const btnConcluir = document.getElementById(`concluir-tarefa-${idTarefa}`);
    const btnMarcar = document.getElementById(`marcar-tarefa-${idTarefa}`);
    const iconeStar = document.querySelector(`.marcar-tarefa-${idTarefa}`);

    const descricaoTarefa = tarefaConluida.querySelector(`.tarefa__content-${idTarefa}`);

    btnMarcar.classList.add('is-complete');
    btnConcluir.classList.add('is-complete');
    tarefaConluida.marcada = false;

        if (tarefaConluida){
            tarefaConluida.classList.add('is-complete');
            const tarefaDescricaoElement = descricaoTarefa.innerText;
            if(tarefaDescricaoElement){
                tarefasConcluidas.push({
                    id : idTarefa,
                    descricao : tarefaDescricaoElement,
                });
            }
            salvaLocalStorage('tarefas-concluidas', tarefasConcluidas);
        } 

        if(!tarefaConluida.marcada){
            if(iconeStar.classList.contains('fa-solid')){
                iconeStar.classList.remove('fa-solid');
            }
        }

}

const marcarTarefa = (idTarefa) => {
    const tarefaParaMarcar = tarefasAdicionadas.find((tarefa) => tarefa.id === idTarefa);
    const iconeStar = document.querySelector(`.marcar-tarefa-${idTarefa}`);
    if (tarefaParaMarcar) {
        tarefaParaMarcar.marcada = true;
        iconeStar.classList.toggle('fa-solid');
        
        if(!iconeStar.classList.contains('fa-solid')){
            tarefaParaMarcar.marcada = false;
        }

    }
    reordenarTarefasMarcadas();
};

const reordenarTarefasMarcadas = () => {
    const tarefasMarcadas = tarefasAdicionadas.filter((tarefa) => tarefa.marcada);

    tarefasMarcadas.forEach((tarefa) => {
        const tarefaParaReordenar = document.getElementById(tarefa.id);
        if (tarefaParaReordenar) {
            containerTarefas.insertBefore(tarefaParaReordenar, containerTarefas.firstChild);
        }
    });
    salvaLocalStorage('tarefa-adicionada', tarefasAdicionadas);
};


const verificaTarefasVazias = () => {
    return tarefasAdicionadas.length === 0;
    
}

const irParaHistorico = () =>{
    window.location.href = window.location.origin + '/historico.html';
}

const manterDadosNaPaginaAoReload = () => {
    try {
        for (const tarefaSalva of tarefasSalvas) {
            tarefaVazia.classList.add('is-hidden');
            const tarefaAdicionada = document.createElement('article');
            tarefaAdicionada.classList.add('tarefa__adicionada');
            tarefaAdicionada.id = tarefaSalva.id;

            const tarefaAdicionadaConteudo = `
                <div class="tarefa__descricao">
                    <p class="tarefa__content-${tarefaAdicionada.id}">
                        ${tarefaSalva.descricao}
                        <span class='is-complete-icon'><i class="fa-solid fa-check"></i></span>
                    </p>
                </div>
                <div class="button__box">
                    <button id="concluir-tarefa-${tarefaAdicionada.id}" class="concluir__btn">
                        <i class="fa-solid fa-circle-check"></i>
                    </button>
                    <button id="retirar-tarefa-${tarefaAdicionada.id}" class="retirar__btn">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                    <button id="marcar-tarefa-${tarefaAdicionada.id}" class="marcar__btn">
                        <i class="fa-regular fa-star marcar-tarefa-${tarefaAdicionada.id}"></i>
                    </button>
                </div>
            `;

            tarefasAdicionadas.push({
                id: tarefaAdicionada.id,
                marcada : false,
                descricao: tarefaSalva.descricao,
            });

            tarefaAdicionada.innerHTML = tarefaAdicionadaConteudo;
            containerTarefas.appendChild(tarefaAdicionada);

            document.getElementById(`concluir-tarefa-${tarefaAdicionada.id}`).addEventListener('click', () => {
                concluiTarefa(tarefaAdicionada.id);
            });

            document.getElementById(`retirar-tarefa-${tarefaAdicionada.id}`).addEventListener('click', () => {
                removeTarefa(tarefaAdicionada.id);
            });

            document.getElementById(`marcar-tarefa-${tarefaAdicionada.id}`).addEventListener('click', () => {
                marcarTarefa(tarefaAdicionada.id);
            });
        }
    } catch (e) {
        console.log(`Nada aqui ainda!: ${e}`);
    }

}

const btnHistorico = document.querySelector('#direcionar-historico');
btnHistorico.addEventListener('click', irParaHistorico);

btnAdicionarTarefa.addEventListener('click', () => {
    adicionaTarefa();
});

inputElementTarefa.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        adicionaTarefa();
    }
});

manterDadosNaPaginaAoReload();