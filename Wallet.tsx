import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import {
  ArrowLeft,
  Coins,
  ShoppingCart,
  DollarSign,
  CreditCard,
  Building2,
  MessageCircle,
  Wallet as WalletIcon,
  TrendingUp,
  Gift,
  Star,
  Crown
} from 'lucide-react';

interface CoinPackage {
  id: number;
  coins: number;
  price: number;
  color: string;
  icon: string;
  popular: boolean;
}

interface SellPackage {
  id: number;
  coins: number;
  cashValue: number;
  color: string;
  icon: string;
}

interface PaymentMethod {
  id: string;
  name: string;
  icon: typeof Building2;
  description: string;
}

const coinPackages: CoinPackage[] = [
  { id: 1, coins: 100, price: 5, color: 'from-gray-400 to-gray-600', icon: '🪙', popular: false },
  { id: 2, coins: 250, price: 10, color: 'from-green-400 to-green-600', icon: '💚', popular: false },
  { id: 3, coins: 500, price: 18, color: 'from-blue-400 to-blue-600', icon: '💙', popular: true },
  { id: 4, coins: 1000, price: 30, color: 'from-purple-400 to-purple-600', icon: '💜', popular: false },
  { id: 5, coins: 2500, price: 65, color: 'from-pink-400 to-pink-600', icon: '💖', popular: false },
  { id: 6, coins: 5000, price: 120, color: 'from-yellow-400 to-yellow-600', icon: '💛', popular: false },
  { id: 7, coins: 10000, price: 200, color: 'from-orange-400 to-orange-600', icon: '🧡', popular: false },
  { id: 8, coins: 25000, price: 450, color: 'from-red-400 to-red-600', icon: '❤️', popular: false },
  { id: 9, coins: 50000, price: 800, color: 'from-indigo-400 to-indigo-600', icon: '💙', popular: false },
  { id: 10, coins: 100000, price: 1500, color: 'from-yellow-500 to-yellow-700', icon: '👑', popular: false }
];

const sellPackages: SellPackage[] = [
  { id: 1, coins: 100, cashValue: 4, color: 'from-gray-400 to-gray-600', icon: '🪙' },
  { id: 2, coins: 250, cashValue: 9, color: 'from-green-400 to-green-600', icon: '💚' },
  { id: 3, coins: 500, cashValue: 16, color: 'from-blue-400 to-blue-600', icon: '💙' },
  { id: 4, coins: 1000, cashValue: 28, color: 'from-purple-400 to-purple-600', icon: '💜' },
  { id: 5, coins: 2500, cashValue: 60, color: 'from-pink-400 to-pink-600', icon: '💖' },
  { id: 6, coins: 5000, cashValue: 110, color: 'from-yellow-400 to-yellow-600', icon: '💛' },
  { id: 7, coins: 10000, cashValue: 180, color: 'from-orange-400 to-orange-600', icon: '🧡' },
  { id: 8, coins: 25000, cashValue: 400, color: 'from-red-400 to-red-600', icon: '❤️' },
  { id: 9, coins: 50000, cashValue: 720, color: 'from-indigo-400 to-indigo-600', icon: '💙' },
  { id: 10, coins: 100000, cashValue: 1350, color: 'from-yellow-500 to-yellow-700', icon: '👑' }
];

const paymentMethods: PaymentMethod[] = [
  { id: 'western', name: 'Western Union', icon: Building2, description: 'Bank Transfer via Western Union' },
  { id: 'moneygram', name: 'MoneyGram', icon: Building2, description: 'Bank Transfer via MoneyGram' },
  { id: 'ewallet', name: 'E-Wallet', icon: WalletIcon, description: 'Digital Wallet Payment' },
  { id: 'admin', name: 'Contact Admin', icon: MessageCircle, description: 'Direct contact with administrator' }
];

