import { useQuery } from "@tanstack/react-query";
import { getDogFacts } from "@services/dog";

export function useDogs() {
  const dogFacts = useQuery({
    queryKey: ["dog-facts"],
    queryFn: getDogFacts,
  });

  return { dogFacts };
}
