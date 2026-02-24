// Formatting helpers for UI

export const formatCurrency = (value) => {
  if (value == null || Number.isNaN(value)) return 'N/A';
  try {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  } catch {
    return String(value);
  }
};

export const formatLabel = (text) => {
  if (!text) return '';
  return text
    .toString()
    .replace(/[_-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
};

