  let usuarios = [];

  // Função para carregar os usuários do localStorage e exibir na tabela
  function carregarUsuarios() {
    usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    exibirUsuarios(usuarios);
  }

  // Função que preenche a tabela com os usuários passados
  function exibirUsuarios(lista) {
    const tabela = document.getElementById("tabelaUsuarios");
    tabela.innerHTML = ""; // Limpa a tabela antes de preencher

    lista.forEach((usuario, index) => {
      const row = tabela.insertRow();
      row.innerHTML = `
        <td data-label="ID">${index + 1}</td>
        <td data-label="NOME">${usuario.nome}</td>
        <td data-label="EMAIL">${usuario.email}</td>
        <td data-label="SENHA">${usuario.senha}</td>
        <td data-label="CEP">${usuario.cep}</td>
        <td data-label="ENDEREÇO">${usuario.rua}, ${usuario.bairro}, ${usuario.cidade}, ${usuario.estado}</td>
        <td data-label="AÇÕES" onclick="removerUsuario(${index})">🗑️</td>
      `;
    });
  }

  // Função para remover um usuário
  function removerUsuario(index) {
    if (confirm("Tem certeza que deseja remover este usuário?")) {
      usuarios.splice(index, 1);
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
      carregarUsuarios(); // Atualiza a tabela
    }
  }

  // Evento quando a página carrega
 document.addEventListener("DOMContentLoaded", () => {
  carregarUsuarios();

  const campoBusca = document.getElementById("buscar");

  campoBusca.addEventListener("input", () => {
    const termo = campoBusca.value.toLowerCase();

    const filtrados = usuarios.filter(usuario =>
      (usuario.nome || "").toLowerCase().includes(termo) ||
      (usuario.email || "").toLowerCase().includes(termo) ||
      (usuario.cep || "").toLowerCase().includes(termo) ||
      (usuario.rua || "").toLowerCase().includes(termo) ||
      (usuario.bairro || "").toLowerCase().includes(termo) ||
      (usuario.cidade || "").toLowerCase().includes(termo) ||
      (usuario.estado || "").toLowerCase().includes(termo)
    );

    exibirUsuarios(filtrados);
  });
});


