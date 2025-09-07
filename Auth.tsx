import React, { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useNavigate } from 'react-router-dom';
import { Camera, Upload, CheckCircle, RotateCcw } from 'lucide-react';

const countries = [
  { code: '+1', name: 'United States', flag: '🇺🇸' },
  { code: '+44', name: 'United Kingdom', flag: '🇬🇧' },
  { code: '+971', name: 'UAE', flag: '🇦🇪' },
  { code: '+966', name: 'Saudi Arabia', flag: '🇸🇦' },
  { code: '+20', name: 'Egypt', flag: '🇪🇬' },
  { code: '+962', name: 'Jordan', flag: '🇯🇴' },
  { code: '+961', name: 'Lebanon', flag: '🇱🇧' },
  { code: '+212', name: 'Morocco', flag: '🇲🇦' },
  { code: '+213', name: 'Algeria', flag: '🇩🇿' },
  { code: '+216', name: 'Tunisia', flag: '🇹🇳' },
  { code: '+964', name: 'Iraq', flag: '🇮🇶' },
  { code: '+965', name: 'Kuwait', flag: '🇰🇼' },
  { code: '+973', name: 'Bahrain', flag: '🇧🇭' },
  { code: '+974', name: 'Qatar', flag: '🇶🇦' },
  { code: '+968', name: 'Oman', flag: '🇴🇲' },
  { code: '+967', name: 'Yemen', flag: '🇾🇪' },
  { code: '+49', name: 'Germany', flag: '🇩🇪' },
  { code: '+33', name: 'France', flag: '🇫🇷' },
  { code: '+39', name: 'Italy', flag: '🇮🇹' },
  { code: '+34', name: 'Spain', flag: '🇪🇸' },
  { code: '+86', name: 'China', flag: '🇨🇳' },
  { code: '+81', name: 'Japan', flag: '🇯🇵' },
  { code: '+91', name: 'India', flag: '🇮🇳' },
];

const PokerBubble = ({ delay }: { delay: number }) => (
  <div 
    className="absolute animate-bounce"
    style={{
      left: `${Math.random() * 100}%`,
      animationDelay: `${delay}s`,
      animationDuration: `${3 + Math.random() * 2}s`
    }}
  >
    <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full shadow-lg opacity-70 animate-pulse">
      <div className="w-full h-full flex items-center justify-center text-white text-xs font-bold">
        {['♠', '♥', '♦', '♣', '👑'][Math.floor(Math.random() * 5)]}
      </div>
    </div>
  </div>
);

