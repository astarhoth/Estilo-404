fetch('https://fakestoreapi.com/products')
  .then(res => res.json())
  .then(products => {
    const container = document.getElementById('product-container');

    const titulosPersonalizados = [
      "Mochila azul",
      "Camisa de manga",
      "Casaco Bege",
      "Blusa Térmica Azul",
      "Pulseira Prateada Minimalista",
      "Anel de prata ",
      "Anel Estilo Gelo",
      "Brincos Rose Gold Charm",
      "HD Externo WD 2TB USB 3.0",
      "SSD SanDisk 1TB SATA III",
      "SSD Silicon Power 256GB NVMe",
      "HD Externo WD 4TB Gamer",
      "Monitor Acer 23.8” Full HD Ultra-Thin",
      "Monitor Curvo Samsung 49” CHG90 144Hz",
      "Jaqueta Roxa Feminina Inverno 3 em 1",
      "Jaqueta Biker Feminina Couro Sintético",
      "Capa de Chuva Feminina Azul Escuro",
      "Blusa Branca Gola Canoa Feminina",
      "Camiseta Vermelha Feminina Manga Curta",
      "Camiseta Vermelha Feminina Manga Curta"
    ];

    let tituloIndex = 0;

    // Exibir todos os produtos
    products.forEach(product => {
      const card = document.createElement('div');
      card.classList.add('product-card');

      const customizedTitle = titulosPersonalizados[tituloIndex] || product.title;
      tituloIndex++;

      card.innerHTML = `
        <img src="${product.image}" alt="${product.title}" width="100">
        <h3>${customizedTitle}</h3>
        <p>R$ ${product.price}</p>
        <button data-id="${product.id}" class="btn-add-carrinho">Adicionar ao carrinho</button>
      `;

      container.appendChild(card);
    });

    // Escutando cliques nos botões
    document.querySelectorAll('.btn-add-carrinho').forEach(botao => {
      botao.addEventListener('click', (event) => {
        const idProduto = event.target.getAttribute('data-id');
        const produtoSelecionado = products.find(p => p.id == idProduto);

        // Pegar carrinho atual do localStorage ou criar novo
        const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

        // Adicionar o produto
        carrinho.push(produtoSelecionado);

        // Salvar novamente no localStorage
        localStorage.setItem('carrinho', JSON.stringify(carrinho));

        alert(`✅ "${produtoSelecionado.title}" foi adicionado ao carrinho!`);
      });
    });
  });

// Função de busca
document.getElementById('busca').addEventListener('input', function () {
  const termo = this.value.toLowerCase();
  const cards = document.querySelectorAll('.product-card');

  cards.forEach(card => {
    const titulo = card.querySelector('h3').textContent.toLowerCase();
    card.style.display = titulo.includes(termo) ? '' : 'none';
  });
});
