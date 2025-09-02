function logarUsuario(event) {
    event.preventDefault(); // Impede o recarregamento da página
    
    const emailDigitado = document.getElementById("email").value.trim();
    const senhaDigitada = document.getElementById("senha").value;

    const usuariosSalvos = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuarioEncontrado = usuariosSalvos.find(usuario => 
      usuario.email === emailDigitado && usuario.senha === senhaDigitada
    );

    if (usuarioEncontrado) {
      alert("Login realizado com sucesso!");
      localStorage.setItem("usuarioLogado", JSON.stringify(usuarioEncontrado));
      window.location.href = "../atualizacao/atualizacao.html"; // Redireciona para uma página existente
    } else {
      alert("Dados incorretos ou crie um conta!");
    }
  }

  // Adiciona o evento ao formulário
  document.getElementById("loginForm").addEventListener("submit", logarUsuario);
