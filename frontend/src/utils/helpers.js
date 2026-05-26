export const formatDate = (dateString) => {
  if (!dateString) return '';
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export const calculateCarbonSavings = (itemType, weight) => {
  const materialFactors = {
    SCREENS: 1.8,
    IT_HARDWARE: 2.5,
    SMALL_ELECTRONICS: 1.2,
    LARGE_APPLIANCES: 1.5,
    BATTERIES: 3.2,
    LIGHTING: 0.8,
  };
  const factor = materialFactors[itemType] || 1.0;
  return (weight * factor).toFixed(1);
};

export const getMaterialName = (itemType) => {
  const names = {
    SCREENS: 'Screens & Monitors',
    IT_HARDWARE: 'IT & Telecom (Laptops, Phones)',
    SMALL_ELECTRONICS: 'Small Home Electronics',
    LARGE_APPLIANCES: 'Large Home Appliances',
    BATTERIES: 'Batteries & Power Cells',
    LIGHTING: 'Lighting & Lamps',
  };
  return names[itemType] || itemType;
};

export const safeGetLocalStorage = (key, fallback = null) => {
  if (typeof window === 'undefined') return fallback;
  try {
    const item = localStorage.getItem(key);
    if (!item) return fallback;
    // Handle both stringified and plain string formats
    try {
      return JSON.parse(item);
    } catch {
      return item;
    }
  } catch (error) {
    console.error('Error parsing localStorage key:', key, error);
    return fallback;
  }
};

export const safeSetLocalStorage = (key, value) => {
  if (typeof window === 'undefined') return;
  try {
    const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
    localStorage.setItem(key, stringValue);
  } catch (error) {
    console.error('Error setting localStorage key:', key, error);
  }
};
