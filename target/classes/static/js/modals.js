document.addEventListener("DOMContentLoaded", function () {
  const abrirLogin = document.getElementById("abrirLogin");
  const abrirCadastro = document.getElementById("abrirCadastro");
  const modalLogin = document.getElementById("modalLogin");
  const modalCadastro = document.getElementById("modalCadastro");
  const fecharLogin = document.getElementById("fecharLogin");
  const fecharCadastro = document.getElementById("fecharCadastro");

  const tipoLoginSelect = document.getElementById("tipoLogin");
  const inputEmailCnpj = document.getElementById("inputEmailCnpj");
  const inputSenha = document.getElementById("inputSenha");

  const tipoCadastroSelect = document.getElementById("tipoCadastro");
  const nomeCadastro = document.getElementById("nomeCadastro");
  const senhaCadastro = document.getElementById("senhaCadastro");
  const confirmarSenhaCadastro = document.getElementById("confirmarSenhaCadastro");

  const camposUsuario = document.getElementById("camposUsuario");
  const emailCadastro = document.getElementById("emailCadastro");
  const cpfCadastro = document.getElementById("cpfCadastro");
  const competenciasCadastro = document.getElementById("competenciasCadastro");
  const dataNascimentoCadastro = document.getElementById("dataNascimentoCadastro");
  const sexoCadastro = document.getElementById("sexoCadastro");

  const cnpjCadastro = document.getElementById("cnpjCadastro");

  const btnCriarVaga = document.getElementById("btnCriarVaga");
  const btnSuasVagas = document.getElementById("btnSuasVagas");

  const formCriarVaga = document.getElementById("formCriarVaga");

  function controlarBotoesEmpresa() {
    const tipoLogin = localStorage.getItem("tipoLogin");
    if (btnCriarVaga) btnCriarVaga.style.display = tipoLogin === "empresa" ? "inline-block" : "none";
    if (btnSuasVagas) btnSuasVagas.style.display = tipoLogin === "empresa" ? "inline-block" : "none";
  }

  function atualizarInputEmailCnpj() {
    if (!tipoLoginSelect || !inputEmailCnpj) return;
    if (tipoLoginSelect.value === "empresa") {
      inputEmailCnpj.type = "text";
      inputEmailCnpj.placeholder = "CNPJ";
      inputEmailCnpj.value = "";
    } else {
      inputEmailCnpj.type = "email";
      inputEmailCnpj.placeholder = "E-mail";
      inputEmailCnpj.value = "";
    }
  }

  function atualizarCamposCadastro() {
    if (!tipoCadastroSelect || !nomeCadastro || !senhaCadastro || !confirmarSenhaCadastro) return;

    const tipo = tipoCadastroSelect.value;

    if (tipo === "usuario") {
      if (camposUsuario) camposUsuario.classList.remove("hidden");
      if (emailCadastro) emailCadastro.required = true;
      if (cpfCadastro) cpfCadastro.required = true;
      if (competenciasCadastro) competenciasCadastro.required = true;
      if (dataNascimentoCadastro) dataNascimentoCadastro.required = true;
      if (sexoCadastro) sexoCadastro.required = true;

      if (cnpjCadastro) {
        cnpjCadastro.classList.add("hidden");
        cnpjCadastro.required = false;
      }

      nomeCadastro.placeholder = "Nome completo";
      nomeCadastro.classList.remove("hidden");
      senhaCadastro.classList.remove("hidden");
      confirmarSenhaCadastro.classList.remove("hidden");
      nomeCadastro.required = true;
      senhaCadastro.required = true;
      confirmarSenhaCadastro.required = true;
    } else if (tipo === "empresa") {
      if (camposUsuario) camposUsuario.classList.add("hidden");
      if (emailCadastro) emailCadastro.required = false;
      if (cpfCadastro) cpfCadastro.required = false;
      if (competenciasCadastro) competenciasCadastro.required = false;
      if (dataNascimentoCadastro) dataNascimentoCadastro.required = false;
      if (sexoCadastro) sexoCadastro.required = false;

      if (cnpjCadastro) {
        cnpjCadastro.classList.remove("hidden");
        cnpjCadastro.required = true;
      }

      nomeCadastro.placeholder = "Nome da Empresa";
      nomeCadastro.classList.remove("hidden");
      senhaCadastro.classList.remove("hidden");
      confirmarSenhaCadastro.classList.remove("hidden");
      nomeCadastro.required = true;
      senhaCadastro.required = true;
      confirmarSenhaCadastro.required = true;
    } else {
      if (camposUsuario) camposUsuario.classList.add("hidden");
      if (cnpjCadastro) cnpjCadastro.classList.add("hidden");

      nomeCadastro.classList.add("hidden");
      senhaCadastro.classList.add("hidden");
      confirmarSenhaCadastro.classList.add("hidden");

      if (emailCadastro) emailCadastro.required = false;
      if (cpfCadastro) cpfCadastro.required = false;
      if (competenciasCadastro) competenciasCadastro.required = false;
      if (dataNascimentoCadastro) dataNascimentoCadastro.required = false;
      if (sexoCadastro) sexoCadastro.required = false;
      if (cnpjCadastro) cnpjCadastro.required = false;
      nomeCadastro.required = false;
      senhaCadastro.required = false;
      confirmarSenhaCadastro.required = false;
    }
  }

  function controlarVisibilidadeEmpresa() {
    const tipoLogin = localStorage.getItem("tipoLogin");
    const empresaCadastro = document.getElementById("empresaCadastro");
    if (empresaCadastro) {
      empresaCadastro.style.display = tipoLogin === "empresa" ? "block" : "none";
    }
  }

  if (localStorage.getItem("logado") === "true") {
    if (abrirLogin) abrirLogin.textContent = "Sair";
    if (abrirCadastro) abrirCadastro.style.display = "none";
  } else {
    if (abrirLogin) abrirLogin.textContent = "Entrar";
    if (abrirCadastro) abrirCadastro.style.display = "inline-block";
  }

  controlarBotoesEmpresa();
  controlarVisibilidadeEmpresa();
  atualizarInputEmailCnpj();
  atualizarCamposCadastro();

  if (abrirLogin) {
    abrirLogin.addEventListener("click", () => {
      if (abrirLogin.textContent === "Sair") {
        localStorage.removeItem("logado");
        localStorage.removeItem("tipoLogin");
        localStorage.removeItem("usuarioOuEmpresaId");
        abrirLogin.textContent = "Entrar";
        if (abrirCadastro) abrirCadastro.style.display = "inline-block";
        alert("Logout realizado com sucesso!");
        controlarBotoesEmpresa();
        controlarVisibilidadeEmpresa();
        window.location.href = "index.html";
      } else {
        if (modalLogin) modalLogin.classList.remove("hidden");
        atualizarInputEmailCnpj();
        if (inputSenha) inputSenha.value = "";
      }
    });
  }

  if (fecharLogin) {
    fecharLogin.addEventListener("click", () => {
      if (modalLogin) modalLogin.classList.add("hidden");
    });
  }

  if (tipoLoginSelect) tipoLoginSelect.addEventListener("change", atualizarInputEmailCnpj);

  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const tipoLogin = tipoLoginSelect.value;
      const emailOuCnpj = inputEmailCnpj.value.trim();
      const senha = inputSenha.value.trim();

      let url = "";
      let bodyData = {};

      if (tipoLogin === "usuario") {
        url = "http://localhost:8080/api/usuarios/login";
        bodyData = { email: emailOuCnpj, senha };
      } else if (tipoLogin === "empresa") {
        url = "http://localhost:8080/api/empresas/login";
        bodyData = { cnpj: emailOuCnpj, senha };
      }

      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      })
        .then((response) => response.ok ? response.json() : response.text().then((text) => { throw new Error(text); }))
        .then((data) => {
          alert("Login bem-sucedido!");
          if (modalLogin) modalLogin.classList.add("hidden");
          abrirLogin.textContent = "Sair";
          if (abrirCadastro) abrirCadastro.style.display = "none";
          localStorage.setItem("logado", "true");
          localStorage.setItem("tipoLogin", tipoLogin);
          localStorage.setItem("usuarioOuEmpresaId", data.id);
          controlarBotoesEmpresa();
          controlarVisibilidadeEmpresa();
        })
        .catch((error) => alert("Erro no login: " + error.message));
    });
  }

  if (abrirCadastro) {
    abrirCadastro.addEventListener("click", () => {
      if (modalCadastro) modalCadastro.classList.remove("hidden");
    });
  }

  if (fecharCadastro) {
    fecharCadastro.addEventListener("click", () => {
      if (modalCadastro) modalCadastro.classList.add("hidden");
    });
  }

  if (tipoCadastroSelect) tipoCadastroSelect.addEventListener("change", atualizarCamposCadastro);

  const cadastroForm = document.getElementById("cadastroForm");
  if (cadastroForm) {
    cadastroForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const tipoCadastro = tipoCadastroSelect.value;
      const nome = nomeCadastro.value.trim();
      const senha = senhaCadastro.value.trim();
      const confirmarSenha = confirmarSenhaCadastro.value.trim();

      if (!tipoCadastro) {
        alert("Selecione o tipo de cadastro.");
        return;
      }

      if (senha !== confirmarSenha) {
        alert("As senhas não coincidem.");
        return;
      }

      if (tipoCadastro === "usuario") {
        const email = emailCadastro.value.trim();
        const cpf = cpfCadastro.value.trim();
        const competencias = competenciasCadastro.value.trim();
        const dataNascimento = dataNascimentoCadastro.value;
        const sexoSelecionado = sexoCadastro.value;
        let sexoChar = "";
        if (sexoSelecionado === "masculino") sexoChar = "M";
        else if (sexoSelecionado === "feminino") sexoChar = "F";

        const bodyData = { nome, email, senha, cpf, competencias, dataDeNascimento: dataNascimento, sexo: sexoChar };

        fetch("http://localhost:8080/api/usuarios", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bodyData),
        })
          .then((response) => response.ok ? response.json() : response.text().then((text) => { throw new Error(text); }))
          .then(() => {
            alert("Cadastro de usuário realizado com sucesso!");
            modalCadastro.classList.add("hidden");
            cadastroForm.reset();
            atualizarCamposCadastro();
          })
          .catch((error) => alert("Erro no cadastro: " + error.message));
      } else if (tipoCadastro === "empresa") {
        const cnpj = cnpjCadastro.value.trim();
        const bodyData = { nome, cnpj, senha };

        fetch("http://localhost:8080/api/empresas", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bodyData),
        })
          .then((response) => response.ok ? response.json() : response.text().then((text) => { throw new Error(text); }))
          .then(() => {
            alert("Cadastro de empresa realizado com sucesso!");
            modalCadastro.classList.add("hidden");
            cadastroForm.reset();
            atualizarCamposCadastro();
          })
          .catch((error) => alert("Erro no cadastro: " + error.message));
      }
    });
  }

  if (formCriarVaga) {
    formCriarVaga.addEventListener("submit", async (e) => {
      e.preventDefault();

      const local = formCriarVaga.localizacao.value.trim();
      const tecnologias = formCriarVaga.tecnologias.value.trim();
      const descricao = formCriarVaga.descricao.value.trim();

      const empresaId = localStorage.getItem("usuarioOuEmpresaId");

      if (!empresaId) {
        alert("Você precisa estar logado como empresa para criar uma vaga.");
        return;
      }

      const vagaData = {
        empresaId: { id: Number(empresaId) },
        local,
        tecnologias,
        descricao,
        ativa: true,
      };

      try {
        const response = await fetch("http://localhost:8080/api/vagas", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(vagaData),
        });

        if (response.ok) {
          alert("Vaga criada com sucesso!");
          formCriarVaga.reset();
        } else {
          const errorText = await response.text();
          alert("Erro ao criar vaga: " + errorText);
        }
      } catch (error) {
        alert("Erro na requisição: " + error.message);
      }
    });
  }
});
