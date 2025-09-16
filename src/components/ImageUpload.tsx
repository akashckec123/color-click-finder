import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
  hasImage: boolean;
}

export const ImageUpload = ({ onImageUpload, hasImage }: ImageUploadProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      onImageUpload(file);
    }
  }, [onImageUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg']
    },
    multiple: false
  });

  if (hasImage) {
    return (
      <div className="flex justify-center mb-6">
        <Button
          {...getRootProps()}
          variant="outline"
          className="transition-smooth hover:scale-105 hover:shadow-subtle"
        >
          <input {...getInputProps()} />
          <ImageIcon className="mr-2 h-4 w-4" />
          Upload New Image
        </Button>
      </div>
    );
  }

  return (
    <Card 
      {...getRootProps()}
      className={`
        p-12 border-2 border-dashed cursor-pointer transition-smooth
        hover:shadow-glow hover:border-primary hover:scale-[1.02]
        ${isDragActive ? 'border-primary bg-primary/5 scale-[1.02]' : 'border-muted'}
      `}
    >
      <input {...getInputProps()} />
      <div className="text-center space-y-4">
        <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
          <Upload className="h-8 w-8 text-primary-foreground" />
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">
            {isDragActive ? "Drop your image here!" : "Upload an Image"}
          </h3>
          <p className="text-muted-foreground mb-4">
            Drag & drop an image or click to browse
          </p>
          <p className="text-sm text-muted-foreground">
            Supports PNG, JPG, JPEG files
          </p>
        </div>
      </div>
    </Card>
  );
};