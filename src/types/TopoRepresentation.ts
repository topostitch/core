export type TopoRepresentationType =
  | "model"
  | "image"
  | "video"
  | "audio"
  | "document"
  | "map"
  | "iiif"
  | "other";

export type TopoRepresentationCapability =
  | "ar"
  | "xr"
  | "download"
  | "embed"
  | "annotations";

export interface TopoRepresentation {
  id: string;
  type: TopoRepresentationType;
  format?: string;
  uri?: string;
  previewUri?: string;
  label?: string;
  accessibilityLabel?: string;
  capabilities?: TopoRepresentationCapability[];
}
