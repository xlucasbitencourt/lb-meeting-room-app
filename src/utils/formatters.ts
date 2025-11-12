/**
 * Formata uma string de tempo "HH:MM:SS" para "HH:MM"
 */
export const formatTimeForInput = (timeStr: string): string => {
  if (!timeStr) return "";
  return timeStr.substring(0, 5);
};

/**
 * Formata uma string de data/hora ISO para um formato legível
 */
export const formatDateTime = (isoString: string): string => {
  if (!isoString) return "Data inválida";
  try {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(date);
  } catch (error) {
    console.error("Erro ao formatar data:", error);
    return "Data inválida";
  }
};
