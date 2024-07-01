import { useState } from 'react';
import {uploadThingConfig} from "@/app.config.tsx";

interface UploadResponse {
  name: string;
  url: string;
  // Add any other fields your Go backend returns
}

interface UploadHookOptions {
  onClientUploadComplete?: (res: UploadResponse[]) => void;
  onUploadError?: (error: Error) => void;
  onBeforeUploadBegin?: (files: File[]) => File[];
  onUploadBegin?: (name: string) => void;
}

export const useCustomUpload = (options: UploadHookOptions) => {
  const [isUploading, setIsUploading] = useState(false);

  const uploadFiles = async (files: File[]) => {
    setIsUploading(true);

    try {
      if (options.onBeforeUploadBegin) {
        files = options.onBeforeUploadBegin(files);
      }

      const formData = new FormData();
      files.forEach((file) => {
        formData.append('files', file);
        if (options.onUploadBegin) {
          options.onUploadBegin(file.name);
        }
      });

      const response = await fetch(uploadThingConfig.uploadURL, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: UploadResponse[] = await response.json();

      if (options.onClientUploadComplete) {
        options.onClientUploadComplete(data);
      }
    } catch (error) {
      if (options.onUploadError && error instanceof Error) {
        options.onUploadError(error);
      }
    } finally {
      setIsUploading(false);
    }
  };

  return { uploadFiles, isUploading };
};
