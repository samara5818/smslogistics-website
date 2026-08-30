export type BodyType = "open" | "closed" | "container" | "any";
export type PickupTime = "morning" | "afternoon" | "evening" | "night" | "flexible";

export type FreightInput = {
  distanceKm: number;
  loadType: string;
  weightKg: number;
  volumeCft?: number;
  requestedVehicleId?: string;
  bodyType: BodyType;
  pickupTime: PickupTime;
  loadingPoints: number;
  unloadingPoints: number;
  loadingAssistance: boolean;
  urgent: boolean;
};

export type VehicleRate = {
  id: string;
  label: string;
  payloadKg: number;
  volumeCft: number;
  baseRatePerKm: number;
  minTripCharge: number;
  transitKmph: number;
};

export type FreightEstimate = {
  recommendedVehicle: VehicleRate;
  selectedVehicle: VehicleRate;
  priceMin: number;
  priceMax: number;
  transitEstimate: string;
  estimateId: string;
  warnings: string[];
};

// V1 public-estimator calibration values. Review these against actual completed-trip data regularly.
export const VEHICLES: VehicleRate[] = [
  { id: "mini-7", label: "7–8 FT Mini Truck", payloadKg: 900, volumeCft: 180, baseRatePerKm: 22, minTripCharge: 1800, transitKmph: 38 },
  { id: "pickup-9", label: "9–10 FT Pickup / LCV", payloadKg: 1500, volumeCft: 260, baseRatePerKm: 26, minTripCharge: 2500, transitKmph: 40 },
  { id: "lcv-12", label: "12 FT LCV", payloadKg: 2500, volumeCft: 420, baseRatePerKm: 29, minTripCharge: 3500, transitKmph: 42 },
  { id: "lcv-14", label: "14 FT Truck", payloadKg: 4000, volumeCft: 620, baseRatePerKm: 34, minTripCharge: 4800, transitKmph: 44 },
  { id: "lcv-17", label: "17 FT Truck", payloadKg: 5000, volumeCft: 800, baseRatePerKm: 38, minTripCharge: 6500, transitKmph: 44 },
  { id: "lcv-19", label: "19 FT Truck", payloadKg: 8000, volumeCft: 1050, baseRatePerKm: 43, minTripCharge: 8500, transitKmph: 43 },
  { id: "truck-22", label: "22 FT Truck", payloadKg: 10000, volumeCft: 1350, baseRatePerKm: 48, minTripCharge: 10500, transitKmph: 42 },
  { id: "container-32-sxl", label: "32 FT SXL Container", payloadKg: 15000, volumeCft: 2100, baseRatePerKm: 54, minTripCharge: 15500, transitKmph: 40 },
  { id: "container-32-mxl", label: "32 FT MXL Container", payloadKg: 20000, volumeCft: 2250, baseRatePerKm: 62, minTripCharge: 19000, transitKmph: 40 },
];

const fragileLoads = new Set(["electronics", "furniture", "machinery", "automobile-parts"]);
const denseLoads = new Set(["construction-material", "industrial-material", "machinery"]);

export function recommendVehicle(weightKg: number, volumeCft = 0): VehicleRate {
  const targetWeight = weightKg * 1.08; // small payload safety headroom
  const targetVolume = volumeCft ? volumeCft * 1.05 : 0;
  return VEHICLES.find((vehicle) => vehicle.payloadKg >= targetWeight && (!targetVolume || vehicle.volumeCft >= targetVolume)) ?? VEHICLES[VEHICLES.length - 1];
}

export function calculateFreightEstimate(input: FreightInput): FreightEstimate {
  const distance = Math.max(1, input.distanceKm);
  const recommendedVehicle = recommendVehicle(input.weightKg, input.volumeCft ?? 0);
  const requested = input.requestedVehicleId ? VEHICLES.find((vehicle) => vehicle.id === input.requestedVehicleId) : undefined;
  const selectedVehicle = requested ?? recommendedVehicle;
  const warnings: string[] = [];

  if (input.weightKg > selectedVehicle.payloadKg) warnings.push("Selected vehicle may be undersized for the entered weight.");
  if ((input.volumeCft ?? 0) > selectedVehicle.volumeCft) warnings.push("Selected vehicle may be undersized for the entered cargo volume.");

  // Distance-based selling rate with a long-haul efficiency discount.
  let distanceRate = selectedVehicle.baseRatePerKm;
  if (distance >= 800) distanceRate *= 0.91;
  else if (distance >= 400) distanceRate *= 0.95;
  else if (distance <= 40) distanceRate *= 1.08;

  let subtotal = Math.max(selectedVehicle.minTripCharge, distance * distanceRate);

  // Body requirement.
  if (input.bodyType === "closed") subtotal *= 1.04;
  if (input.bodyType === "container") subtotal *= 1.08;

  // Cargo handling/risk factors.
  if (fragileLoads.has(input.loadType)) subtotal *= 1.04;
  if (denseLoads.has(input.loadType) && input.weightKg >= selectedVehicle.payloadKg * 0.85) subtotal *= 1.03;

  // Operational requirements.
  if (input.pickupTime === "night") subtotal *= 1.05;
  if (input.urgent) subtotal *= 1.08;
  subtotal += Math.max(0, input.loadingPoints - 1) * 500;
  subtotal += Math.max(0, input.unloadingPoints - 1) * 500;
  if (input.loadingAssistance) subtotal += selectedVehicle.payloadKg <= 2500 ? 900 : selectedVehicle.payloadKg <= 8000 ? 1400 : 2000;

  // Public estimator buffer covers ordinary route/toll/availability variation until route-specific tariff data is added.
  const routeBuffer = distance >= 500 ? 0.06 : distance >= 150 ? 0.07 : 0.08;
  subtotal *= 1 + routeBuffer;

  // Return a customer-friendly range, rounded to ₹100.
  const round100 = (value: number) => Math.round(value / 100) * 100;
  const priceMin = round100(subtotal * 0.97);
  const priceMax = Math.max(priceMin + 500, round100(subtotal * 1.07));

  const drivingHours = distance / selectedVehicle.transitKmph;
  const minHours = Math.max(1, Math.ceil(drivingHours + (distance > 350 ? 2 : 1)));
  const maxHours = minHours + (distance > 800 ? 8 : distance > 350 ? 4 : 2);
  const transitEstimate = maxHours <= 24 ? `${minHours}–${maxHours} hours` : `${Math.max(1, Math.floor(minHours / 24))}–${Math.ceil(maxHours / 24)} days`;

  const estimateId = `SMS-FRT-${new Date().getFullYear()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
  return { recommendedVehicle, selectedVehicle, priceMin, priceMax, transitEstimate, estimateId, warnings };
}
