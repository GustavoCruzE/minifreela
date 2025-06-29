export async function getUsuarios() {
  const response = await fetch('http://localhost:8080/api/usuarios');
  return await response.json();
}

export async function getVagas() {
  const response = await fetch('http://localhost:8080/api/vagas');
  return await response.json();
}

export async function criarUsuario(usuario) {
  const response = await fetch('http://localhost:8080/api/usuarios', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(usuario)
  });
  return await response.json();
}
