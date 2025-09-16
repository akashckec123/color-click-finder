import { useRef, useEffect, useState, MouseEvent } from "react";
import { Card } from "@/components/ui/card";
import { rgbToHex, getClosestColor, ColorData } from "@/lib/colors";
import { ColorDisplay } from "./ColorDisplay";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";

interface ColorDetectorProps {
  imageFile: File;
}

interface ColorInfo {
  rgb: { r: number; g: number; b: number };
  hex: string;
  closestColor: ColorData;
  clickPosition: { x: number; y: number };
}

export const ColorDetector = ({ imageFile }: ColorDetectorProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [colorInfo, setColorInfo] = useState<ColorInfo | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imageUrl = URL.createObjectURL(imageFile);
    
    img.onload = () => {
      // Set canvas size to match image
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      
      // Draw image on canvas
      ctx.drawImage(img, 0, 0);
      setImageLoaded(true);
      
      // Clean up object URL
      URL.revokeObjectURL(imageUrl);
    };
    
    img.src = imageUrl;

    return () => {
      URL.revokeObjectURL(imageUrl);
    };
  }, [imageFile]);

  const handleImageClick = (event: MouseEvent<HTMLDivElement>) => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img || !imageLoaded) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    const x = Math.round((event.clientX - rect.left) * scaleX);
    const y = Math.round((event.clientY - rect.top) * scaleY);

    // Get pixel data
    const imageData = ctx.getImageData(x, y, 1, 1);
    const data = imageData.data;
    
    const rgb = {
      r: data[0],
      g: data[1],
      b: data[2]
    };
    
    const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
    const closestColor = getClosestColor(rgb.r, rgb.g, rgb.b);
    
    setColorInfo({
      rgb,
      hex,
      closestColor,
      clickPosition: { x, y }
    });
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-gradient-subtle border-0 shadow-subtle">
        <div className="text-center mb-4">
          <Badge variant="outline" className="bg-accent/10 text-accent-foreground border-accent/20">
            <Eye className="h-4 w-4 mr-2" />
            Click anywhere on the image to detect colors
          </Badge>
        </div>
        
        <div 
          className="relative inline-block cursor-crosshair hover:shadow-glow transition-smooth rounded-lg overflow-hidden border-2 border-primary/20"
          onClick={handleImageClick}
        >
          <img
            ref={imgRef}
            alt="Color detection"
            className="max-w-full max-h-96 object-contain"
          />
          <canvas
            ref={canvasRef}
            className="hidden"
          />
        </div>
      </Card>

      {colorInfo && (
        <ColorDisplay
          rgb={colorInfo.rgb}
          hex={colorInfo.hex}
          closestColor={colorInfo.closestColor}
          clickPosition={colorInfo.clickPosition}
        />
      )}
    </div>
  );
};