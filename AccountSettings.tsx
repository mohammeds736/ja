import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Camera, Upload, Save, Globe } from 'lucide-react';

interface UserData {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  country?: string;
  idType?: string;
  password?: string;
}

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
];

export default function AccountSettings() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData>({});
  const [profileImage, setProfileImage] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  useEffect(() => {
    const stored = localStorage.getItem('userData');
    if (stored) {
      setUserData(JSON.parse(stored));
    }
    
    const storedLang = localStorage.getItem('selectedLanguage');
    if (storedLang) {
      setSelectedLanguage(storedLang);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('userData', JSON.stringify(userData));
    localStorage.setItem('selectedLanguage', selectedLanguage);
    
    // Simulate language change effect
    console.log(`🌐 Language changed to: ${languages.find(l => l.code === selectedLanguage)?.name}`);
    alert('Settings saved successfully!');
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button
            onClick={() => navigate('/dashboard')}
            className="bg-yellow-500 hover:bg-yellow-600 text-black mr-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
            Account Settings
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Profile Information */}
          <Card className="bg-black/50 border-yellow-500/30">
            <CardHeader>
              <CardTitle className="text-yellow-400 flex items-center gap-2">
                <Camera className="w-5 h-5" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Image */}
              <div className="text-center">
                <div className="relative inline-block">
                  <div className="w-32 h-32 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center overflow-hidden border-4 border-yellow-500">
                    {profileImage ? (
                      <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <Camera className="w-12 h-12 text-white" />
                    )}
                  </div>
                  <label className="absolute bottom-0 right-0 bg-yellow-500 hover:bg-yellow-600 text-black p-2 rounded-full cursor-pointer transition-colors">
                    <Upload className="w-4 h-4" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                <p className="text-gray-400 text-sm mt-2">Click to upload profile picture</p>
              </div>

              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName" className="text-yellow-300">First Name</Label>
                  <Input
                    id="firstName"
                    value={userData.firstName || ''}
                    onChange={(e) => setUserData(prev => ({ ...prev, firstName: e.target.value }))}
                    className="bg-gray-800 border-yellow-500/30 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName" className="text-yellow-300">Last Name</Label>
                  <Input
                    id="lastName"
                    value={userData.lastName || ''}
                    onChange={(e) => setUserData(prev => ({ ...prev, lastName: e.target.value }))}
                    className="bg-gray-800 border-yellow-500/30 text-white"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <Label htmlFor="phone" className="text-yellow-300">Phone Number</Label>
                <div className="flex">
                  <div className="bg-gray-800 border border-yellow-500/30 rounded-l-md px-3 py-2 text-yellow-400">
                    {userData.country || '+1'}
                  </div>
                  <Input
                    id="phone"
                    value={userData.phone || ''}
                    onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))}
                    className="bg-gray-800 border-yellow-500/30 text-white rounded-l-none"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Language & Preferences */}
          <Card className="bg-black/50 border-yellow-500/30">
            <CardHeader>
              <CardTitle className="text-yellow-400 flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Language & Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Language Selection */}
              <div>
                <Label className="text-yellow-300">Select Language</Label>
                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger className="bg-gray-800 border-yellow-500/30 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-yellow-500/30">
                    {languages.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code} className="text-white hover:bg-yellow-500/20">
                        <div className="flex items-center gap-2">
                          <span>{lang.flag}</span>
                          <span>{lang.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-gray-400 text-sm mt-2">
                  Current: {languages.find(l => l.code === selectedLanguage)?.flag} {languages.find(l => l.code === selectedLanguage)?.name}
                </p>
              </div>

              {/* Language Preview */}
              <div className="bg-gray-800/50 p-4 rounded-lg border border-yellow-500/20">
                <h3 className="text-yellow-400 font-semibold mb-2">Language Preview</h3>
                <div className="space-y-2 text-sm">
                  {selectedLanguage === 'ar' && (
                    <div className="text-white text-right">
                      <p>مرحباً بك في لعبة البوكر</p>
                      <p>جعفر السيد بوكر</p>
                    </div>
                  )}
                  {selectedLanguage === 'en' && (
                    <div className="text-white">
                      <p>Welcome to Poker Game</p>
                      <p>Jaafar Al-Sayed Poker</p>
                    </div>
                  )}
                  {selectedLanguage === 'fr' && (
                    <div className="text-white">
                      <p>Bienvenue au Jeu de Poker</p>
                      <p>Jaafar Al-Sayed Poker</p>
                    </div>
                  )}
                  {selectedLanguage === 'es' && (
                    <div className="text-white">
                      <p>Bienvenido al Juego de Poker</p>
                      <p>Jaafar Al-Sayed Poker</p>
                    </div>
                  )}
                  {!['ar', 'en', 'fr', 'es'].includes(selectedLanguage) && (
                    <div className="text-white">
                      <p>Welcome to Poker Game</p>
                      <p>Jaafar Al-Sayed Poker</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Game Preferences */}
              <div className="space-y-4">
                <h3 className="text-yellow-400 font-semibold">Game Preferences</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <Card className="bg-gray-800/30 border-yellow-500/20 p-4">
                    <div className="text-center">
                      <div className="text-2xl mb-2">🔊</div>
                      <p className="text-white text-sm">Sound Effects</p>
                      <Button className="mt-2 bg-green-500 hover:bg-green-600 text-white text-xs px-3 py-1">
                        ON
                      </Button>
                    </div>
                  </Card>
                  
                  <Card className="bg-gray-800/30 border-yellow-500/20 p-4">
                    <div className="text-center">
                      <div className="text-2xl mb-2">🎵</div>
                      <p className="text-white text-sm">Background Music</p>
                      <Button className="mt-2 bg-green-500 hover:bg-green-600 text-white text-xs px-3 py-1">
                        ON
                      </Button>
                    </div>
                  </Card>
                  
                  <Card className="bg-gray-800/30 border-yellow-500/20 p-4">
                    <div className="text-center">
                      <div className="text-2xl mb-2">🎨</div>
                      <p className="text-white text-sm">Animations</p>
                      <Button className="mt-2 bg-green-500 hover:bg-green-600 text-white text-xs px-3 py-1">
                        ON
                      </Button>
                    </div>
                  </Card>
                  
                  <Card className="bg-gray-800/30 border-yellow-500/20 p-4">
                    <div className="text-center">
                      <div className="text-2xl mb-2">📱</div>
                      <p className="text-white text-sm">Notifications</p>
                      <Button className="mt-2 bg-green-500 hover:bg-green-600 text-white text-xs px-3 py-1">
                        ON
                      </Button>
                    </div>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Save Button */}
        <div className="mt-8 text-center">
          <Button
            onClick={handleSave}
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-3 text-lg font-semibold"
          >
            <Save className="w-5 h-5 mr-2" />
            Save Changes
          </Button>
        </div>

        {/* Account Info Display */}
        <Card className="mt-8 bg-black/30 border-yellow-500/20">
          <CardHeader>
            <CardTitle className="text-yellow-400">Account Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-400">Email:</span>
                <span className="text-white ml-2">{userData.email}</span>
              </div>
              <div>
                <span className="text-gray-400">Account Type:</span>
                <span className="text-yellow-400 ml-2">Premium Player</span>
              </div>
              <div>
                <span className="text-gray-400">Member Since:</span>
                <span className="text-white ml-2">December 2024</span>
              </div>
              <div>
                <span className="text-gray-400">Status:</span>
                <span className="text-green-400 ml-2">Active</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}