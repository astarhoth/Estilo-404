
let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

const container = document.getElementById('carrinho-container');
const resumo = document.createElement('div');
resumo.className = 'resumo-pedido';

let produtosMap = {};

// Agrupa por ID e soma quantidades
carrinho.forEach(produto => {
  if (!produtosMap[produto.id]) {
    produtosMap[produto.id] = { ...produto, quantidade: 1 };
  } else {
    produtosMap[produto.id].quantidade++;
  }
});

const produtos = Object.values(produtosMap);

// Renderiza produtos
produtos.forEach((item, index) => {
  const div = document.createElement('div');
  div.className = 'item-carrinho';

  const totalItem = item.price * item.quantidade;

/*   div.innerHTML = `
    <img src="${item.image}" width="60">
    <div>
      <h4>${item.title}</h4>
      <p>R$ ${item.price.toFixed(2)}</p>
    </div>
    <div class="quantidade">
      <button class="menos" data-id="${item.id}">−</button>
      <span>${item.quantidade}</span>
      <button class="mais" data-id="${item.id}">+</button>
    </div>
    <p class="subtotal">R$ ${totalItem.toFixed(2)}</p>
    <button class="remover" data-id="${item.id}">✕</button>
  `; */
  div.innerHTML = `
  <img src="${item.image}" alt="${item.title}">
  <div class="info">
    <h4>${item.title}</h4>
    <p>R$ ${item.price.toFixed(2)}</p>
  </div>
  <div class="quantidade">
    <button class="menos" data-id="${item.id}">−</button>
    <span>${item.quantidade}</span>
    <button class="mais" data-id="${item.id}">+</button>
  </div>
  <p class="subtotal">R$ ${(item.price * item.quantidade).toFixed(2)}</p>
  <button class="remover" data-id="${item.id}">✕</button>
`;


  container.appendChild(div);
});

atualizarResumo();

// Eventos dos botões
document.querySelectorAll('.menos').forEach(btn =>
  btn.addEventListener('click', () => alterarQuantidade(btn.dataset.id, -1))
);
document.querySelectorAll('.mais').forEach(btn =>
  btn.addEventListener('click', () => alterarQuantidade(btn.dataset.id, 1))
);
document.querySelectorAll('.remover').forEach(btn =>
  btn.addEventListener('click', () => removerItem(btn.dataset.id))
);

function alterarQuantidade(id, delta) {
  const novoCarrinho = [];

  let alterado = false;
  for (let item of carrinho) {
    if (item.id == id && !alterado && delta !== 0) {
      if (delta === -1) {
        alterado = true;
        continue; // Remove 1 unidade
      }
    }
    novoCarrinho.push(item);
    if (delta === 1 && item.id == id && !alterado) {
      novoCarrinho.push(item); // Adiciona +1
      alterado = true;
    }
  }

  carrinho = novoCarrinho;
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  location.reload();
}

function removerItem(id) {
  carrinho = carrinho.filter(item => item.id != id);
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  location.reload();
}
/* 
function atualizarResumo() {
  const subtotal = carrinho.reduce((acc, item) => acc + item.price, 0);
  resumo.innerHTML = `
    <h2>Resumo do Pedido</h2>
    <p>Subtotal: R$ ${subtotal.toFixed(2)}</p>
    <p>Frete:</p>
    <div class="frete">
      <input type="text" id="cep" placeholder="Digite seu CEP">
      <button onclick="calcularFrete()">Calcular</button>
    </div>
    <hr>
    <p><strong>Total: R$ ${subtotal.toFixed(2)}</strong></p>
    <button class="btn-finalizar">Finalizar Compra</button>
  `;
  document.body.appendChild(resumo);
} */

function atualizarResumo() {
  const subtotal = carrinho.reduce((acc, item) => acc + item.price, 0);

  resumo.innerHTML = `
    <h2>Resumo do Pedido</h2>
    <p>Subtotal: R$ ${subtotal.toFixed(2)}</p>
    <p>Frete: <span id="frete-valor">R$ 0.00</span></p>
    <div class="frete">
      <input type="text" id="cep" placeholder="Digite seu CEP">
      <button onclick="calcularFrete()">Calcular</button>
    </div>
    <p>Forma de pagamento: </p>
    <input type="radio" id="Debito" name="pagamento" value="Debito">
    <label for="masc">Debito</label>

    <input type="radio" id="cred" name="pagamento" value="C">
    <label for="fem">Credito</label>

    <input type="radio" id="pix" name="pagamento" value="PiX">
    <label for="outro">Pix</label><br><br>
    <hr>
    <p><strong>Total: R$ <span id="total-geral">${subtotal.toFixed(2)}</span></strong></p>
    
    <a href="index.html">
    <button class="btn-finalizar">Finalizar Compra</button></a>
  `;
  const containerResumo = document.getElementById('container-resumo');
  containerResumo.innerHTML = ""; // limpa o conteúdo anterior
  containerResumo.appendChild(resumo);

}

async function calcularFrete() {
  const cep = document.getElementById('cep').value.trim();

  if (!cep || cep.length !== 8) {
    alert('Digite um CEP válido com 8 dígitos.');
    return;
  }

  try {
    const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const dados = await resposta.json();

    if (dados.erro) {
      alert('CEP não encontrado.');
      return;
    }

    // Simulação de valor de frete por estado
    const fretePorEstado = {
      'SP': 10.00,
      'RJ': 12.00,
      'MG': 14.00,
      'ES': 15.00,
      'BA': 18.00,
      'RS': 16.00,
      'PR': 14.00,
      'SC': 13.00,
      'DF': 20.00,
    };

    const frete = fretePorEstado[dados.uf] || 25.00;

    // Atualiza na tela
    document.getElementById('frete-valor').textContent = `R$ ${frete.toFixed(2)}`;

    const subtotal = carrinho.reduce((acc, item) => acc + item.price, 0);
    const total = subtotal + frete;

    document.getElementById('total-geral').textContent = total.toFixed(2);

  } catch (erro) {
    console.error('Erro ao buscar CEP:', erro);
    alert('Erro ao buscar o CEP.');
  }
}


// Cria os elementos do modal
const fundo = document.createElement('div');
fundo.className = 'fundo-escuro';

const mensagem = document.createElement('div');
mensagem.className = 'mensagem-final';
mensagem.innerHTML = `
  <h2>Compra Finalizada!</h2>
  <p>Obrigado pela sua compra 🎉</p>
  <button class="Fechar_mensagem"onclick="fecharMensagem()">Fechar</button>
`;

document.body.appendChild(fundo);
document.body.appendChild(mensagem);

// Evento do botão "Finalizar Compra"
document.addEventListener('click', function (e) {
  if (e.target.classList.contains('btn-finalizar')) {
    e.preventDefault();
    fundo.style.display = 'block';
    mensagem.style.display = 'block';
    // Aqui você pode limpar o carrinho se quiser:
    // localStorage.removeItem('carrinho');
  }
});

function fecharMensagem() {
  fundo.style.display = 'none';
  mensagem.style.display = 'none';
};

