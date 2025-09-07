import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft,
  Users,
  Crown,
  Play,
  Pause,
  RotateCcw,
  Minus,
  MessageCircle,
  Volume2,
  VolumeX,
  Eye,
  EyeOff,
  Coins
} from 'lucide-react';

interface GameRoom {
  id: string;
  name: string;
  minBet: number;
  maxBet: number;
  color: string;
  icon: string;
  description: string;
}

interface Card {
  suit: string;
  rank: string;
  id: string;
}

interface Player {
  id: number;
  name: string;
  position: string;
  balance: number;
  bet: number;
  cards: Card[];
  isBot: boolean;
}

const gameRooms: GameRoom[] = [
  { 
    id: 'beginner', 
    name: 'Beginner', 
    minBet: 10, 
    maxBet: 100, 
    color: 'from-green-500 to-green-700',
    icon: '🌱',
    description: 'Perfect for new players'
  },
  { 
    id: 'intermediate', 
    name: 'Intermediate', 
    minBet: 50, 
    maxBet: 500, 
    color: 'from-blue-500 to-blue-700',
    icon: '⚡',
    description: 'For experienced players'
  },
  { 
    id: 'professional', 
    name: 'Professional', 
    minBet: 200, 
    maxBet: 2000, 
    color: 'from-purple-500 to-purple-700',
    icon: '🎯',
    description: 'High stakes gaming'
  },
  { 
    id: 'kings', 
    name: 'Kings', 
    minBet: 1000, 
    maxBet: 10000, 
    color: 'from-yellow-500 to-yellow-700',
    icon: '👑',
    description: 'Elite players only'
  }
];

const suits = ['♠', '♥', '♦', '♣'];
const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

const createDeck = (): Card[] => {
  const deck: Card[] = [];
  for (const suit of suits) {
    for (const rank of ranks) {
      deck.push({ suit, rank, id: `${rank}${suit}` });
    }
  }
  return deck.sort(() => Math.random() - 0.5);
};

const PokerCard = ({ card, faceDown = false }: { card: Card; faceDown?: boolean }) => (
  <div className={`w-16 h-24 rounded-lg border-2 flex items-center justify-center font-bold text-sm transition-all duration-300 transform hover:scale-105 ${
    faceDown 
      ? 'bg-gradient-to-br from-blue-800 to-blue-900 border-blue-600 text-blue-300' 
      : 'bg-white border-gray-300 text-black shadow-lg'
  }`}>
    {faceDown ? (
      <div className="text-center">
        <div className="text-xs">🂠</div>
        <div className="text-xs mt-1">POKER</div>
      </div>
    ) : (
      <div className={`text-center ${card.suit === '♥' || card.suit === '♦' ? 'text-red-600' : 'text-black'}`}>
        <div className="text-lg">{card.rank}</div>
        <div className="text-lg">{card.suit}</div>
      </div>
    )}
  </div>
);

const PokerChip = ({ value, color }: { value: number; color: string }) => (
  <div className={`w-12 h-12 rounded-full border-4 border-white flex items-center justify-center font-bold text-white text-xs shadow-lg animate-pulse ${color}`}>
    {value}
  </div>
);

