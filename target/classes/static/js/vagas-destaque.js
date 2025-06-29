// Container onde as vagas aparecerão
const containerVagas = document.getElementById('vagasDestaqueContainer');

// Guarda todas as vagas carregadas
let todasVagas = [];

// Busca vagas ativas do backend
async function carregarVagasDestaque() {
  try {
    const response = await fetch('http://localhost:8080/api/vagas?ativa=true');
    if (!response.ok) throw new Error('Erro ao buscar vagas');

    todasVagas = await response.json();

    // Mostrar 3 vagas aleatórias inicialmente
    mostrarVagas(pegarAleatorias(todasVagas, 3));
  } catch (error) {
    console.error(error);
    containerVagas.innerHTML = '<p class="text-red-600">Erro ao carregar vagas em destaque.</p>';
  }
}

// Exibe vagas no container
function mostrarVagas(vagas) {
  containerVagas.innerHTML = '';

  if (vagas.length === 0) {
    containerVagas.innerHTML = '<p class="text-gray-600">Nenhuma vaga encontrada.</p>';
    return;
  }

  vagas.forEach(vaga => {
    const nomeVaga = vaga.empresaId?.nome || 'Vaga sem título';
    const empresaNome = vaga.empresaId?.nome || 'Empresa não informada';
    const local = vaga.local || 'Local não informado';
    const tecnologias = vaga.tecnologias || 'Tecnologias não informadas';

    const div = document.createElement('div');
    div.className = 'bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition';

    div.innerHTML = `
      <h4 class="text-xl font-bold text-blue-600 mb-2">${nomeVaga}</h4>
      <p class="text-gray-600">${empresaNome} • ${local}</p>
      <p class="text-sm text-gray-500 mt-2">${tecnologias}</p>
      <button onclick="abrirDetalhes(${vaga.id})" class="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Ver Detalhes</button>
    `;

    containerVagas.appendChild(div);
  });
}

// Pega n elementos aleatórios do array
function pegarAleatorias(arr, n) {
  const resultado = [];
  const usados = new Set();
  const limite = Math.min(n, arr.length);

  while (resultado.length < limite) {
    const idx = Math.floor(Math.random() * arr.length);
    if (!usados.has(idx)) {
      usados.add(idx);
      resultado.push(arr[idx]);
    }
  }
  return resultado;
}

// Função para abrir o modal de detalhes preenchendo os dados
function abrirDetalhes(id) {
  const vaga = todasVagas.find(v => v.id === id);
  if (!vaga) return alert('Vaga não encontrada!');

  const modal = document.getElementById('modalDetalhes');
  if (!modal) return alert('Modal de detalhes não encontrado.');

  modal.innerHTML = `
    <div class="bg-white p-8 rounded-xl shadow-md w-full max-w-2xl relative">
      <button onclick="fecharDetalhes()" class="absolute top-2 right-3 text-gray-500 hover:text-red-600 text-2xl">&times;</button>
      <h2 class="text-2xl font-bold text-blue-600 mb-4">${vaga.nome || 'Vaga'}</h2>
      <p class="text-gray-700 mb-2"><strong>Empresa:</strong> ${vaga.empresaId?.nome || 'N/A'}</p>
      <p class="text-gray-700 mb-2"><strong>Local:</strong> ${vaga.local}</p>
      <p class="text-gray-700 mb-2"><strong>Tecnologias:</strong> ${vaga.tecnologias}</p>
      <p class="text-gray-700 mb-4"><strong>Descrição:</strong> ${vaga.descricao}</p>
      <button class="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">Candidatar-se</button>
    </div>
  `;

  modal.classList.remove('hidden');
}

// Função para fechar o modal
function fecharDetalhes() {
  const modal = document.getElementById('modalDetalhes');
  if (modal) modal.classList.add('hidden');
}

// Evento para o formulário de busca
document.getElementById('formBusca').addEventListener('submit', function(event) {
  event.preventDefault();
  const termo = document.getElementById('inputBusca').value.toLowerCase().trim();

  if (!termo) {
    // Se vazio, mostrar 3 vagas aleatórias
    mostrarVagas(pegarAleatorias(todasVagas, 3));
    return;
  }

  const resultados = todasVagas.filter(vaga => {
    const descricao = vaga.descricao ? vaga.descricao.toLowerCase() : '';
    const tecnologias = vaga.tecnologias ? vaga.tecnologias.toLowerCase() : '';
    return descricao.includes(termo) || tecnologias.includes(termo);
  });

  mostrarVagas(resultados);
});

// Carrega vagas ao iniciar a página
document.addEventListener('DOMContentLoaded', carregarVagasDestaque);
