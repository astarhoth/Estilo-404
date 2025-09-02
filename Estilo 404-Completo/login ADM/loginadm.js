const usuario = [
    {
      nome: "joao felipe",
      email: "jfadm@gmail.com",
      senha: "123456"
    }
];

function login(event) {
  event.preventDefault(); // Impede o comportamento padrão do formulário
  
  const loginEmail = document.getElementById("email").value;
  const loginSenha = document.getElementById("senha").value;
  const loginNome = document.getElementById("nome").value;

  const admin = usuario.find(user => 
    user.email === loginEmail && user.senha === loginSenha && user.nome === loginNome
  );

  if (admin) {
    alert("✅ Login bem-sucedido! Bem-vindo");
    window.location.href = "listcads.html"; // ou o caminho correto
  } else {
    alert("❌ Erro, informações incorretas");
  }
}

