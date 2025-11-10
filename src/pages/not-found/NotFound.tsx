import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white">
      <h1 className="mb-4 text-4xl font-bold text-red-600">404</h1>
      <p className="mb-4 text-lg text-gray-700">Página não encontrada.</p>
      <Link to="/" className="text-blue-600 underline hover:text-blue-800">
        Voltar para a página inicial
      </Link>
    </div>
  );
}
