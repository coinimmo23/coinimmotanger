export const REFERENCE_PREFIXES = [
  "L1","L2","L3","L4","L5","L6","L7","L8","L9",
  "V1","V2","V3","V4","V5","V6","V7",
  "P1","P2","P3","P4","P5","P6",
] as const;

export type ReferencePrefix = typeof REFERENCE_PREFIXES[number];

export const GEO_CODES: Record<string, string> = {
  A: "CENTRE VILLE",
  B: "OF SHORE-MALABATA-CORNICHE",
  C: "ROUTE KSAR SGHIR-NOUINOUICH-FEDEN CHAPO-ZAITOUNA",
  D: "MEDINA-KASBA",
  E: "PLACE MOZART-NEJMA-BEETHOVEN-Y.B.TACHFINE",
  F: "CHARF-SOURIENNE",
  G: "BELLA VISTA-TANJA BALIA",
  H: "IBERIA-HOP ESP-MARSHAN-DRADEB",
  I: "VAL FLEURI-MESNANA-ZIATEN-BRANES",
  J: "CALIFORNIA-MOUJAHIDINE-JBEL LEKBIR-GOLF-BOUBANA-RAHRAH-",
  K: "ACHAKAR-RMILAT-SIDI KACEM-JBILAT-MEDIOUNA-HAJRIENNE",
  L: "BENI MAKADA-JIRARI-CASABARATA-TCHAR.B.DIBANE-AOUAMA",
  M: "ROUTE DE RABAT",
  N: "ROUTE DE TETOUAN",
  O: "Ksar Sghir",
  P: "Tétouan",
  Q: "Asilah",
  R: "Larache",
  S: "Kénitra",
  T: "Rabat",
  U: "Casablanca",
  V: "Marrakech",
  W: "Agadir",
  X: "Nador · Al-Hoceima",
  Y: "Oujda · Saïdia",
  Z: "Autres",
};

export const GEO_CODE_KEYS = Object.keys(GEO_CODES) as string[];