export default function Wallet() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy');
  const [selectedPackage, setSelectedPackage] = useState<CoinPackage | SellPackage | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<string>('');
  const [userBalance] = useState(10000);

  const handlePurchase = (pkg: CoinPackage | SellPackage) => {
    setSelectedPackage(pkg);
  };

  const handlePaymentSelect = (methodId: string) => {
    setSelectedPayment(methodId);
    
    if (methodId === 'admin') {
      alert('Redirecting to admin contact...\n\nAdmin Contact:\n📧 admin@jaafarpoker.com\n📱 +1-555-POKER-1\n💬 Live Chat Available 24/7');
    } else {
      alert(`Payment method selected: ${paymentMethods.find(m => m.id === methodId)?.name}\n\nProceeding to payment gateway...`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Button
              onClick={() => navigate('/dashboard')}
              className="bg-yellow-500 hover:bg-yellow-600 text-black mr-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              Wallet
            </h1>
          </div>
          
          {/* Balance Display */}
          <Card className="bg-black/50 border-yellow-500/30">
            <CardContent className="p-4 flex items-center gap-3">
              <Coins className="w-8 h-8 text-yellow-400" />
              <div>
                <p className="text-gray-400 text-sm">Current Balance</p>
                <p className="text-2xl font-bold text-yellow-400">{userBalance.toLocaleString()}</p>
                <p className="text-yellow-300 text-xs">Gold Coins</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8">
          <Button
            onClick={() => setActiveTab('buy')}
            className={`px-8 py-3 text-lg font-semibold transition-all duration-300 ${
              activeTab === 'buy'
                ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-500/50'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Buy Coins
          </Button>
          <Button
            onClick={() => setActiveTab('sell')}
            className={`px-8 py-3 text-lg font-semibold transition-all duration-300 ${
              activeTab === 'sell'
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/50'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            <DollarSign className="w-5 h-5 mr-2" />
            Sell Coins
          </Button>
        </div>

        {/* Buy Coins Tab */}
        {activeTab === 'buy' && (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-yellow-400 mb-2">Coin Packages</h2>
              <p className="text-gray-300">Choose the perfect package for your gaming needs</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {coinPackages.map((pkg) => (
                <Card
                  key={pkg.id}
                  className={`relative bg-black/50 border-2 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl ${
                    pkg.popular ? 'border-yellow-500 shadow-yellow-500/50' : 'border-gray-600 hover:border-yellow-500/50'
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-yellow-500 text-black font-bold px-3 py-1">
                        <Star className="w-3 h-3 mr-1" />
                        POPULAR
                      </Badge>
                    </div>
                  )}
                  
                  <CardContent className="p-6 text-center">
                    <div className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r ${pkg.color} flex items-center justify-center text-3xl animate-pulse shadow-lg`}>
                      {pkg.icon}
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-2">
                      {pkg.coins.toLocaleString()} Coins
                    </h3>
                    
                    <div className="text-3xl font-bold text-yellow-400 mb-4">
                      ${pkg.price}
                    </div>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          onClick={() => handlePurchase(pkg)}
                          className={`w-full bg-gradient-to-r ${pkg.color} hover:shadow-lg transition-all duration-300 text-white font-semibold`}
                        >
                          Buy Now
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-black/90 border-yellow-500/30">
                        <DialogHeader>
                          <DialogTitle className="text-yellow-400 text-xl">
                            Purchase {pkg.coins.toLocaleString()} Coins
                          </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                            <div className="text-4xl mb-2">{pkg.icon}</div>
                            <p className="text-white text-lg">{pkg.coins.toLocaleString()} Gold Coins</p>
                            <p className="text-yellow-400 text-2xl font-bold">${pkg.price}</p>
                          </div>
                          
                          <div className="space-y-3">
                            <h3 className="text-white font-semibold">Select Payment Method:</h3>
                            {paymentMethods.map((method) => {
                              const Icon = method.icon;
                              return (
                                <Button
                                  key={method.id}
                                  onClick={() => handlePaymentSelect(method.id)}
                                  className="w-full justify-start bg-gray-800 hover:bg-yellow-500/20 text-white border border-gray-600 hover:border-yellow-500/50"
                                >
                                  <Icon className="w-5 h-5 mr-3" />
                                  <div className="text-left">
                                    <div className="font-semibold">{method.name}</div>
                                    <div className="text-xs text-gray-400">{method.description}</div>
                                  </div>
                                </Button>
                              );
                            })}
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Sell Coins Tab */}
        {activeTab === 'sell' && (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-blue-400 mb-2">Sell Your Coins</h2>
              <p className="text-gray-300">Convert your coins back to real money</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {sellPackages.map((pkg) => (
                <Card
                  key={pkg.id}
                  className="bg-black/50 border-2 border-gray-600 hover:border-blue-500/50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                >
                  <CardContent className="p-6 text-center">
                    <div className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r ${pkg.color} flex items-center justify-center text-3xl animate-pulse shadow-lg`}>
                      {pkg.icon}
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-2">
                      Sell {pkg.coins.toLocaleString()}
                    </h3>
                    
                    <div className="text-sm text-gray-400 mb-2">Get Cash:</div>
                    <div className="text-3xl font-bold text-green-400 mb-4">
                      ${pkg.cashValue}
                    </div>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          disabled={userBalance < pkg.coins}
                          className={`w-full bg-gradient-to-r ${pkg.color} hover:shadow-lg transition-all duration-300 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                          {userBalance >= pkg.coins ? 'Sell Now' : 'Insufficient Coins'}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-black/90 border-blue-500/30">
                        <DialogHeader>
                          <DialogTitle className="text-blue-400 text-xl">
                            Sell {pkg.coins.toLocaleString()} Coins
                          </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                            <div className="text-4xl mb-2">{pkg.icon}</div>
                            <p className="text-white text-lg">{pkg.coins.toLocaleString()} Gold Coins</p>
                            <p className="text-green-400 text-2xl font-bold">${pkg.cashValue}</p>
                            <p className="text-gray-400 text-sm">Exchange Rate: ${(pkg.cashValue / pkg.coins).toFixed(4)} per coin</p>
                          </div>
                          
                          <div className="space-y-3">
                            <h3 className="text-white font-semibold">Cash Out Options:</h3>
                            <Button
                              onClick={() => alert('Contacting admin for direct cash exchange...')}
                              className="w-full justify-start bg-green-600 hover:bg-green-700 text-white"
                            >
                              <MessageCircle className="w-5 h-5 mr-3" />
                              <div className="text-left">
                                <div className="font-semibold">Contact Admin</div>
                                <div className="text-xs">Direct cash exchange</div>
                              </div>
                            </Button>
                            <Button
                              onClick={() => alert('Bank transfer initiated. Processing time: 1-3 business days')}
                              className="w-full justify-start bg-blue-600 hover:bg-blue-700 text-white"
                            >
                              <Building2 className="w-5 h-5 mr-3" />
                              <div className="text-left">
                                <div className="font-semibold">Bank Transfer</div>
                                <div className="text-xs">1-3 business days</div>
                              </div>
                            </Button>
                            <Button
                              onClick={() => alert('E-wallet transfer initiated. Processing time: Instant')}
                              className="w-full justify-start bg-purple-600 hover:bg-purple-700 text-white"
                            >
                              <WalletIcon className="w-5 h-5 mr-3" />
                              <div className="text-left">
                                <div className="font-semibold">E-Wallet</div>
                                <div className="text-xs">Instant transfer</div>
                              </div>
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Transaction History */}
        <Card className="mt-12 bg-black/30 border-yellow-500/20">
          <CardHeader>
            <CardTitle className="text-yellow-400 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Recent Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { type: 'buy', amount: 1000, price: 30, date: '2024-12-07', status: 'completed' },
                { type: 'sell', amount: 500, price: 16, date: '2024-12-06', status: 'pending' },
                { type: 'buy', amount: 2500, price: 65, date: '2024-12-05', status: 'completed' }
              ].map((transaction, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.type === 'buy' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'
                    }`}>
                      {transaction.type === 'buy' ? <ShoppingCart className="w-5 h-5" /> : <DollarSign className="w-5 h-5" />}
                    </div>
                    <div>
                      <p className="text-white font-semibold">
                        {transaction.type === 'buy' ? 'Purchased' : 'Sold'} {transaction.amount.toLocaleString()} coins
                      </p>
                      <p className="text-gray-400 text-sm">{transaction.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-semibold">${transaction.price}</p>
                    <Badge className={transaction.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'}>
                      {transaction.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}