let vagasEmpresaGlobal = [];

async function carregarVagasEmpresa() {
  const empresaId = localStorage.getItem('usuarioOuEmpresaId');
  if (!empresaId) {
    alert('Você precisa estar logado como empresa para ver suas vagas.');
    window.location.href = 'index.html';
    return;
  }

  try {
    const response = await fetch(`http://localhost:8080/api/vagas/empresa/${empresaId}`);
    if (!response.ok) {
      throw new Error('Erro ao buscar vagas da empresa');
    }
    vagasEmpresaGlobal = await response.json();

    const container = document.getElementById('vagasContainer');
    container.innerHTML = '';

    if (vagasEmpresaGlobal.length === 0) {
      container.innerHTML = '<p class="text-gray-600">Nenhuma vaga cadastrada por esta empresa ainda.</p>';
      return;
    }

    vagasEmpresaGlobal.forEach(vaga => {
      const vagaDiv = document.createElement('div');
      vagaDiv.className = 'bg-white p-6 rounded-xl shadow hover:shadow-lg';

      vagaDiv.innerHTML = `
        <h3 class="text-xl font-bold text-blue-600">${vaga.empresaId?.nome || 'Empresa'}</h3>
        <p class="text-gray-600">${vaga.local}</p>
        <p class="text-sm text-gray-500 mt-2">${vaga.tecnologias}</p>
        <button class="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onclick="abrirDetalhes(${vaga.id})">Ver Detalhes</button>
      `;

      container.appendChild(vagaDiv);
    });

  } catch (error) {
    console.error('Erro ao carregar vagas da empresa:', error);
  }
}

async function abrirDetalhes(id) {
  const vaga = vagasEmpresaGlobal.find(v => v.id === id);
  if (!vaga) return alert('Vaga não encontrada!');

  document.getElementById('modalTitulo').innerText = vaga.empresaId?.nome || 'Empresa';
  document.getElementById('modalEmpresa').innerHTML = `<strong>Empresa:</strong> ${vaga.empresaId?.nome || 'N/A'}`;
  document.getElementById('modalLocal').innerHTML = `<strong>Local:</strong> ${vaga.local}`;
  document.getElementById('modalTecnologias').innerHTML = `<strong>Tecnologias:</strong> ${vaga.tecnologias}`;
  document.getElementById('modalDescricao').innerHTML = `<strong>Descrição:</strong> ${vaga.descricao}`;

  // Listar candidatos
  const candidatosContainer = document.getElementById("listaCandidatos");
  candidatosContainer.innerHTML = '';

  if (vaga.candidatos && vaga.candidatos.length > 0) {
    vaga.candidatos.forEach(candidato => {
      const li = document.createElement("li");
      li.className = "mb-2";

      li.innerHTML = `
        <p><strong>Nome:</strong> ${candidato.nome}</p>
        <p><strong>Email:</strong> ${candidato.email}</p>
        <p><strong>Competências:</strong> ${candidato.competencias || 'N/A'}</p>
        <button class="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded mr-2" onclick="aceitarCandidatura(${vaga.id}, ${candidato.id})">Aceitar</button>
        <button class="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded" onclick="negarCandidatura(${vaga.id}, ${candidato.id})">Negar</button>
      `;

      candidatosContainer.appendChild(li);
    });
  } else {
    candidatosContainer.innerHTML = "<li>Nenhum candidato ainda.</li>";
  }

  const btnEncerrar = document.getElementById("btnEncerrarVaga");
  if (vaga.ativa) {
    btnEncerrar.style.display = "inline-block";
    btnEncerrar.disabled = false;
    btnEncerrar.innerText = "Encerrar vaga";
    btnEncerrar.onclick = () => encerrarVaga(vaga.id);
  } else {
    btnEncerrar.style.display = "inline-block";
    btnEncerrar.disabled = true;
    btnEncerrar.innerText = "Vaga encerrada";
    btnEncerrar.onclick = null;
  }

  document.getElementById('modalVaga').classList.remove('hidden');
}

function fecharModal() {
  document.getElementById('modalVaga').classList.add('hidden');
}

async function encerrarVaga(vagaId) {
  if (!confirm("Tem certeza que deseja encerrar esta vaga?")) return;

  try {
    const response = await fetch(`http://localhost:8080/api/vagas/encerrar/${vagaId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) throw new Error('Erro ao encerrar vaga.');

    alert('Vaga encerrada com sucesso!');

    // Atualiza localmente o status para false
    const vaga = vagasEmpresaGlobal.find(v => v.id === vagaId);
    if (vaga) vaga.ativa = false;

    abrirDetalhes(vagaId);
    carregarVagasEmpresa();

  } catch (error) {
    alert(error.message);
  }
}

async function aceitarCandidatura(vagaId, usuarioId) {
  try {
    const response = await fetch(`http://localhost:8080/api/vagas/${vagaId}/candidatos/${usuarioId}/aceitar`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" }
    });

    if (response.ok) {
      alert("Candidatura aceita e vaga encerrada.");
      carregarVagasEmpresa();
      fecharModal();
    } else {
      const errorText = await response.text();
      alert("Erro ao aceitar candidatura: " + errorText);
    }
  } catch (error) {
    alert("Erro na requisição: " + error.message);
  }
}

async function negarCandidatura(vagaId, usuarioId) {
  if (!confirm("Tem certeza que deseja negar essa candidatura?")) return;

  try {
    const response = await fetch(`http://localhost:8080/api/vagas/${vagaId}/candidatos/${usuarioId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    });

    if (response.ok) {
      alert("Candidatura negada com sucesso.");
      carregarVagasEmpresa();
      abrirDetalhes(vagaId);
    } else {
      const errorText = await response.text();
      alert("Erro ao negar candidatura: " + errorText);
    }
  } catch (error) {
    alert("Erro na requisição: " + error.message);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  carregarVagasEmpresa();

  const abrirLogin = document.getElementById("abrirLogin");

  function atualizarEstadoLogin() {
    if (localStorage.getItem("logado") === "true") {
      abrirLogin.textContent = "Sair";
    } else {
      abrirLogin.textContent = "Entrar";
    }
  }

  atualizarEstadoLogin();

  abrirLogin.addEventListener("click", () => {
    if (abrirLogin.textContent === "Sair") {
      localStorage.removeItem("logado");
      localStorage.removeItem("tipoLogin");
      localStorage.removeItem("usuarioOuEmpresaId");
      alert("Logout realizado com sucesso!");
      atualizarEstadoLogin();
      window.location.href = "index.html";
    } else {
      const modalLogin = document.getElementById("modalLogin");
      if (modalLogin) {
        modalLogin.classList.remove("hidden");
      } else {
        window.location.href = "index.html";
      }
    }
  });
});
