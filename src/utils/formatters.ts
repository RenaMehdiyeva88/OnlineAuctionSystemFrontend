import { getCurrentLanguage } from "@/i18n/translations";

// Intl locale for the language the user selected (dates/currency formatting).
const LOCALES = { en: "en-US", ru: "ru-RU", az: "az-AZ" } as const;

function currentLocale(): string {
  return LOCALES[getCurrentLanguage()];
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat(currentLocale(), {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatDateTime(iso: string): string {
  return new Intl.DateTimeFormat(currentLocale(), {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(iso));
}

export function pad2(value: number): string {
  return value.toString().padStart(2, "0");
}

// Formats a card index as an auction-catalog lot number, e.g. 7 -> "LOT 007".
export function formatLotNumber(index: number): string {
  return `LOT ${(index + 1).toString().padStart(3, "0")}`;
}