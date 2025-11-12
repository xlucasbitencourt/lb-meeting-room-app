/**
 * Formata uma string de tempo "HH:MM:SS" para "HH:MM"
 */
export const formatTimeForInput = (timeStr: string): string => {
  if (!timeStr) return '';
  return timeStr.substring(0, 5);
};