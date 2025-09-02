document.addEventListener('DOMContentLoaded', () => {
  // Preenche endereço ao sair do campo CEP
  document.getElementById('cep').addEventListener('blur', function () {
    const cep = this.value.replace(/\D/g, '');

    if (cep.length === 8) {
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
          if (data.erro) {
            alert("CEP não encontrado.");
            return;
          }

          document.getElementById('rua').value = data.logradouro;
          document.getElementById('bairro').value = data.bairro;
          document.getElementById('cidade').value = data.localidade;
          document.getElementById('estado').value = data.uf;
        })
        .catch(() => alert("Erro ao buscar o CEP."));
    }
  });

 
  document.getElementById('cadastroForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const usuario = {
      nome: document.getElementById('nome').value.trim(),
      email: document.getElementById('email').value.trim(),
      senha: document.getElementById('senha').value,
      cep: document.getElementById('cep').value,
      rua: document.getElementById('rua').value,
      bairro: document.getElementById('bairro').value,
      cidade: document.getElementById('cidade').value,
      estado: document.getElementById('estado').value
    };

    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Verifica se email já existe
    if (usuarios.some(u => u.email === usuario.email)) {
      alert("Email já cadastrado!");
      return;
    }

    usuarios.push(usuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    
    alert("Cadastro realizado com sucesso! Redirecionando para login...");
    window.location.href = "../login/login.html";
  });
});