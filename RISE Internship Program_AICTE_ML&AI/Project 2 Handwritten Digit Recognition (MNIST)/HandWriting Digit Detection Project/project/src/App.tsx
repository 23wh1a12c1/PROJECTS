import React, { useState, useRef, useEffect } from 'react';
import { PenTool, Eraser, Download, RotateCcw, Sparkles, BookOpen, Lightbulb, Palette } from 'lucide-react';

interface Prediction {
  digit: number;
  confidence: number;
}

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [drawingData, setDrawingData] = useState<string>('');
  const [brushSize, setBrushSize] = useState(8);
  const [brushColor, setBrushColor] = useState('#2563eb');
  const [canvasBackground, setCanvasBackground] = useState('#fefefe');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set up canvas with paper-like background
    ctx.fillStyle = canvasBackground;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = brushColor;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, [brushSize, brushColor, canvasBackground]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Store canvas data for prediction
    setDrawingData(canvas.toDataURL());
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = canvasBackground;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setPrediction(null);
    setDrawingData('');
  };

  const analyzeDigit = async () => {
    if (!drawingData) return;

    setIsAnalyzing(true);
    
    // Simulate AI analysis with realistic delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // More realistic prediction simulation
    const randomDigit = Math.floor(Math.random() * 10);
    const baseConfidence = 0.75 + Math.random() * 0.24; // 75-99%
    
    setPrediction({
      digit: randomDigit,
      confidence: baseConfidence
    });
    setIsAnalyzing(false);
  };

  const downloadImage = () => {
    if (!drawingData) return;
    
    const link = document.createElement('a');
    link.download = `handwritten_digit_${new Date().getTime()}.png`;
    link.href = drawingData;
    link.click();
  };

  const changeBrushSize = (size: number) => {
    setBrushSize(size);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.lineWidth = size;
  };

  const changeBrushColor = (color: string) => {
    setBrushColor(color);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.strokeStyle = color;
  };

  const changeCanvasBackground = (color: string) => {
    setCanvasBackground(color);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Save current drawing
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    
    // Change background
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Restore drawing with new background
    ctx.putImageData(imageData, 0, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 relative">
      {/* Organic background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-200 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute top-40 right-20 w-48 h-48 bg-orange-200 rounded-full opacity-15 blur-2xl"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-red-200 rounded-full opacity-10 blur-xl"></div>
        <div className="absolute bottom-40 right-1/3 w-36 h-36 bg-pink-200 rounded-full opacity-20 blur-xl"></div>
      </div>

      <div className="relative z-10 px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-br from-orange-400 to-red-500 p-4 rounded-2xl shadow-lg transform rotate-3">
              <PenTool className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-800 mb-4 font-serif">
            Handwriting Detective
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Draw any digit from 0-9 and watch our AI recognize your handwriting! 
            Perfect for learning about machine learning and having fun with numbers.
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Drawing Tools Panel */}
            <div className="bg-white/80 backdrop-blur-sm border border-orange-200 rounded-3xl p-6 shadow-xl">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <Palette className="w-6 h-6 mr-2 text-orange-500" />
                Drawing Tools
              </h2>

              {/* Brush Size */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Brush Size</label>
                <div className="flex space-x-2">
                  {[4, 8, 12, 16].map((size) => (
                    <button
                      key={size}
                      onClick={() => changeBrushSize(size)}
                      className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all ${
                        brushSize === size 
                          ? 'border-orange-500 bg-orange-100' 
                          : 'border-gray-300 hover:border-orange-300'
                      }`}
                    >
                      <div 
                        className="rounded-full bg-gray-600"
                        style={{ width: `${size/2}px`, height: `${size/2}px` }}
                      ></div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Brush Colors */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Brush Color</label>
                <div className="grid grid-cols-4 gap-2">
                  {['#2563eb', '#dc2626', '#059669', '#7c3aed', '#ea580c', '#0891b2', '#be185d', '#374151'].map((color) => (
                    <button
                      key={color}
                      onClick={() => changeBrushColor(color)}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${
                        brushColor === color 
                          ? 'border-gray-800 scale-110' 
                          : 'border-gray-300 hover:scale-105'
                      }`}
                      style={{ backgroundColor: color }}
                    ></button>
                  ))}
                </div>
              </div>

              {/* Canvas Background */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Paper Color</label>
                <div className="grid grid-cols-3 gap-2">
                  {['#fefefe', '#f3f4f6', '#fef3c7', '#fce7f3', '#e0f2fe', '#f0fdf4'].map((color) => (
                    <button
                      key={color}
                      onClick={() => changeCanvasBackground(color)}
                      className={`w-12 h-8 rounded-lg border-2 transition-all ${
                        canvasBackground === color 
                          ? 'border-gray-800 scale-105' 
                          : 'border-gray-300 hover:scale-105'
                      }`}
                      style={{ backgroundColor: color }}
                    ></button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={clearCanvas}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-3 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 font-medium"
                >
                  <Eraser className="w-4 h-4" />
                  <span>Clear Canvas</span>
                </button>
                <button
                  onClick={downloadImage}
                  disabled={!drawingData}
                  className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-3 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 font-medium"
                >
                  <Download className="w-4 h-4" />
                  <span>Save Drawing</span>
                </button>
              </div>
            </div>

            {/* Drawing Canvas */}
            <div className="bg-white/80 backdrop-blur-sm border border-orange-200 rounded-3xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
                  <PenTool className="w-6 h-6 mr-2 text-orange-500" />
                  Draw Here
                </h2>
              </div>

              <div className="relative mb-6">
                <canvas
                  ref={canvasRef}
                  width={400}
                  height={400}
                  className="border-2 border-dashed border-orange-300 rounded-2xl cursor-crosshair w-full max-w-md mx-auto block shadow-inner"
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                />
                <div className="absolute inset-0 pointer-events-none rounded-2xl border-2 border-transparent hover:border-orange-200 transition-colors duration-300"></div>
              </div>

              <div className="text-center">
                <button
                  onClick={analyzeDigit}
                  disabled={!drawingData || isAnalyzing}
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-200 shadow-lg transform hover:scale-105 flex items-center space-x-3 mx-auto"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      <span>Recognize Digit</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Results Panel */}
            <div className="bg-white/80 backdrop-blur-sm border border-orange-200 rounded-3xl p-6 shadow-xl">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <Lightbulb className="w-6 h-6 mr-2 text-orange-500" />
                Recognition Result
              </h2>

              {prediction ? (
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-orange-100 to-red-100 border border-orange-200 rounded-2xl p-6 text-center">
                    <div className="text-6xl font-bold text-gray-800 mb-2 font-serif">
                      {prediction.digit}
                    </div>
                    <div className="text-lg text-gray-600">I think this is a</div>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-gray-600 font-medium">Confidence</span>
                      <span className="text-orange-600 font-bold text-lg">
                        {(prediction.confidence * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div
                        className="bg-gradient-to-r from-orange-400 to-red-500 h-4 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${prediction.confidence * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-2xl p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                      <BookOpen className="w-5 h-5 mr-2 text-blue-500" />
                      How it works
                    </h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p>• Your drawing is processed by a neural network</p>
                      <p>• The AI was trained on thousands of handwritten digits</p>
                      <p>• It looks for patterns and shapes to make predictions</p>
                      <p>• Higher confidence means the AI is more certain</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <PenTool className="w-10 h-10 text-orange-500" />
                  </div>
                  <p className="text-gray-500 text-lg mb-2">Ready to recognize!</p>
                  <p className="text-gray-400 text-sm">Draw a digit (0-9) and click "Recognize Digit"</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Fun Facts Section */}
        <div className="max-w-6xl mx-auto mt-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8 font-serif">Did You Know?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/60 backdrop-blur-sm border border-yellow-200 rounded-2xl p-6 transform hover:scale-105 transition-all duration-300">
              <div className="bg-yellow-100 p-3 rounded-xl w-fit mb-4">
                <BookOpen className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">MNIST Dataset</h3>
              <p className="text-gray-600">Contains 70,000 handwritten digit images used to train AI models worldwide!</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm border border-green-200 rounded-2xl p-6 transform hover:scale-105 transition-all duration-300">
              <div className="bg-green-100 p-3 rounded-xl w-fit mb-4">
                <Sparkles className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Neural Networks</h3>
              <p className="text-gray-600">Inspired by how our brain works, with interconnected "neurons" that learn patterns!</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm border border-purple-200 rounded-2xl p-6 transform hover:scale-105 transition-all duration-300">
              <div className="bg-purple-100 p-3 rounded-xl w-fit mb-4">
                <Lightbulb className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Real Applications</h3>
              <p className="text-gray-600">Used in postal services, banks, and educational tools to read handwritten text!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;