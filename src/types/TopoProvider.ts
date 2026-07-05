export interface TopoProvider {
  type: string;
  id?: string;
  data: Record<string, unknown>;
}
