import apiClient from "@/admin/hooks/apiClient";
import apiPublicClient from "../hooks/apiPublicClient";

const CHUNK_SIZE = 10 * 1024 * 1024;

interface FieldConfig {
  name?: string;
  isChunk?: boolean;
}

interface Part {
  ETag: string;
  PartNumber: number;
}

export const resolveFileUploads = async (
  formData: Record<string, any>,
  fields: FieldConfig[],
  onProgress?: (field: string, percent: number) => void,
) => {
  const updatedData = { ...formData };

  for (const field of fields) {
    if (!field.name) continue;

    const value = updatedData[field.name];

    if (!(value instanceof File)) continue;

    if (field.isChunk) {
      const file = value;

      const startRes = await apiPublicClient.post("/start", {
        fileName: file.name,
        fileType: file.type,
      });

      const { uploadId, key } = startRes.data;

      const parts: Part[] = [];
      let partNumber = 1;
      let uploadedBytes = 0;

      // 2️⃣ Upload chunks
      for (let start = 0; start < file.size; start += CHUNK_SIZE) {
        const chunk = file.slice(start, start + CHUNK_SIZE);

        const res = await apiPublicClient.put(`/part-url`, chunk, {
          params: {
            uploadId,
            partNumber,
            key,
          },
          headers: {
            "Content-Type": file.type,
          },
        });

        const { ETag } = res.data;

        parts.push({
          ETag,
          PartNumber: partNumber,
        });

        uploadedBytes += chunk.size;

        if (onProgress) {
          const percent = Math.round((uploadedBytes / file.size) * 100);
          onProgress(field.name, percent);
        }

        partNumber++;
      }

      const completeRes = await apiPublicClient.post("/complete", {
        uploadId,
        key,
        parts,
      });

      updatedData[field.name] = completeRes.data.location;
    } else {
      updatedData[field.name] = value;
    }
  }

  return updatedData;
};
