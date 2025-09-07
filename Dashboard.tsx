import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Home, 
  Settings, 
  Wallet, 
  Trophy, 
  FileText, 
  Users,
  Volume2,
  LogOut,
  Crown,
  Coins
} from 'lucide-react';

interface UserData {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  country?: string;
}

interface MenuItem {
  id: string;
  label: string;
  icon: typeof Home;
  path: string;
}

const PokerBubble = ({ delay, type }: { delay: number; type: 'card' | 'crown' | 'coin' }) => {
  const icons = {
    card: ['♠', '♥', '♦', '♣'],
    crown: ['👑'],
    coin: ['💰', '🪙']
  };
  
  return (
    <div 
      className="absolute animate-bounce opacity-70"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${delay}s`,
        animationDuration: `${3 + Math.random() * 2}s`
      }}
    >
      <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full shadow-lg flex items-center justify-center animate-pulse">
        <span className="text-white text-lg font-bold">
          {icons[type][Math.floor(Math.random() * icons[type].length)]}
        </span>
      </div>
    </div>
  );
};

const AnimatedLogo = () => (
  <div className="text-center mb-8">
    <div className="relative">
      <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent animate-pulse">
        JAAFAR AL-SAYED
      </h1>
      <div className="flex items-center justify-center mt-4">
        <div className="animate-spin-slow">
          <div className="text-4xl md:text-5xl font-bold text-yellow-400 flex items-center gap-3">
            <span className="animate-bounce">♠</span>
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              POKER
            </span>
            <span className="animate-bounce delay-100">♥</span>
          </div>
        </div>
      </div>
      <div className="text-yellow-300 text-lg mt-2 animate-pulse flex items-center justify-center gap-2">
        <Crown className="w-5 h-5" />
        <span>ROYAL GAMING EXPERIENCE</span>
        <Crown className="w-5 h-5" />
      </div>
      
      {/* Rotating glow effect */}
      <div className="absolute inset-0 -z-10">
        <div className="w-full h-full bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent animate-spin-slow rounded-full blur-xl"></div>
      </div>
    </div>
  </div>
);

const PokerTable = () => (
  <div className="relative">
    <Card className="bg-gradient-to-br from-yellow-600 via-yellow-700 to-yellow-800 border-4 border-yellow-400 shadow-2xl transform hover:scale-105 transition-transform duration-300">
      <CardContent className="p-8">
        <div className="relative">
          {/* Table surface */}
          <div className="w-full h-64 bg-gradient-to-br from-green-700 to-green-900 rounded-full border-8 border-yellow-500 shadow-inner relative overflow-hidden">
            
            {/* Center logo */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-yellow-400 text-2xl font-bold animate-pulse">
                  JAAFAR AL-SAYED
                </div>
                <div className="text-yellow-300 text-lg">POKER</div>
                <Crown className="w-8 h-8 text-yellow-400 mx-auto mt-2 animate-bounce" />
              </div>
            </div>

            {/* Player positions */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
              <div className="w-12 h-12 bg-blue-600 rounded-full border-2 border-white flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
            
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <div className="w-12 h-12 bg-red-600 rounded-full border-2 border-white flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>

            {/* Cards on table */}
            <div className="absolute top-1/2 left-1/4 transform -translate-y-1/2">
              <div className="flex gap-1">
                {['♠A', '♥K'].map((card, i) => (
                  <div key={i} className="w-8 h-12 bg-white rounded border shadow-lg flex items-center justify-center text-xs font-bold animate-pulse">
                    {card}
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute top-1/2 right-1/4 transform -translate-y-1/2">
              <div className="flex gap-1">
                {['♦Q', '♣J'].map((card, i) => (
                  <div key={i} className="w-8 h-12 bg-white rounded border shadow-lg flex items-center justify-center text-xs font-bold animate-pulse">
                    {card}
                  </div>
                ))}
              </div>
            </div>

            {/* Poker chips */}
            <div className="absolute top-1/3 left-1/3">
              <div className="w-6 h-6 bg-yellow-500 rounded-full border-2 border-yellow-300 animate-spin-slow"></div>
            </div>
            <div className="absolute bottom-1/3 right-1/3">
              <div className="w-6 h-6 bg-red-500 rounded-full border-2 border-red-300 animate-spin-slow"></div>
            </div>

            {/* Animated glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent animate-pulse rounded-full"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('home');
  const [userData, setUserData] = useState<UserData>({});

  useEffect(() => {
    const stored = localStorage.getItem('userData');
    if (stored) {
      setUserData(JSON.parse(stored));
    }
  }, []);

  const menuItems: MenuItem[] = [
    { id: 'home', label: 'Home', icon: Home, path: '/dashboard' },
    { id: 'settings', label: 'Account Settings', icon: Settings, path: '/account-settings' },
    { id: 'wallet', label: 'Wallet', icon: Wallet, path: '/wallet' },
    { id: 'levels', label: 'Level Selection', icon: Trophy, path: '/game-room' },
    { id: 'records', label: 'Records', icon: FileText, path: '/records' },
  ];

  const playSound = () => {
    // Simulate sound effect
    console.log('🔊 Menu click sound played');
  };

  const handleMenuClick = (item: MenuItem) => {
    playSound();
    setActiveMenu(item.id);
    
    // Create floating cards effect
    const cards = ['♠', '♥', '♦', '♣'];
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        const card = document.createElement('div');
        card.innerHTML = cards[Math.floor(Math.random() * cards.length)];
        card.className = 'fixed text-yellow-400 text-2xl font-bold animate-bounce pointer-events-none z-50';
        card.style.left = Math.random() * window.innerWidth + 'px';
        card.style.top = Math.random() * window.innerHeight + 'px';
        document.body.appendChild(card);
        
        setTimeout(() => {
          document.body.removeChild(card);
        }, 2000);
      }, i * 100);
    }

    setTimeout(() => {
      navigate(item.path);
    }, 500);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userData');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black relative overflow-hidden">
      {/* Floating Bubbles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <PokerBubble 
          key={i} 
          delay={i * 0.3} 
          type={['card', 'crown', 'coin'][Math.floor(Math.random() * 3)] as 'card' | 'crown' | 'coin'} 
        />
      ))}

      <div className="flex">
        {/* Sidebar */}
        <div className="w-80 min-h-screen bg-black/60 backdrop-blur-md border-r-2 border-yellow-500/30 p-6">
          <div className="mb-8">
            <div className="text-yellow-400 text-xl font-bold mb-2">Welcome Back!</div>
            <div className="text-white text-sm">
              {userData?.firstName} {userData?.lastName}
            </div>
          </div>

          <div className="space-y-4">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeMenu === item.id;
              
              return (
                <Button
                  key={item.id}
                  onClick={() => handleMenuClick(item)}
                  className={`w-full justify-start text-left p-4 h-auto transition-all duration-300 ${
                    isActive 
                      ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-black shadow-lg shadow-yellow-500/50 animate-pulse' 
                      : 'bg-gray-800/50 text-white hover:bg-yellow-500/20 hover:text-yellow-400'
                  }`}
                >
                  <Icon className={`w-6 h-6 mr-3 ${isActive ? 'animate-bounce' : ''}`} />
                  <span className="font-semibold">{item.label}</span>
                  {isActive && (
                    <div className="ml-auto">
                      <Volume2 className="w-4 h-4 animate-pulse" />
                    </div>
                  )}
                </Button>
              );
            })}
          </div>

          <div className="mt-auto pt-8">
            <Button
              onClick={handleLogout}
              className="w-full bg-red-600 hover:bg-red-700 text-white"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <AnimatedLogo />
          
          <div className="max-w-4xl mx-auto">
            <PokerTable />
            
            <div className="mt-12 text-center">
              <h2 className="text-3xl font-bold text-yellow-400 mb-4">Ready to Play?</h2>
              <p className="text-white text-lg mb-8">
                Choose your level and start your poker journey!
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { name: 'Beginner', color: 'from-green-500 to-green-600', icon: '🌱' },
                  { name: 'Intermediate', color: 'from-blue-500 to-blue-600', icon: '⚡' },
                  { name: 'Professional', color: 'from-purple-500 to-purple-600', icon: '🎯' },
                  { name: 'Kings', color: 'from-yellow-500 to-yellow-600', icon: '👑' }
                ].map((level, index) => (
                  <Card key={index} className="bg-black/50 border-yellow-500/30 hover:border-yellow-500 transition-all duration-300 transform hover:scale-105">
                    <CardContent className="p-6 text-center">
                      <div className="text-4xl mb-4">{level.icon}</div>
                      <h3 className="text-xl font-bold text-white mb-2">{level.name}</h3>
                      <Button 
                        onClick={() => navigate('/game-room')}
                        className={`w-full bg-gradient-to-r ${level.color} hover:shadow-lg transition-all duration-300`}
                      >
                        Enter Room
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Statistics Cards */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-black/50 border-yellow-500/30">
                <CardContent className="p-6 text-center">
                  <Coins className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">Balance</h3>
                  <p className="text-2xl font-bold text-yellow-400">10,000</p>
                  <p className="text-gray-400">Gold Coins</p>
                </CardContent>
              </Card>
              
              <Card className="bg-black/50 border-yellow-500/30">
                <CardContent className="p-6 text-center">
                  <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">Wins</h3>
                  <p className="text-2xl font-bold text-green-400">25</p>
                  <p className="text-gray-400">Total Victories</p>
                </CardContent>
              </Card>
              
              <Card className="bg-black/50 border-yellow-500/30">
                <CardContent className="p-6 text-center">
                  <Crown className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">Rank</h3>
                  <p className="text-2xl font-bold text-purple-400">Gold</p>
                  <p className="text-gray-400">Current Level</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}