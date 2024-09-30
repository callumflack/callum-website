import type { Project } from "./projects";

export async function getProjects(): Promise<Project[]> {
  const { default: projects } = await import("./projects");
  return projects;
}
