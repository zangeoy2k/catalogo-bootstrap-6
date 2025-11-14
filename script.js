const CATALOG_ITEMS = [
    {
        id: 1,
        titulo: "O Mistério da Floresta Negra",
        categoria: "Livros",
        detalhes: "Um romance policial envolvente que se passa nas profundezas da floresta negra",
        preco: "R$ 49,90",
        estoque: 15,
        autor: "Ana Clara Silva",
        lancamento: "2024"
    },
    {
        id: 2,
        titulo: "Vaso de Cerâmica Rústica",
        categoria: "Artesanato",
        detalhes: "Vaso decorativo, feito e pintado à mão, ideal para flores secas ou como peça central em mesas. Cada peça é única. Cor roxa vibrante com detalhes em ouro velho.",
        preco: "R$ 120,00",
        estoque: 3,
        material: "Argila Queimada e Tinta Acrílica",
        lancamento: "20cm x 15cm"
    },
    {
        id: 3,
        titulo: "Crônicas de Marte",
        categoria: "Livros",
        detalhes: "Clássicos de ficção científica que explora a colonização  humana em Marte e seus dilemas éticos. Uma leitura obrigatória para fãs de gênero.",
        preco: "R$ 35,50",
        estoque: 22,
        autor: "Roberto Almeida",
        lancamento: "1998 (edição comemorativa)"
    },
    {
        id: 4,
        titulo: "Colar de Sementes Naturais",
        categoria: "Artesanato",
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
        modalTitle.textContent = item.titulo;
        
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
            // Em uma aplicação real, você faria uma chamada de API aqui.
            // Para este exemplo, apenas fechamos o modal e mostramos o log.
            adicionarItemCarrinho(item.id);
             console.log(`Ação: Item '${item.titulo}' (ID: ${item.id}) adicionado ao carrinho. `);
            const bsModal = bootstrap.Modal.getInstance(modalElement);
            if(bsModal) bsModal.hide();
        };
    }
});

// 2. Ouvinte para a funcionalidade de busca (simples)
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const items = document.querySelectorAll('.item-catalogo');

function executarPesquisa(event) {
    // Previne o envio do formulário para o servidor (back-end)
    event.preventDefault();
    // Obtém o valor do campo de busca em letras minúsculas (.tolowerCase())
    const query = searchInput.value.toLowerCase().trim();
    
    // Para cada item do catálogo (quatro itens)
    items.forEach(item => {
        // Obtém o título e o nome da categoria do item atual em letras minúsculas (.tolowerCase())
        const title = item.querySelector('.card-title').textContent.toLowerCase();
        const category = item.getAttribute('data-categoria').toLowerCase();
        
        // Verifica se o título ou a categoria do item atual incluem o valor digitado no campo de busca (query)
        // Se o valor do campo de busca (query === "") for em branco, exibe todos os itens
        if (title.includes(query) || category.includes(query) || query === "") {
            item.style.display = 'block'; // Mostra o item
        } else {
            item.style.display = 'none'; // Esconde o item
        }
    });
}





// Adiciona evento ao clicar no botão "Buscar"
searchButton.addEventListener('click', executarPesquisa);
//Adiciona evento ao pressionar qualquer tecla no campo "buscar item"
searchInput.addEventListener('keyup', (event) => {
    // Permite buscar ao pressionar Enter
    if (event.key === 'Enter') {
        executarPesquisa(event);
    } else if (searchInput.value.trim()==="") {
        // Mostra todos os itens se a busca for apagada
        executarPesquisa(event);
    }
});

// 3. Atualiza os itens do catálogo ao carregar o HTML da página
items.forEach((card, index) => {
    const img = card.querySelector('img');
    const title = card.querySelector('.card-title');
    const category = card.querySelectorAll('.card-text')[0];
    const description = card.querySelectorAll('.card-text')[1];
    
    const item = CATALOG_ITEMS.find(i => i.id === (index + 1));
    
    if (item) {
        // Atualiza o texto da imagem do cartão com a categoria do item
        img.src = img.src.replace(/\?text=(.*)/, "?text=" + item.categoria.toUpperCase());
        // Atualiza o texto do título do cartão
        title.textContent = item.titulo;
        // Atualiza a categoria do item
        category.textContent = "Categoria: " + item.categoria;
        // Atualiza a descrição do item
        description.textContent = item.detalhes;
        
    }
});

//4. Adiciona funcionalidade de cookies (persistência) dos itens adicionados ao carrinho
// (mantém os produtos adicionados ao carrinho mesmo ao fechar ou atualizar a página)
const CART_STORAGE_KEY = 'shopping_cart';

function obterCarrinhoDoNavegador() {
    // Tenta ler o cookie do navegador
    try {
        const cookie = localStorage.getItem(CART_STORAGE_KEY);
        if (cookie) {
            // Se existir, retorna o cookie
            return JSON.parse(cookie);
        }
    } catch (e) {
        console.error("Falha ao ler o cookie do armazenamento local.")
    }
    // Retorna um vetor vaziuo em caso de falha
    return [];
}

function salvarCookieCarrinho(itensCarrinho) {
    try {
        // Salva os itens do carrinho em formato JSON no navegador.
        // Ex: ao adicionar o item com ID '2' e '3' ao carrinho, CART_STORAGE_KEY = {2,3}
        //Você pode visualizar os itens salvos no navegador Web em:
        // Botão direito na página > Inspencionar > Application > Storage > Local storage
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(itensCarrinho));
    } catch (e) {
        console.error("ERRO: Falha ao salvar carrinho no navegador. Erro: ", e);
    }
}

function atualizarContadorCarrinho() {
    // Obtém os itens no carrinho
    const carrinho = obterCarrinhoDoNavegador();
    // Obtém o elemento HTML que exibe o número de itens no carrinho
    const carrinhoBadge = document.getElementById("cart-count");
    
    // Se o elemento que exibe o número de itens no carrinho (badge) existe
    if (carrinhoBadge) {
        // Atualiza o badge do carrinho com o número de itens no carrinho
        carrinhoBadge.textContent = carrinho.length;
        
        if (carrinho.length > 0) {
            // Remove a classe Bootstrap 'd-none' (CSS: 'display: none;') para exibir o badge
            carrinhoBadge.classList.remove('d-none');
        } else {
            // Adiciona a classe Bootstrap 'd-none' (CSS: 'display: none;') para ocultar o badge
            carrinhoBadge.classList.add('d-none');
            
        }
    }
}

function adicionarItemCarrinho(itemId) { // Obtém os itens atuais do carrinho
    const carrinho = obterCarrinhoDoNavegador();
    carrinho.push(itemId); // Adiciona o ID do item recebido como parâmetro da função ao carrinho
    salvarCookieCarrinho(carrinho); // Atualiza o carrinho
    atualizarContadorCarrinho(); // Atualiza o número de itens no HTML do carrinho da navbar
}

// Carrega o número de itens no carrinho ao carregar a página HTML
atualizarContadorCarrinho();