import { useState } from "react";
import { ImageUpload } from "@/components/ImageUpload";
import { ColorDetector } from "@/components/ColorDetector";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Palette, Sparkles } from "lucide-react";

const Index = () => {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  const handleImageUpload = (file: File) => {
    setUploadedImage(file);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-primary rounded-xl shadow-glow">
              <Palette className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Color Detection App
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload an image and click anywhere to instantly detect RGB values, hex codes, and color names. 
            Perfect for designers, developers, and color enthusiasts!
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              <Sparkles className="h-3 w-3 mr-1" />
              Real-time Detection
            </Badge>
            <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
              PNG, JPG & JPEG Support
            </Badge>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {!uploadedImage ? (
            <ImageUpload 
              onImageUpload={handleImageUpload}
              hasImage={!!uploadedImage}
            />
          ) : (
            <div className="space-y-6">
              <ImageUpload 
                onImageUpload={handleImageUpload}
                hasImage={!!uploadedImage}
              />
              <ColorDetector imageFile={uploadedImage} />
            </div>
          )}
        </div>

        {/* Features */}
        {!uploadedImage && (
          <div className="mt-16 max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-center mb-8">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 text-center bg-white/50 border-0 shadow-subtle hover:shadow-color transition-smooth">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <div className="w-6 h-6 bg-red-500 rounded" />
                </div>
                <h3 className="font-semibold mb-2">RGB Values</h3>
                <p className="text-sm text-muted-foreground">
                  Get precise red, green, and blue color values
                </p>
              </Card>
              
              <Card className="p-6 text-center bg-white/50 border-0 shadow-subtle hover:shadow-color transition-smooth">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 font-mono font-bold text-sm">#</span>
                </div>
                <h3 className="font-semibold mb-2">Hex Codes</h3>
                <p className="text-sm text-muted-foreground">
                  Perfect hexadecimal codes for web development
                </p>
              </Card>
              
              <Card className="p-6 text-center bg-white/50 border-0 shadow-subtle hover:shadow-color transition-smooth">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Palette className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">Color Names</h3>
                <p className="text-sm text-muted-foreground">
                  Human-readable color names from our database
                </p>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;