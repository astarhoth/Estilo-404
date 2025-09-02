document.addEventListener('DOMContentLoaded', function () {
  const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
  if (!usuarioLogado) {
    alert('Nenhum usuário logado. Faça login primeiro.');
    window.location.href = 'login.html'; // ou redirecione conforme necessário
    return;
  }

  // Seleciona os inputs
  const form = document.querySelector('#infoConta .form');
  const nomeInput = form.querySelector('input[placeholder="Digite seu nome"]');
  const emailInput = form.querySelector('input[placeholder="Digite seu email"]');
  const senhaInput = form.querySelector('input[placeholder="Digite a sua senha"]');
  const cepInput = form.querySelector('input[placeholder="00000-000"]');
  const ruaInput = form.querySelector('input[placeholder="Rua"]');
  const bairroInput = form.querySelector('input[placeholder="Nome do bairro"]');
  const cidadeInput = form.querySelector('input[placeholder="Nome da cidade"]');
  const estadoInput = form.querySelector('input[placeholder="Nome do estado"]');

  // Preenche os campos com os dados do usuário logado
  nomeInput.value = usuarioLogado.nome || '';
  emailInput.value = usuarioLogado.email || '';
  senhaInput.value = usuarioLogado.senha || '';
  cepInput.value = usuarioLogado.cep || '';
  ruaInput.value = usuarioLogado.rua || '';
  bairroInput.value = usuarioLogado.bairro || '';
  cidadeInput.value = usuarioLogado.cidade || '';
  estadoInput.value = usuarioLogado.estado || '';

  // Ao submeter o formulário, atualiza os dados
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Atualiza os dados
    const novosDados = {
      nome: nomeInput.value,
      email: emailInput.value,
      senha: senhaInput.value,
      cep: cepInput.value,
      rua: ruaInput.value,
      bairro: bairroInput.value,
      cidade: cidadeInput.value,
      estado: estadoInput.value
    };

    // Atualiza na lista de usuários
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const index = usuarios.findIndex(u => u.email === usuarioLogado.email && u.senha === usuarioLogado.senha);
    if (index !== -1) {
      usuarios[index] = novosDados;
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
      localStorage.setItem('usuarioLogado', JSON.stringify(novosDados));
       window.location.href = "#";
    } else {
      alert('Usuário não encontrado.');
    }
  });
});

function direcionar(){
  window.location.href = "../Pagina Principal/index.html";
}

