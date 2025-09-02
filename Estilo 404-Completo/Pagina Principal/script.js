fetch('https://fakestoreapi.com/products')
  .then(res => res.json())
  .then(products => {
    const container = document.getElementById('product-container');

    const titulosPersonalizados = [
      "Mochila azul",
      "Camisa de manga",
      "Bracelete dragão",
      "Anel de prata",
      "SSD Externo",
      "SSD Interno ",
      "Jaqueta Roxa",
      "Jaqueta Preta"
    ];

    let tituloIndex = 0;

    const produtosPorCategoria = products.reduce((acc, product) => {
      if (!acc[product.category]) {
        acc[product.category] = [];
      }
      acc[product.category].push(product);
      return acc;
    }, {});

    Object.keys(produtosPorCategoria).forEach(categoria => {
      const doisProdutos = produtosPorCategoria[categoria].slice(0, 2);

      doisProdutos.forEach(product => {
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
document.getElementById('busca').addEventListener('input', function () {
  const termo = this.value.toLowerCase();
  const cards = document.querySelectorAll('.product-card');

  cards.forEach(card => {
    const titulo = card.querySelector('h3').textContent.toLowerCase();
    card.style.display = titulo.includes(termo) ? '' : 'none';
  });
});
