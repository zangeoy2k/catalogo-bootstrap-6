const CATALOG_ITEMS = [
    {
        id: 1,
        título: "O Mistério da Floresta Negra",
        categoria: "Livros",
        detalhes: "Um romance policial envolvente que se passa nas profundezas da floresta negra",
        preço: "R$ 49,90",
        estoque: 15,
        autor: "Ana Clara Silva",
        lancamento: "2024"
    },
    {
        id: 2,
        título: "Vaso de Cerâmica Rústica",
        categoria: "Artesanato",
        detalhes: "Vaso decorativo, feito e pintado à mão, ideal para flores secas ou como peça central em mesas. Cada peça é única. Cor roxa vibrante com detalhes em ouro velho.",
        preço: "R$ 120,00",
        estoque: 3,
        material: "Argila Queimada e Tinta Acrílica",
        lancamento: "20cm x 15cm"
    },
    {
        id: 3,
        título: "Crônicas de Marte",
        categoria: "livros",
        detalhes: "Clássicos de ficção científica que explora a colonização  humana em Marte e seus dilemas éticos. Uma leitura obrigatória para fãs de gênero.",
        preço: "R$ 35,50",
        estoque: 22,
        autor: "Roberto Almeida",
        lancamento: "1998 (edição comemorativa)"
    },
    {
        id: 4,
        título: "Colar de Sementes Naturais",
        categoria: "aArtesanato",
        detalhes: "Colar sustentável feito com sementes de açaí de tucumã. Perfeito para um visual boêmio e natural. Fecho ajustável.",
        preço: "R$ 75,90",
        estoque: 8,
        autor: " Semente Naturais e Fio Encerada",
        lancamento: "2024"
    }
];

/** 
* Adiciona Listeners aos botões "Ver Detalhes" para popular o modal dinamicamente */
const modalElement = document.querySelector('#detalheModal');
const modalTitle = modalElement.querySelector('.modal-title');
const modalBody = modalElement.querySelector('.modal-body');

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
    }
});