export default function GameRoom() {
  const navigate = useNavigate();
  const [selectedRoom, setSelectedRoom] = useState<GameRoom | null>(null);
  const [gameState, setGameState] = useState<'waiting' | 'playing' | 'showdown'>('waiting');
  const [playerCards, setPlayerCards] = useState<Card[]>([]);
  const [communityCards, setCommunityCards] = useState<Card[]>([]);
  const [currentBet, setCurrentBet] = useState(0);
  const [pot, setPot] = useState(0);
  const [playerBalance] = useState(10000);
  const [chatVisible, setChatVisible] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [deck, setDeck] = useState<Card[]>([]);

  const players: Player[] = [
    { id: 1, name: 'You', position: 'bottom', balance: playerBalance, bet: 0, cards: playerCards, isBot: false },
    { id: 2, name: 'Bot Alice', position: 'top-left', balance: 8500, bet: 0, cards: [], isBot: true },
    { id: 3, name: 'Bot Bob', position: 'top-right', balance: 12000, bet: 0, cards: [], isBot: true },
    { id: 4, name: 'Bot Charlie', position: 'left', balance: 6500, bet: 0, cards: [], isBot: true },
    { id: 5, name: 'Bot Diana', position: 'right', balance: 9200, bet: 0, cards: [], isBot: true },
    { id: 6, name: 'Bot Eve', position: 'top', balance: 7800, bet: 0, cards: [], isBot: true }
  ];

  useEffect(() => {
    setDeck(createDeck());
  }, []);

  const playSound = (action: string) => {
    if (soundEnabled) {
      console.log(`🔊 Playing sound: ${action}`);
    }
  };

  const startNewRound = () => {
    playSound('deal_cards');
    const newDeck = createDeck();
    setDeck(newDeck);
    
    // Deal 2 cards to player
    const newPlayerCards = [newDeck[0], newDeck[1]];
    setPlayerCards(newPlayerCards);
    
    setCommunityCards([]);
    setGameState('playing');
    setPot(0);
    setCurrentBet(selectedRoom?.minBet || 10);
  };

  const dealFlop = () => {
    playSound('deal_flop');
    const flop = deck.slice(10, 13); // Skip burn card
    setCommunityCards(flop);
  };

  const dealTurn = () => {
    playSound('deal_turn');
    setCommunityCards(prev => [...prev, deck[14]]);
  };

  const dealRiver = () => {
    playSound('deal_river');
    setCommunityCards(prev => [...prev, deck[16]]);
    setTimeout(() => setGameState('showdown'), 1000);
  };

  const handleBet = () => {
    playSound('bet');
    setPot(prev => prev + currentBet);
    
    // Create chip animation effect
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        const chip = document.createElement('div');
        chip.className = 'fixed w-8 h-8 bg-yellow-500 rounded-full animate-bounce pointer-events-none z-50';
        chip.style.left = Math.random() * window.innerWidth + 'px';
        chip.style.top = Math.random() * window.innerHeight + 'px';
        document.body.appendChild(chip);
        
        setTimeout(() => {
          document.body.removeChild(chip);
        }, 2000);
      }, i * 100);
    }
  };

  const handleFold = () => {
    playSound('fold');
    setGameState('waiting');
    setPlayerCards([]);
    setCommunityCards([]);
  };

  const nextPhase = () => {
    if (communityCards.length === 0) {
      dealFlop();
    } else if (communityCards.length === 3) {
      dealTurn();
    } else if (communityCards.length === 4) {
      dealRiver();
    }
  };

  if (!selectedRoom) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-6">
        <div className="max-w-6xl mx-auto">
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
              Select Game Room
            </h1>
          </div>

          {/* Room Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {gameRooms.map((room) => (
              <Card
                key={room.id}
                className="bg-black/50 border-2 border-gray-600 hover:border-yellow-500/50 transition-all duration-300 transform hover:scale-105 cursor-pointer"
                onClick={() => setSelectedRoom(room)}
              >
                <CardHeader className="text-center">
                  <div className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r ${room.color} flex items-center justify-center text-4xl shadow-lg`}>
                    {room.icon}
                  </div>
                  <CardTitle className="text-yellow-400 text-xl">{room.name}</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-3">
                  <p className="text-gray-300 text-sm">{room.description}</p>
                  <div className="space-y-2">
                    <div className="text-white">
                      <span className="text-gray-400">Min Bet:</span> {room.minBet} coins
                    </div>
                    <div className="text-white">
                      <span className="text-gray-400">Max Bet:</span> {room.maxBet} coins
                    </div>
                  </div>
                  <Button className={`w-full bg-gradient-to-r ${room.color} hover:shadow-lg transition-all duration-300`}>
                    <Users className="w-4 h-4 mr-2" />
                    Enter Room
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Private Rooms Section */}
          <Card className="mt-12 bg-black/30 border-yellow-500/20">
            <CardHeader>
              <CardTitle className="text-yellow-400 flex items-center gap-2">
                <Crown className="w-5 h-5" />
                Private Rooms - High Profit Opportunities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-white font-semibold">🎯 Create Your Own Room</h3>
                  <p className="text-gray-300 text-sm">
                    Elite players can create private rooms and earn profits from every game!
                  </p>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Earn 5-15% commission from each pot</li>
                    <li>• Invite/kick players as room owner</li>
                    <li>• Set custom betting limits</li>
                    <li>• Premium room features</li>
                  </ul>
                  <Button className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700">
                    Create Private Room
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-white font-semibold">📊 Top Earning Rooms</h3>
                  <div className="space-y-2">
                    {[
                      { name: "King's Table", owner: "ProPlayer99", profit: "$2,450", players: "6/6" },
                      { name: "Golden Palace", owner: "PokerMaster", profit: "$1,890", players: "4/6" },
                      { name: "Diamond Club", owner: "EliteGamer", profit: "$1,650", players: "5/6" }
                    ].map((room, index) => (
                      <div key={index} className="bg-gray-800/30 p-3 rounded-lg flex justify-between items-center">
                        <div>
                          <p className="text-white font-semibold">{room.name}</p>
                          <p className="text-gray-400 text-xs">Owner: {room.owner}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-green-400 font-bold">{room.profit}</p>
                          <p className="text-gray-400 text-xs">{room.players}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-black relative overflow-hidden">
      {/* Casino Background Effects */}
      <div className="absolute inset-0 opacity-10">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`
            }}
          >
            <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
          </div>
        ))}
      </div>

      <div className="relative z-10 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Button
              onClick={() => setSelectedRoom(null)}
              className="bg-yellow-500 hover:bg-yellow-600 text-black mr-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1 className="text-2xl font-bold text-yellow-400">
              {selectedRoom.name} Room
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <Button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`${soundEnabled ? 'bg-green-500' : 'bg-gray-500'} hover:opacity-80`}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </Button>
            <Button
              onClick={() => setChatVisible(!chatVisible)}
              className={`${chatVisible ? 'bg-blue-500' : 'bg-gray-500'} hover:opacity-80`}
            >
              {chatVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Main Game Area */}
          <div className="flex-1">
            {/* Poker Table */}
            <div className="relative">
              <div className={`w-full h-96 bg-gradient-to-br ${selectedRoom.color} rounded-full border-8 border-yellow-500 shadow-2xl relative overflow-hidden`}>
                
                {/* Center Logo and Community Cards */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-yellow-400 text-xl font-bold animate-pulse mb-4">
                      JAAFAR AL-SAYED POKER
                    </div>
                    <Crown className="w-8 h-8 text-yellow-400 mx-auto mb-4 animate-bounce" />
                    
                    {/* Community Cards */}
                    <div className="flex gap-2 justify-center">
                      {communityCards.map((card, index) => (
                        <PokerCard key={index} card={card} />
                      ))}
                      {Array.from({ length: 5 - communityCards.length }).map((_, index) => (
                        <div key={`empty-${index}`} className="w-16 h-24 border-2 border-dashed border-yellow-400/50 rounded-lg"></div>
                      ))}
                    </div>
                    
                    {/* Pot */}
                    <div className="mt-4">
                      <div className="text-yellow-400 text-lg font-bold">
                        Pot: {pot} coins
                      </div>
                      <div className="flex justify-center gap-2 mt-2">
                        {pot > 0 && (
                          <>
                            <PokerChip value={100} color="bg-red-500" />
                            <PokerChip value={50} color="bg-blue-500" />
                            <PokerChip value={25} color="bg-green-500" />
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Player Positions */}
                {players.slice(0, 6).map((player, index) => {
                  const positions = {
                    'bottom': 'bottom-4 left-1/2 transform -translate-x-1/2',
                    'top': 'top-4 left-1/2 transform -translate-x-1/2',
                    'top-left': 'top-8 left-8',
                    'top-right': 'top-8 right-8',
                    'left': 'left-4 top-1/2 transform -translate-y-1/2',
                    'right': 'right-4 top-1/2 transform -translate-y-1/2'
                  };

                  return (
                    <div key={player.id} className={`absolute ${positions[player.position as keyof typeof positions]}`}>
                      <div className="text-center">
                        <div className={`w-16 h-16 rounded-full border-4 flex items-center justify-center text-white font-bold ${
                          player.isBot ? 'bg-gray-600 border-gray-400' : 'bg-blue-600 border-blue-400'
                        }`}>
                          {player.isBot ? '🤖' : '👤'}
                        </div>
                        <div className="text-white text-xs mt-1">{player.name}</div>
                        <div className="text-yellow-400 text-xs">{player.balance}</div>
                        
                        {/* Player Cards */}
                        {player.position === 'bottom' && playerCards.length > 0 && (
                          <div className="flex gap-1 mt-2 justify-center">
                            {playerCards.map((card, cardIndex) => (
                              <PokerCard key={cardIndex} card={card} />
                            ))}
                          </div>
                        )}
                        
                        {player.position !== 'bottom' && gameState === 'playing' && (
                          <div className="flex gap-1 mt-2 justify-center">
                            <PokerCard card={{} as Card} faceDown />
                            <PokerCard card={{} as Card} faceDown />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Game Controls */}
            <div className="mt-6 bg-black/50 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="text-white">
                    <span className="text-gray-400">Your Balance:</span> {playerBalance} coins
                  </div>
                  <div className="text-white">
                    <span className="text-gray-400">Current Bet:</span> {currentBet} coins
                  </div>
                </div>
                <Badge className={`${gameState === 'waiting' ? 'bg-gray-500' : gameState === 'playing' ? 'bg-green-500' : 'bg-blue-500'}`}>
                  {gameState.toUpperCase()}
                </Badge>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <Input
                  type="number"
                  value={currentBet}
                  onChange={(e) => setCurrentBet(Number(e.target.value))}
                  min={selectedRoom.minBet}
                  max={selectedRoom.maxBet}
                  className="w-32 bg-gray-800 text-white border-yellow-500/30"
                />
                <span className="text-gray-400">coins</span>
              </div>

              <div className="flex gap-4">
                {gameState === 'waiting' && (
                  <Button
                    onClick={startNewRound}
                    className="bg-green-500 hover:bg-green-600 text-white"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Start Round
                  </Button>
                )}

                {gameState === 'playing' && (
                  <>
                    <Button
                      onClick={handleBet}
                      className="bg-blue-500 hover:bg-blue-600 text-white"
                    >
                      <Coins className="w-4 h-4 mr-2" />
                      Bet
                    </Button>
                    
                    <Button
                      onClick={nextPhase}
                      className="bg-purple-500 hover:bg-purple-600 text-white"
                    >
                      Next Phase
                    </Button>
                    
                    <Button
                      onClick={handleFold}
                      className="bg-red-500 hover:bg-red-600 text-white"
                    >
                      <Minus className="w-4 h-4 mr-2" />
                      Fold
                    </Button>
                  </>
                )}

                <Button
                  onClick={() => {
                    setGameState('waiting');
                    setPlayerCards([]);
                    setCommunityCards([]);
                    setPot(0);
                  }}
                  className="bg-gray-500 hover:bg-gray-600 text-white"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              </div>
            </div>
          </div>

          {/* Chat System */}
          {chatVisible && (
            <Card className="w-80 bg-black/50 border-yellow-500/30">
              <CardHeader>
                <CardTitle className="text-yellow-400 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Chat
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="h-64 bg-gray-800/30 rounded-lg p-3 overflow-y-auto">
                  <div className="space-y-2 text-sm">
                    <div className="text-blue-400">Bot Alice: Good luck everyone!</div>
                    <div className="text-green-400">Bot Bob: Let's play!</div>
                    <div className="text-purple-400">Bot Charlie: All in!</div>
                    <div className="text-pink-400">Bot Diana: Nice hand!</div>
                    <div className="text-yellow-400">System: New round started</div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Input
                    placeholder="Type your message..."
                    className="bg-gray-800 text-white border-yellow-500/30"
                  />
                  <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">
                    Send
                  </Button>
                </div>
                
                <div className="text-center">
                  <Button className="text-xs bg-gray-700 hover:bg-gray-600 text-white">
                    Private Chat
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}