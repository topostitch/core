import type { TopoObject } from "../types/topo-object";
import type { TopoRepresentation } from "../types/topo-representation";

export interface SmithsonianIngestOptions {
  representations?: TopoRepresentation[];
}

export function fromSmithsonian(
  raw: string,
  options: SmithsonianIngestOptions = {},
): TopoObject {
  const sceneId = raw.match(/3D Scene ID:(.+)/)?.[1]?.trim();
  const usage = raw
    .match(/Restrictions:\s*([\s\S]*?)(?:\n\s*\n|$)/)?.[1]
    ?.trim();

  const objectNames = [...raw.matchAll(/Object Name:\s*(.+)/g)].map((match) =>
    match[1].trim(),
  );

  const maintainedBy = [...raw.matchAll(/Record maintained by:\s*(.+)/g)].map(
    (match) => match[1].trim(),
  );

  const recordIds = [...raw.matchAll(/Record ID:\s*(.+)/g)].map((match) =>
    match[1].trim(),
  );

  const maxRecordCount = Math.max(
    objectNames.length,
    maintainedBy.length,
    recordIds.length,
  );

  const records = Array.from({ length: maxRecordCount }, (_, index) => ({
    objectName: objectNames[index],
    recordMaintainedBy: maintainedBy[index],
    recordId: recordIds[index],
  }));

  const primary = records[0];
  const objectName = primary?.objectName ?? objectNames[0];
  const collection = primary?.recordMaintainedBy ?? maintainedBy[0];
  const recordId = primary?.recordId ?? recordIds[0];

  const now = new Date().toISOString();

  return {
    id: `smithsonian:${recordId ?? sceneId ?? "unknown"}`,
    type: "artifact",
    title: objectName ?? "Smithsonian 3D Object",
    description:
      objectName && collection
        ? `${objectName} from the ${collection}.`
        : objectName
          ? `${objectName} from the Smithsonian Institution.`
          : "Smithsonian 3D object.",

    representations: options.representations ?? [],

    metadata: {
      institution: "Smithsonian Institution",
      objectName: objectName ?? "Smithsonian 3D Object",
      collection: collection ?? "Smithsonian Institution",
      recordId: recordId ?? sceneId ?? "unknown",
      sceneId,
      usage: usage ?? "Unknown",
      location: {
        label: "Smithsonian National Air and Space Museum",
        address: "600 Independence Ave SW, Washington, DC 20560",
        latitude: 38.8882,
        longitude: -77.0199,
      },
    },

    providers: [
      {
        type: "smithsonian",
        id: recordId,
        data: {
          raw,
          parsed: {
            sceneId,
            objectName,
            collection,
            recordId,
            records,
            location: {
              label: "Smithsonian National Air and Space Museum",
              address: "600 Independence Ave SW, Washington, DC 20560",
              latitude: 38.8882,
              longitude: -77.0199,
            },
          },
        },
      },
    ],

    createdAt: now,
    updatedAt: now,
  };
}
