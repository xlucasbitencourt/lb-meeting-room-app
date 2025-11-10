import { Link } from "react-router";

export default function About() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white">
      <h1 className="mb-4 text-3xl font-bold">Sobre o Projeto</h1>
      <p className="text-gray-700">
        Esta é a página Sobre. Você pode customizar este conteúdo conforme
        necessário.
      </p>
      <Link to="/" className="mt-6 text-blue-600 underline hover:text-blue-800">
        Voltar para a página inicial
      </Link>
    </div>
  );
}
