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
  PENDING: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  ASSIGNED: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  ACCEPTED: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
  COLLECTED: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  RECYCLED: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
};
