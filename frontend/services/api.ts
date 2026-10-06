import type { ApiResponse, Project, SkillGroup, JourneyItem } from "@/types/portfolio";
import type { ContactInput } from "@/lib/validation";
const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8080/api/v1";
async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    signal: AbortSignal.timeout(12000),
    headers: { "Content-Type": "application/json", ...options?.headers },
  });
  const body: ApiResponse<T> = await response.json();
  if (!response.ok || !body.success)
    throw new Error(
      body.message || "The service is unavailable. Please try again.",
    );
  return body.data;
}
export const api = {
  projects: () => request<Project[]>("/projects"),
  skills: () => request<SkillGroup[]>("/skills"),
  experience: () => request<JourneyItem[]>("/experience"),
  contact: (data: ContactInput) =>
    request<null>("/contact", { method: "POST", body: JSON.stringify(data) }),
};
