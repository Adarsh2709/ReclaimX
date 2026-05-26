export const ROLES = {
  USER: 'USER',
  RECYCLER: 'RECYCLER',
  ADMIN: 'ADMIN',
};

export const PICKUP_STATUS = {
  PENDING: 'PENDING',
  ASSIGNED: 'ASSIGNED',
  ACCEPTED: 'ACCEPTED',
  COLLECTED: 'COLLECTED',
  RECYCLED: 'RECYCLED',
};

export const MATERIAL_TYPES = [
  { id: 'SCREENS', name: 'Screens & Monitors', co2Factor: 1.8, unit: 'kg', icon: 'Tv' },
  { id: 'IT_HARDWARE', name: 'IT & Telecom (Laptops, Phones)', co2Factor: 2.5, unit: 'kg', icon: 'Laptop' },
  { id: 'SMALL_ELECTRONICS', name: 'Small Home Electronics', co2Factor: 1.2, unit: 'kg', icon: 'Smartphone' },
  { id: 'LARGE_APPLIANCES', name: 'Large Home Appliances', co2Factor: 1.5, unit: 'kg', icon: 'Refrigerator' },
  { id: 'BATTERIES', name: 'Batteries & Power Cells', co2Factor: 3.2, unit: 'kg', icon: 'BatteryCharging' },
  { id: 'LIGHTING', name: 'Lighting & Lamps', co2Factor: 0.8, unit: 'kg', icon: 'Lightbulb' },
];

export const STATUS_COLORS = {
  PENDING: 'bg-amber-50 text-amber-700 border-amber-200/60',
  ASSIGNED: 'bg-blue-50 text-blue-700 border-blue-200/60',
  ACCEPTED: 'bg-teal-50 text-teal-700 border-teal-200/60',
  COLLECTED: 'bg-orange-50 text-orange-700 border-orange-200/60',
  RECYCLED: 'bg-emerald-50 text-emerald-700 border-emerald-200/60',
};
