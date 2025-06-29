async function carregarEmpresas() {
  try {
    const response = await fetch('http://localhost:8080/api/empresas');
    if (!response.ok) throw new Error('Erro ao buscar empresas');

    const empresas = await response.json();

    const container = document.getElementById('empresasContainer');
    container.innerHTML = '';

    if (empresas.length === 0) {
      container.innerHTML = '<p class="text-gray-600">Nenhuma empresa cadastrada.</p>';
      return;
    }

    empresas.forEach(empresa => {
      const div = document.createElement('div');
      div.className = 'bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition';

      div.innerHTML = `
        <h4 class="text-xl font-bold text-blue-600 mb-2">${empresa.nome}</h4>
        <p class="text-gray-600">${empresa.descricao || 'Descrição não disponível.'}</p>
        <button onclick="abrirDetalhesEmpresa(${empresa.id})" class="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Ver Detalhes</button>
      `;

      container.appendChild(div);
    });
  } catch (error) {
    console.error(error);
    alert('Erro ao carregar empresas.');
  }
}

// Função para abrir modal detalhado da empresa (precisa ajustar para mostrar dados dinâmicos)
async function abrirDetalhesEmpresa(id) {
  try {
    const response = await fetch(`http://localhost:8080/api/empresas/${id}`);
    if (!response.ok) throw new Error('Empresa não encontrada');

    const empresa = await response.json();

    const modal = document.getElementById('modalDetalhesEmpresa');
    modal.querySelector('h2').innerText = empresa.nome;
    modal.querySelector('p:nth-of-type(1)').innerHTML = `<strong>Área de atuação:</strong> ${empresa.areaAtuacao || 'N/A'}`;
    modal.querySelector('p:nth-of-type(2)').innerHTML = `<strong>Local:</strong> ${empresa.local || 'N/A'}`;
    modal.querySelector('p:nth-of-type(3)').innerHTML = `<strong>Descrição:</strong> ${empresa.descricao || 'N/A'}`;

    modal.classList.remove('hidden');
  } catch (error) {
    alert('Erro ao carregar detalhes da empresa.');
    console.error(error);
  }
}

function fecharDetalhesEmpresa() {
  document.getElementById('modalDetalhesEmpresa').classList.add('hidden');
}

// Chama para carregar empresas ao carregar a página
document.addEventListener('DOMContentLoaded', carregarEmpresas);
