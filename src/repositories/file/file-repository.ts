import API from "@/utils/api";
import type { AxiosResponse } from "axios";

interface FileRepository {
  uploadOne: (file: File) => Promise<AxiosResponse>;
}

export const fileRepository: FileRepository = {
  uploadOne: (file: File) => API.post("/upload", file),
};
