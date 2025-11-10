import { useDogs } from "@hooks/useDogs";
import { useEffect } from "react";
import { Link } from "react-router";
import { toast } from "react-toastify";

export default function Home() {
  const { dogFacts } = useDogs();

  const getToast = () => {
    toast.success("Sucesso!");
    toast.error("Erro!");
    toast.info("Informação!");
    toast.warn("Aviso!");
    toast("Mensagem genérica!");
  };

  useEffect(() => {
    const testQuery = () => {
      if (dogFacts.isFetching) return toast.info("Carregando dados...");
      if (dogFacts.isError) return toast.error("Erro ao carregar dados!");
      if (dogFacts.isSuccess)
        return toast.success("Dados carregados com sucesso!");
    };
    testQuery();
  }, [dogFacts]);

  console.log("dogFacts", dogFacts.data);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <h1>Bem-vindo ao Projeto Template!</h1>
      <p className="text-gray-600">
        Esta é a página inicial. Edite <code>src/pages/home/Home.tsx</code> para
        começar.
      </p>
      <button
        onClick={() => dogFacts.refetch()}
        className="mt-4 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Teste React Query
      </button>
      {dogFacts.isLoading && <p>Carregando...</p>}
      {dogFacts.error && (
        <p className="text-red-600">Erro ao carregar dados do React Query.</p>
      )}
      <p>{dogFacts?.data?.data?.[0]?.attributes?.body}</p>
      <Link
        to="/about"
        className="mt-6 text-blue-600 underline hover:text-blue-800"
      >
        Teste de roteamento
      </Link>
      <button
        onClick={getToast}
        className="mt-4 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Teste toastify
      </button>
    </div>
  );
}
