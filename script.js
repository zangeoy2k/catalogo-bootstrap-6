const CATALOG_ITEMS = [
    {
        id: 1,
        título: "O Mistério da Floresta Negra",
        categoria: "Livros",
        detalhes: "Um romance policial envolvente que se passa nas profundezas da floresta negra",
        preco: "R$ 49,90",
        estoque: 15,
        autor: "Ana Clara Silva",
        lancamento: "2024"
    },
    {
        id: 2,
        título: "Vaso de Cerâmica Rústica",
        categoria: "Artesanato",
        detalhes: "Vaso decorativo, feito e pintado à mão, ideal para flores secas ou como peça central em mesas. Cada peça é única. Cor roxa vibrante com detalhes em ouro velho.",
        preco: "R$ 120,00",
        estoque: 3,
        material: "Argila Queimada e Tinta Acrílica",
        lancamento: "20cm x 15cm"
    },
    {
        id: 3,
        título: "Crônicas de Marte",
        categoria: "livros",
        detalhes: "Clássicos de ficção científica que explora a colonização  humana em Marte e seus dilemas éticos. Uma leitura obrigatória para fãs de gênero.",
        preco: "R$ 35,50",
        estoque: 22,
        autor: "Roberto Almeida",
        lancamento: "1998 (edição comemorativa)"
    },
    {
        id: 4,
        título: "Colar de Sementes Naturais",
        categoria: "aArtesanato",
        detalhes: "Colar sustentável feito com sementes de açaí de tucumã. Perfeito para um visual boêmio e natural. Fecho ajustável.",
        preco: "R$ 75,90",
        estoque: 8,
        autor: " Semente Naturais e Fio Encerada",
        lancamento: "2024"
    }
];

/** 
* Adiciona Listeners aos botões "Ver Detalhes" para popular o modal dinamicamente
*/
const modalElement = document.querySelector('#detalheModal');
const modalTitle = modalElement.querySelector('.modal-title');
const modalBody = modalElement.querySelector('.modal-body');
const modalAction = modalElement.querySelector('.btn-success');

// 1. Ouvinte para popular o modal ANTES de ser exibido
modalElement.addEventListener('show.bs.modal', function (event) {
    // Lê o atributo "data-item-id" que contém o ID do item clickado
    const button = event.relatedTarget;
    const itemId = parseInt(button.getAttribute('data-item-id'));
    //Procura pelo ID do item clickado no vetor "CATALOG_ITEMS"
    const item = CATALOG_ITEMS.find(i => i.id === itemId);
    
    // Se p item foi encontrado no vetor "CATALOG_ITEMS"
    if (item) {
        // Atualiza o Título do Modal
        modalTitle.textContent = item.título;
        
        // Cria o HTML de detalhes
        let detailsHTML = `
            <p class="mb-1"><strong>Categoria:</strong> <span class="badge bg-secondary">${item.categoria}</span></p>
            <p class="fs-4 fw-bold text-success mb-3">preço: ${item.preco}</p>
            <hr>
            <p>${item.detalhes}</p>
        `;
        
        // Adiciona campos específicos por categoria
        if (item.categoria === 'Livros') {
            detailsHTML += `<p><strong>Autor:</strong> ${item.autor}</p>`;
            detailsHTML += `<p><strong>Lançamento:</strong> ${item.lancamento}</p>`;
            detailsHTML += `<p class="text-info"><strong>Estoque Disponível:</strong> ${item.estoque} unidades</p>`;
        } else if (item.categoria === 'Artesanato') {
            detailsHTML += `<p><strong>Material:</strong> ${item.material}</p>`;
            detailsHTML +=  `<p class="text-info"><strong>Peças Exclusivas em Estoque:</strong> ${item.estoque}</p>`;
        }
        
        // Insere o HTML no corpo modal
        modalBody.innerHTML = detailsHTML;
        
        // Ao cklicar no botão "Adicionar  ao carrinho"
        modalAction.onclick = () => {
            console.log(`Ação Item '${item.título}' (ID: ${item.id}) adicionado ao carrinho. `);
            // Em uma aplicação real, você faria uma chamada de API aqui.
            // Para este exemplo, apenas fechamos o modal e mostramos o log.
            const bsModal = bootstrap.Modal.getInstance(modalElement);
            if(bsModal) bsModal.hide();
        };
    }
});

// 2. Ouvinte para a funcionalidade de busca (simples)
const searchInput = document.getElementById('seach-input');
const searchButton = document.getElementById('seach-button');
const items = document.querySelectorAll('.item-catalogo');

function executarPesquisa(event) {
    
}

// Adiciona evento ao clicar no botão "Buscar"
searchButton.addEventListener('click', executarPesquisa);
//Adiciona evento ao pressionar qualquer tecla no campo "buscar item"
searchImput.addEventListener('keyup', (event) => {
    // Permite buscar ao pressionar Enter
    if (event.key === 'Enter') {
        executarPesquisa(event);
    } else if (searchInput.ariaValueMax.trim()==="") {
        // Mostra todos os itens se a busca for apagada
        executarPesquisa(event);
    }
});
