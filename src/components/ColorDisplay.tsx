import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ColorData } from "@/lib/colors";
import { Copy, Palette, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ColorDisplayProps {
  rgb: { r: number; g: number; b: number };
  hex: string;
  closestColor: ColorData;
  clickPosition: { x: number; y: number };
}

export const ColorDisplay = ({ rgb, hex, closestColor, clickPosition }: ColorDisplayProps) => {
  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast(`${type} copied to clipboard!`);
  };

  return (
    <Card className="p-6 bg-gradient-subtle border-0 shadow-color transition-smooth hover:shadow-glow">
      <div className="space-y-6">
        {/* Color Swatch */}
        <div className="flex items-center gap-4">
          <div 
            className="w-20 h-20 rounded-xl shadow-subtle border-4 border-white transition-bounce hover:scale-110"
            style={{ backgroundColor: hex }}
          />
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <Palette className="h-6 w-6 text-primary" />
              {closestColor.name}
            </h3>
            <p className="text-muted-foreground">
              Clicked at position ({clickPosition.x}, {clickPosition.y})
            </p>
          </div>
        </div>

        {/* Color Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* RGB Values */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                RGB
              </Badge>
            </div>
            <div className="bg-white/50 p-3 rounded-lg border">
              <div className="text-sm font-mono">
                <div>R: {rgb.r}</div>
                <div>G: {rgb.g}</div>
                <div>B: {rgb.b}</div>
              </div>
              <Button
                size="sm"
                variant="ghost"
                className="mt-2 h-6 px-2 text-xs hover:bg-white/80"
                onClick={() => copyToClipboard(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, "RGB")}
              >
                <Copy className="h-3 w-3 mr-1" />
                Copy
              </Button>
            </div>
          </div>

          {/* Hex Value */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                <Hash className="h-3 w-3 mr-1" />
                HEX
              </Badge>
            </div>
            <div className="bg-white/50 p-3 rounded-lg border">
              <div className="text-sm font-mono font-bold">
                {hex}
              </div>
              <Button
                size="sm"
                variant="ghost"
                className="mt-2 h-6 px-2 text-xs hover:bg-white/80"
                onClick={() => copyToClipboard(hex, "Hex")}
              >
                <Copy className="h-3 w-3 mr-1" />
                Copy
              </Button>
            </div>
          </div>

          {/* Closest Color */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                Color
              </Badge>
            </div>
            <div className="bg-white/50 p-3 rounded-lg border">
              <div className="flex items-center gap-2">
                <div 
                  className="w-4 h-4 rounded border"
                  style={{ backgroundColor: closestColor.hex }}
                />
                <span className="text-sm font-medium">{closestColor.name}</span>
              </div>
              <Button
                size="sm"
                variant="ghost"
                className="mt-2 h-6 px-2 text-xs hover:bg-white/80"
                onClick={() => copyToClipboard(closestColor.name, "Color name")}
              >
                <Copy className="h-3 w-3 mr-1" />
                Copy
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};