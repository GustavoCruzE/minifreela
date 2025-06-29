let vagasGlobal = [];

async function carregarVagas() {
  try {
    const response = await fetch('http://localhost:8080/api/vagas');
    vagasGlobal = await response.json();

    const container = document.getElementById('vagasContainer');
    container.innerHTML = ''; // Limpa o container antes de preencher

    vagasGlobal.forEach(vaga => {
      const vagaDiv = document.createElement('div');
      vagaDiv.className = 'bg-white p-6 rounded-xl shadow hover:shadow-lg mb-4';

      vagaDiv.innerHTML = `
        <h3 class="text-xl font-bold text-blue-600">${vaga.empresaId?.nome || 'Empresa'}</h3>
        <p class="text-gray-600">${vaga.local}</p>
        <p class="text-sm text-gray-500 mt-2">${vaga.tecnologias}</p>
        <button
          class="mt-4 px-4 py-2 rounded ${
            vaga.ativa
              ? 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
              : 'bg-gray-400 text-gray-700 cursor-not-allowed'
          }"
          ${vaga.ativa ? `onclick="abrirDetalhes(${vaga.id})"` : 'disabled'}
        >
          ${vaga.ativa ? 'Ver Detalhes' : 'Vaga encerrada'}
        </button>
      `;

      container.appendChild(vagaDiv);
    });
  } catch (error) {
    console.error('Erro ao carregar vagas:', error);
    const container = document.getElementById('vagasContainer');
    if (container) container.innerText = "Erro ao carregar vagas.";
  }
}

function abrirDetalhes(id) {
  const vaga = vagasGlobal.find(v => v.id === id);
  if (!vaga) return alert('Vaga não encontrada!');

  document.getElementById('modalTitulo').innerText = vaga.empresaId?.nome || 'Empresa';
  document.getElementById('modalEmpresa').innerHTML = `<strong>Empresa:</strong> ${vaga.empresaId?.nome || 'N/A'}`;
  document.getElementById('modalLocal').innerHTML = `<strong>Local:</strong> ${vaga.local}`;
  document.getElementById('modalTecnologias').innerHTML = `<strong>Tecnologias:</strong> ${vaga.tecnologias}`;
  document.getElementById('modalDescricao').innerHTML = `<strong>Descrição:</strong> ${vaga.descricao}`;

  const tipoLogin = localStorage.getItem("tipoLogin");
  const logado = localStorage.getItem("logado") === "true";
  const usuarioId = localStorage.getItem("usuarioOuEmpresaId");
  const btnCandidatar = document.getElementById("btnCandidatar");

  if (!vaga.ativa) {
    btnCandidatar.disabled = true;
    btnCandidatar.classList.add("bg-gray-400", "cursor-not-allowed");
    btnCandidatar.classList.remove("bg-blue-600", "hover:bg-blue-700");
    btnCandidatar.innerText = "Vaga encerrada";
    btnCandidatar.onclick = null;
  } else if (!logado) {
    btnCandidatar.disabled = true;
    btnCandidatar.classList.add("bg-gray-400", "cursor-not-allowed");
    btnCandidatar.classList.remove("bg-blue-600", "hover:bg-blue-700");
    btnCandidatar.innerText = "Faça login para se candidatar";
    btnCandidatar.onclick = null;
  } else if (tipoLogin === "empresa") {
    btnCandidatar.disabled = true;
    btnCandidatar.classList.add("bg-gray-400", "cursor-not-allowed");
    btnCandidatar.classList.remove("bg-blue-600", "hover:bg-blue-700");
    btnCandidatar.innerText = "Empresas não podem se candidatar";
    btnCandidatar.onclick = null;
  } else {
    // ✅ Verificar se o usuário já está na lista de candidatos
    const jaCandidatado = vaga.candidatos?.some(c => c.id == usuarioId);

    if (jaCandidatado) {
      btnCandidatar.disabled = true;
      btnCandidatar.classList.add("bg-gray-400", "cursor-not-allowed");
      btnCandidatar.classList.remove("bg-blue-600", "hover:bg-blue-700");
      btnCandidatar.innerText = "Candidatura já enviada";
      btnCandidatar.onclick = null;
    } else {
      btnCandidatar.disabled = false;
      btnCandidatar.classList.remove("bg-gray-400", "cursor-not-allowed");
      btnCandidatar.classList.add("bg-blue-600", "hover:bg-blue-700");
      btnCandidatar.innerText = "Candidatar-se";

      btnCandidatar.onclick = async () => {
        try {
          const response = await fetch(`http://localhost:8080/api/vagas/${vaga.id}/candidatar`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(Number(usuarioId))
          });

          if (response.ok) {
            alert("Candidatura enviada com sucesso!");
            fecharModal();
            carregarVagas();
          } else {
            const errorText = await response.text();
            alert("Erro ao candidatar-se: " + errorText);
          }
        } catch (error) {
          alert("Erro na requisição: " + error.message);
        }
      };
    }
  }

  btnCandidatar.style.display = "inline-block";
  document.getElementById('modalVaga').classList.remove('hidden');
}

function fecharModal() {
  document.getElementById('modalVaga').classList.add('hidden');
}

function controlarVisibilidadeEmpresa() {
  const tipoLogin = localStorage.getItem("tipoLogin");
  const empresaCadastro = document.getElementById("empresaCadastro");

  if (empresaCadastro) {
    empresaCadastro.style.display = tipoLogin === "empresa" ? "block" : "none";
  }
}

function controlarBotaoCriarVaga() {
  const btnCriarVagaMenu = document.getElementById("btnCriarVagaMenu");
  const btnCriarVagaSection = document.getElementById("btnCriarVagaSection");
  const tipoLogin = localStorage.getItem("tipoLogin");

  if (btnCriarVagaMenu) {
    btnCriarVagaMenu.style.display = tipoLogin === "empresa" ? "inline-block" : "none";
  }
  if (btnCriarVagaSection) {
    btnCriarVagaSection.style.display = tipoLogin === "empresa" ? "inline-block" : "none";
  }
}

// Evento para fechar modal
const fecharModalBtn = document.getElementById("fecharModalBtn");
if (fecharModalBtn) {
  fecharModalBtn.addEventListener("click", fecharModal);
}

window.onload = function () {
  controlarVisibilidadeEmpresa();
  controlarBotaoCriarVaga();
  carregarVagas();
};
