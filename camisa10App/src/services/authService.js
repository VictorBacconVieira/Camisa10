
import * as SecureStore from "expo-secure-store";

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
