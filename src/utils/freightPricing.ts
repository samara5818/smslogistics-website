export type BodyType = "open" | "closed" | "container" | "any";
export type PickupTime = "morning" | "afternoon" | "evening" | "night" | "flexible";

export type Vehicle = {
  id: string;
  label: string;
  payloadKg: number;
  volumeCft: number;
};

export type FreightEstimate = {
  recommendedVehicle: string;
  distance: number;
  transitEstimate: string;
  estimatedPriceMin: number;
  estimatedPriceMax: number;
  estimateId: string;
};

// Public capacity data is used only to suggest a suitable category.
// All commercial rates and pricing logic belong in /api/freight/estimate.
export const VEHICLES: Vehicle[] = [
  { id: "mini-7", label: "7–8 FT Mini Truck", payloadKg: 900, volumeCft: 180 },
  { id: "pickup-9", label: "9–10 FT Pickup / LCV", payloadKg: 1500, volumeCft: 260 },
  { id: "lcv-12", label: "12 FT LCV", payloadKg: 2500, volumeCft: 420 },
  { id: "lcv-14", label: "14 FT Truck", payloadKg: 4000, volumeCft: 620 },
  { id: "lcv-17", label: "17 FT Truck", payloadKg: 5000, volumeCft: 800 },
  { id: "lcv-19", label: "19 FT Truck", payloadKg: 8000, volumeCft: 1050 },
  { id: "truck-22", label: "22 FT Truck", payloadKg: 10000, volumeCft: 1350 },
  { id: "container-32-sxl", label: "32 FT SXL Container", payloadKg: 15000, volumeCft: 2100 },
  { id: "container-32-mxl", label: "32 FT MXL Container", payloadKg: 20000, volumeCft: 2250 },
];

export function recommendVehicle(weightKg: number, volumeCft = 0): Vehicle {
  const targetWeight = weightKg * 1.08;
  const targetVolume = volumeCft ? volumeCft * 1.05 : 0;
  return VEHICLES.find((vehicle) => vehicle.payloadKg >= targetWeight && (!targetVolume || vehicle.volumeCft >= targetVolume)) ?? VEHICLES[VEHICLES.length - 1];
}
