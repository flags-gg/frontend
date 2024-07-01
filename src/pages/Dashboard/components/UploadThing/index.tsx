import React from 'react';
import { useCustomUpload } from '@DL/ut';

interface UploadButtonProps {
  onClientUploadComplete?: (res: any[]) => void;
  onUploadError?: (error: Error) => void;
  onBeforeUploadBegin?: (files: File[]) => File[];
  onUploadBegin?: (name: string) => void;
}

export const CustomUploadButton: React.FC<UploadButtonProps> = (props) => {
  const { uploadFiles, isUploading } = useCustomUpload(props);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      uploadFiles(Array.from(files));
    }
  };

  return (
    <div>
      <input
        type="file"
        onChange={handleFileChange}
        multiple
        disabled={isUploading}
      />
      {isUploading && <p>Uploading...</p>}
    </div>
  );
};
