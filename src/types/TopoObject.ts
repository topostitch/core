import type { TopoObjectType } from "./TopoObjectType";
import type { TopoRepresentation } from "./TopoRepresentation";
import type { TopoProvider } from "./TopoProvider";

export interface TopoTimelineEvent {
  id?: string;
  date?: string;
  title: string;
  description?: string;
}

export interface TopoObject {
  id: string;

  type: TopoObjectType;

  title: string;

  description?: string;

  representations: TopoRepresentation[];

  timeline?: TopoTimelineEvent[];

  metadata?: Record<string, unknown>;

  providers?: TopoProvider[];

  createdAt: string;

  updatedAt: string;
}