export default function Auth() {
  const navigate = useNavigate();
  const [step, setStep] = useState<'login' | 'register' | 'biometric' | 'verification'>('login');
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    idType: 'national',
    idFile: null as File | null,
    password: ''
  });
  const [biometricStep, setBiometricStep] = useState<'selfie' | 'up' | 'down' | 'left' | 'right' | 'complete'>('selfie');
  const [verificationCode, setVerificationCode] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const startCamera = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error('Camera access denied:', error);
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  }, [stream]);

  const handleBiometricNext = () => {
    const steps: typeof biometricStep[] = ['selfie', 'up', 'down', 'left', 'right', 'complete'];
    const currentIndex = steps.indexOf(biometricStep);
    if (currentIndex < steps.length - 1) {
      setBiometricStep(steps[currentIndex + 1]);
    } else {
      stopCamera();
      setStep('verification');
      // Simulate sending verification code
      console.log('Verification Code sent to:', formData.email, 'Code: 123456');
    }
  };

  const handleVerification = () => {
    if (verificationCode === '123456') {
      // Save user data to localStorage
      localStorage.setItem('userData', JSON.stringify(formData));
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/dashboard');
    } else {
      alert('Invalid verification code. Please try 123456');
    }
  };

  const handleLogin = () => {
    // Simple login simulation
    if (formData.email && formData.password) {
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/dashboard');
    }
  };

  const biometricInstructions = {
    selfie: 'Take a clear selfie photo',
    up: 'Move your head UP',
    down: 'Move your head DOWN', 
    left: 'Turn your head LEFT',
    right: 'Turn your head RIGHT',
    complete: 'Verification Complete!'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black relative overflow-hidden">
      {/* Floating Poker Bubbles */}
      {Array.from({ length: 15 }).map((_, i) => (
        <PokerBubble key={i} delay={i * 0.5} />
      ))}
      
      {/* Animated Logo */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent animate-pulse">
            JAAFAR AL-SAYED
          </h1>
          <div className="flex items-center justify-center mt-2">
            <div className="animate-spin-slow">
              <div className="text-3xl md:text-4xl font-bold text-yellow-400 flex items-center gap-2">
                <span className="animate-bounce">♠</span>
                <span>POKER</span>
                <span className="animate-bounce delay-100">♥</span>
              </div>
            </div>
          </div>
          <div className="text-yellow-300 text-sm mt-1 animate-pulse">👑 ROYAL GAMING EXPERIENCE 👑</div>
        </div>
      </div>

      <div className="flex items-center justify-center min-h-screen pt-32 pb-8 px-4">
        <Card className="w-full max-w-md bg-black/50 backdrop-blur-md border-yellow-500/30 shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-yellow-400">
              {step === 'login' ? (isLogin ? 'Login' : 'Register') : 
               step === 'biometric' ? 'Biometric Verification' : 'Email Verification'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {step === 'login' && (
              <>
                {!isLogin && (
                  <>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label htmlFor="firstName" className="text-yellow-300">First Name</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                          className="bg-gray-800 border-yellow-500/30 text-white"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName" className="text-yellow-300">Last Name</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                          className="bg-gray-800 border-yellow-500/30 text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="country" className="text-yellow-300">Country</Label>
                      <Select onValueChange={(value) => setFormData(prev => ({ ...prev, country: value }))}>
                        <SelectTrigger className="bg-gray-800 border-yellow-500/30 text-white">
                          <SelectValue placeholder="Select Country" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-yellow-500/30">
                          {countries.map((country) => (
                            <SelectItem key={country.code} value={country.code} className="text-white">
                              {country.flag} {country.name} ({country.code})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-yellow-300">Phone Number</Label>
                      <div className="flex">
                        <div className="bg-gray-800 border border-yellow-500/30 rounded-l-md px-3 py-2 text-yellow-400">
                          {formData.country || '+1'}
                        </div>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                          className="bg-gray-800 border-yellow-500/30 text-white rounded-l-none"
                          placeholder="Phone number"
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="text-yellow-300">ID Type</Label>
                      <RadioGroup
                        value={formData.idType}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, idType: value }))}
                        className="flex space-x-4 mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="national" id="national" className="border-yellow-500" />
                          <Label htmlFor="national" className="text-white">National ID</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="passport" id="passport" className="border-yellow-500" />
                          <Label htmlFor="passport" className="text-white">Passport</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div>
                      <Label htmlFor="idFile" className="text-yellow-300">Upload ID</Label>
                      <div className="mt-2">
                        <label className="flex items-center justify-center w-full h-12 border-2 border-dashed border-yellow-500/30 rounded-lg cursor-pointer hover:border-yellow-500/50 transition-colors">
                          <Upload className="w-5 h-5 text-yellow-400 mr-2" />
                          <span className="text-white">Choose file</span>
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => setFormData(prev => ({ ...prev, idFile: e.target.files?.[0] || null }))}
                          />
                        </label>
                      </div>
                    </div>
                  </>
                )}

                <div>
                  <Label htmlFor="email" className="text-yellow-300">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="bg-gray-800 border-yellow-500/30 text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="password" className="text-yellow-300">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    className="bg-gray-800 border-yellow-500/30 text-white"
                  />
                </div>

                <Button
                  onClick={isLogin ? handleLogin : () => setStep('biometric')}
                  className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold"
                >
                  {isLogin ? 'Login' : 'Continue to Verification'}
                </Button>

                <div className="text-center">
                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-yellow-400 hover:text-yellow-300 underline"
                  >
                    {isLogin ? 'Create new account' : 'Already have an account?'}
                  </button>
                </div>
              </>
            )}

            {step === 'biometric' && (
              <div className="text-center space-y-4">
                <div className="text-yellow-300 text-lg font-semibold">
                  {biometricInstructions[biometricStep]}
                </div>
                
                <div className="relative bg-gray-800 rounded-lg overflow-hidden">
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 border-4 border-yellow-500/50 rounded-lg pointer-events-none">
                    <div className="absolute top-2 left-2 w-8 h-8 border-l-4 border-t-4 border-yellow-500"></div>
                    <div className="absolute top-2 right-2 w-8 h-8 border-r-4 border-t-4 border-yellow-500"></div>
                    <div className="absolute bottom-2 left-2 w-8 h-8 border-l-4 border-b-4 border-yellow-500"></div>
                    <div className="absolute bottom-2 right-2 w-8 h-8 border-r-4 border-b-4 border-yellow-500"></div>
                  </div>
                </div>

                {!stream && (
                  <Button
                    onClick={startCamera}
                    className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold"
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    Start Camera
                  </Button>
                )}

                {stream && biometricStep !== 'complete' && (
                  <Button
                    onClick={handleBiometricNext}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Next Step
                  </Button>
                )}

                {biometricStep === 'complete' && (
                  <Button
                    onClick={handleBiometricNext}
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold animate-pulse"
                  >
                    Continue to Email Verification
                  </Button>
                )}
              </div>
            )}

            {step === 'verification' && (
              <div className="space-y-4 text-center">
                <div className="text-yellow-300">
                  We sent a verification code to: <br />
                  <span className="text-white font-semibold">{formData.email}</span>
                </div>
                
                <div className="bg-gray-800 p-4 rounded-lg border border-yellow-500/30">
                  <div className="text-yellow-400 text-sm">Console Output:</div>
                  <div className="text-green-400 font-mono text-sm">
                    Email: {formData.email}<br />
                    Code: 123456
                  </div>
                </div>

                <div>
                  <Label htmlFor="code" className="text-yellow-300">Verification Code</Label>
                  <Input
                    id="code"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    className="bg-gray-800 border-yellow-500/30 text-white text-center text-2xl font-bold"
                    placeholder="Enter 6-digit code"
                    maxLength={6}
                  />
                </div>

                <Button
                  onClick={handleVerification}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold"
                >
                  Verify & Continue
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}