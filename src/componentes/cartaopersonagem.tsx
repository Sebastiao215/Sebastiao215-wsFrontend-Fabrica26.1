import { Personagem } from "@/tipos/index";

interface PropriedadesCartao {
  personagem: Personagem;
}

export default function CartaoPersonagem({ personagem }: PropriedadesCartao) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:scale-105 transition-transform duration-200">
      <img 
        src={personagem.image} 
        alt={personagem.name} 
        className="w-full h-64 object-cover"
      />
      <div className="p-4 text-gray-800">
        <h2 className="text-xl font-bold mb-2 truncate">{personagem.name}</h2>
        <p><strong>Status:</strong> {personagem.status}</p>
        <p><strong>Espécie:</strong> {personagem.species}</p>
      </div>
    </div>
  );
}