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

/**
 * Converte uma string ISO (vinda da API) para o formato do input type="date"
 */
export const formatISOToDateInput = (isoString: string): string => {
  if (!isoString) return "";
  try {
    return new Date(isoString).toISOString().split("T")[0];
  } catch (error) {
    console.error("Erro ao formatar data para input date:", error);
    return "";
  }
};

/**
 * Converte uma string ISO (vinda da API) para o formato do input type="time"
 */
export const formatISOToTimeInput = (isoString: string): string => {
  if (!isoString) return "";
  try {
    const date = new Date(isoString);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  } catch (error) {
    console.error("Erro ao formatar data para input time:", error);
    return "";
  }
};

/**
 * Combina uma data (YYYY-MM-DD) e uma hora (HH:MM) numa string ISO
 */
export const combineDateAndTime = (date: string, time: string): string => {
  if (!date || !time) return "";
  return `${date}T${time}:00`;
};
