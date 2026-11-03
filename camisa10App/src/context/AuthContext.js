import { createContext, useContext, useEffect, useState } from "react";

import {
    obterUsuarioAutenticado,
    obterToken,
    fazerLogin,
    fazerLogout,
    atualizarPerfil,
} from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [usuario, setUsuario] = useState(null);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        async function restaurarSessao() {
            try {
                const token = await obterToken();

                console.log(
                    "TOKEN RECUPERADO:",
                    token ? "Existe" : "Não Encontrado"
                );

                if (token) {
                    const dadosUsuario = await obterUsuarioAutenticado();
                    console.log("USUÁRIO RECUPERADO:", dadosUsuario?.email);
                    setUsuario(dadosUsuario);
                }
            } catch (error) {
                console.log("Não foi possível restaurar a sessão:", error.message);
                await fazerLogout();
                setUsuario(null);
            } finally {
                setCarregando(false);
            }  
        }
        restaurarSessao();
    }, []);

    async function entrar(email, senha) {
        const resultado = await fazerLogin(email, senha);

        const dadosUsuario = await obterUsuarioAutenticado();

        setUsuario(dadosUsuario);

        return resultado; 
    }

    async function atualizarDadosUsuario(dados) {
        const resultado = await atualizarPerfil(dados);

        const dadosAtualizados = await obterUsuarioAutenticado();

        setUsuario(dadosAtualizados);

        return dadosAtualizados;  
    }

    async function sair() {
        await fazerLogout();
        setUsuario(null); 
    }

    return (
        <AuthContext.Provider
            value={{
                usuario,
                carregando,
                autenticado: !!usuario,
                entrar,
                sair,
                setUsuario,
                atualizarDadosUsuario,
            }}
            >
                {children}
            </AuthContext.Provider>
    );
}

export function useAuth(){
    const contexto = useContext(AuthContext);

    if (!contexto) {
        throw new Error("useAuth deve ser utilizado dentro de AuthProvider.");
    }

    return contexto;
}