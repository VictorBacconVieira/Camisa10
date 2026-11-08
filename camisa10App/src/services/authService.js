import * as SecureStore from "expo-secure-store";
import { File } from "expo-file-system"

const API_URL = process.env.EXPO_PUBLIC_API_URL;

// Realiza uma requisição à API
async function requisicaoAPI(endpoint, metodo, dados = null, token = null) {
  if (!API_URL) {
    throw new Error("A URL da API não foi configurada.");
  }

  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    method: metodo,
    headers,
    body: dados ? JSON.stringify(dados) : undefined,
  });

  const resultado = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      resultado.detail || "Não foi possível realizar a operação."
    );
  }

  return resultado;
}

// Cadastro de usuário
export async function cadastrarUsuario(dados) {
  const resultado = await requisicaoAPI(
    "/api/auth/register",
    "POST",
    dados
  );

  if (resultado.access_token) {
    await SecureStore.setItemAsync(
      "camisa10_token",
      resultado.access_token
    );
  }

  return resultado;
}

// Login
export async function fazerLogin(email, senha) {
  const resultado = await requisicaoAPI(
    "/api/auth/login",
    "POST",
    { email, senha }
  );

  if (resultado.access_token) {
    await SecureStore.setItemAsync(
      "camisa10_token",
      resultado.access_token
    );
  }

  return resultado;
}

// Login com Google
export async function fazerLoginGoogle(idToken) {
  const resultado = await requisicaoAPI(
    "/api/auth/google",
    "POST",
    { id_token: idToken}
  );

  if (resultado.access_token) {
    await SecureStore.setItemAsync(
      "camisa10_token",
      resultado.access_token
    );
  }

  return resultado; 
}

// Recupera o token salvo
export async function obterToken() {
  return await SecureStore.getItemAsync("camisa10_token");
}

// Consulta o usuário autenticado
export async function obterUsuarioAutenticado() {
  const token = await obterToken();

  if (!token) {
    throw new Error("Nenhum usuário autenticado.");
  }

  return await requisicaoAPI(
    "/api/auth/me",
    "GET",
    null,
    token
  );
}

// Realiza logout
export async function fazerLogout() {
  await SecureStore.deleteItemAsync("camisa10_token");
}

export async function atualizarPerfil(dados) {
  const token = await obterToken();

  if (!token) {
    throw new Error("Nenhum usuário autenticado.")
  }

  return await requisicaoAPI(
    "/api/auth/me",
    "PUT",
    dados,
    token
  ); 
}

export async function obterTimesDisponiveis() {
  return await requisicaoAPI(
    "/api/times",
    "GET"
  );  
}

export async function atualizarFotoPerfil(uri) {
  const token = await obterToken();

  if (!token) {
    throw new Error("Nenhum usuário autenticado.");
  }

  const extensao = uri.split(".").pop()?.split("?")[0].toLowerCase();

  const tiposImagem = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    webp: "image/webp",
  };

  const tipo = tiposImagem[extensao] || "image/jpeg";

  const formulario = new FormData();

  const arquivo = new File(uri);

  formulario.append(
    "arquivo",
    arquivo,
    `foto-perfil.${extensao || "jpg"}`
  )

  const response = await fetch(`${API_URL}/api/auth/me/foto`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formulario
  });

  const resultado = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      resultado.detail || "Não foi possível atualizar a foto de perfil."
    );
  }
  
  return resultado
}

export async function alterarSenha(senhaAtual, novaSenha) {
  const token = await obterToken();

  if (!token) {
    throw new Error("Nenhum usuário autenticado.");
  }

  return await requisicaoAPI(
    "/api/auth/me/senha",
    "PUT",
    {
      senha_atual: senhaAtual,
      nova_senha: novaSenha,
    },
    token
  );  
}

export async function excluirConta(senha) {
  const token = await obterToken();

  if (!token) {
    throw new Error("Nenhum usuário autenticado.");
  }

  return await requisicaoAPI(
    "/api/auth/me",
    "DELETE",
    { senha },
    token
  );
}

export async function obterPlacarPersonalizado() {
  const token = await obterToken();

  if (!token) {
    throw new Error("Nenhum usuário autenticado.");
  }

  return await requisicaoAPI(
    "/api/home/placar",
    "GET",
    null,
    token
  );
}