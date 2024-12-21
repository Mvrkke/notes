import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Database } from "@/types/supabase";

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];
export type Note = Tables<"notes">;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
