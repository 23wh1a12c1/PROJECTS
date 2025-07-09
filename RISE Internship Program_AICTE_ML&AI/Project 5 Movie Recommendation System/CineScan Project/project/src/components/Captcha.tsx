import React, { useState, useEffect, useRef } from 'react';
import { RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

interface CaptchaProps {
  onVerify: (isValid: boolean) => void;
  onCaptchaChange: (captcha: string) => void;
}

const Captcha: React.FC<CaptchaProps> = ({ onVerify, onCaptchaChange }) => {
  const [captchaText, setCaptchaText] = useState('');
  const [userInput, setUserInput] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(result);
    return result;
  };

  const drawCaptcha = (text: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set background with gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#1e1b4b');
    gradient.addColorStop(1, '#312e81');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add noise lines
    for (let i = 0; i < 5; i++) {
      ctx.strokeStyle = `rgba(147, 51, 234, ${Math.random() * 0.5 + 0.2})`;
      ctx.lineWidth = Math.random() * 2 + 1;
      ctx.beginPath();
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.stroke();
    }

    // Draw text with random colors and positions
    ctx.font = 'bold 24px Arial';
    ctx.textBaseline = 'middle';
    
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const x = 20 + i * 25 + Math.random() * 10 - 5;
      const y = canvas.height / 2 + Math.random() * 10 - 5;
      
      // Random color for each character
      const colors = ['#ffffff', '#fbbf24', '#f59e0b', '#d97706', '#92400e'];
      ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
      
      // Random rotation
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate((Math.random() - 0.5) * 0.4);
      ctx.fillText(char, 0, 0);
      ctx.restore();
    }

    // Add noise dots
    for (let i = 0; i < 50; i++) {
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.3})`;
      ctx.fillRect(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        2,
        2
      );
    }
  };

  useEffect(() => {
    const newCaptcha = generateCaptcha();
    drawCaptcha(newCaptcha);
  }, []);

  useEffect(() => {
    drawCaptcha(captchaText);
  }, [captchaText]);

  const handleRefresh = () => {
    const newCaptcha = generateCaptcha();
    setUserInput('');
    onCaptchaChange('');
    onVerify(false);
  };

  const handleInputChange = (value: string) => {
    setUserInput(value);
    onCaptchaChange(value);
    const isValid = value.toLowerCase() === captchaText.toLowerCase();
    onVerify(isValid);
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-200">
        Security Verification
      </label>
      
      <div className="flex items-center space-x-3">
        <div className="relative">
          <canvas
            ref={canvasRef}
            width={180}
            height={60}
            className="border border-white/20 rounded-lg bg-slate-800"
          />
        </div>
        
        <motion.button
          type="button"
          onClick={handleRefresh}
          className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-gray-300 hover:text-white transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <RefreshCw className="h-5 w-5" />
        </motion.button>
      </div>
      
      <input
        type="text"
        value={userInput}
        onChange={(e) => handleInputChange(e.target.value)}
        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
        placeholder="Enter the characters shown above"
        maxLength={6}
      />
      
      {userInput && (
        <div className="text-sm">
          {userInput.toLowerCase() === captchaText.toLowerCase() ? (
            <span className="text-green-400">✓ Verification successful</span>
          ) : (
            <span className="text-red-400">✗ Please enter the correct characters</span>
          )}
        </div>
      )}
    </div>
  );
};

export default Captcha;