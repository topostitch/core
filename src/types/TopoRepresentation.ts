export interface TopoRepresentation {
  id: string;
  type: "model" | "image" | "video" | "audio" | "document" | "map" | "other";
  format?: string;
  src?: string;
  poster?: string;
  label?: string;
}
