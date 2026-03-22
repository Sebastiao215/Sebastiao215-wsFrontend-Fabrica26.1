"use client"; 

import { useState, useEffect } from "react";
import Cabecalho from "@/componentes/cabecalho";
import Rodape from "@/componentes/rodape";
import CartaoPersonagem from "@/componentes/cartaopersonagem";
import { Personagem } from "@/tipos";

export default function TelaInicial() {
  const [personagens, setPersonagens] = useState<Personagem[]>([]);
  const [termoBusca, setTermoBusca] = useState("");
  const [carregando, setCarregando] = useState(true);

  const buscarPersonagensPorNome = async (nome: string) => {
  setCarregando(true);
  try {
    const url = nome 
      ? `https://rickandmortyapi.com/api/character/?name=${nome}`
      : `https://rickandmortyapi.com/api/character`

    const resposta = await fetch(url);

    if (!resposta.ok) {
      setPersonagens([]);
      return;
    }

    const dados = await resposta.json();
    setPersonagens(dados.results || []);
    
  } catch (erro) {
    console.error("Erro crítico na requisição:", erro);
  } finally {
    setCarregando(false);
  }
  };

  useEffect(() => {
    buscarPersonagensPorNome(termoBusca);
  }, [termoBusca]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Cabecalho />

      <main className="flex-grow container mx-auto p-4 md:p-8">
        
        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="Busque um personagem pelo nome..."
            value={termoBusca}
            onChange={(evento) => setTermoBusca(evento.target.value)}
            className="w-full max-w-lg p-4 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-black text-lg"
          />
        </div>

        {carregando ? (
          <p className="text-center text-xl text-gray-600 font-semibold">Carregando portal...</p>
        ) : personagens.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {personagens.map((personagem) => (
              <CartaoPersonagem key={personagem.id} personagem={personagem} />
            ))}
          </div>
        ) : (
          <p className="text-center text-xl text-red-500 font-semibold">
            Nenhum personagem encontrado com esse nome.
          </p>
        )}

      </main>

      <Rodape />
    </div>
  );
}