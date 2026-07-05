import type { TopoObjectType } from "./TopoObjectType";
import type { TopoRepresentation } from "./TopoRepresentation";
import type { TopoProvider } from "./TopoProvider";

export interface TopoObject {
  id: string;

  type: TopoObjectType;

  title: string;

  description?: string;

  representations: TopoRepresentation[];

  metadata?: Record<string, unknown>;

  providers?: TopoProvider[];

  createdAt: string;

  updatedAt: string;
}
