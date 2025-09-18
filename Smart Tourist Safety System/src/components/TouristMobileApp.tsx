import React, { useState } from 'react';
import { OnboardingScreen } from './mobile/OnboardingScreen';
import { HomeScreen } from './mobile/HomeScreen';
import { SafetyDashboard } from './mobile/SafetyDashboard';
import { TripItinerary } from './mobile/TripItinerary';
import { Button } from './ui/button';
import { Home, Shield, MapPin, User } from 'lucide-react';

export function TouristMobileApp() {
  const [currentScreen, setCurrentScreen] = useState<'onboarding' | 'home' | 'safety' | 'itinerary'>('onboarding');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return (
      <OnboardingScreen 
        onComplete={() => {
          setIsLoggedIn(true);
          setCurrentScreen('home');
        }} 
      />
    );
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen />;
      case 'safety':
        return <SafetyDashboard />;
      case 'itinerary':
        return <TripItinerary />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      {/* Mobile App Frame */}
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-8 border-gray-800">
        {/* Status Bar */}
        <div className="bg-black h-6 flex items-center justify-between px-6 text-white text-xs">
          <span>9:41</span>
          <div className="flex items-center space-x-1">
            <div className="w-4 h-2 bg-white rounded-sm"></div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
          </div>
        </div>

        {/* App Content */}
        <div className="h-[600px] overflow-y-auto">
          {renderScreen()}
        </div>

        {/* Bottom Navigation */}
        <div className="bg-white border-t border-gray-200 px-4 py-2">
          <div className="flex justify-around">
            <Button
              variant={currentScreen === 'home' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setCurrentScreen('home')}
              className="flex flex-col items-center space-y-1"
            >
              <Home className="h-4 w-4" />
              <span className="text-xs">Home</span>
            </Button>
            <Button
              variant={currentScreen === 'safety' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setCurrentScreen('safety')}
              className="flex flex-col items-center space-y-1"
            >
              <Shield className="h-4 w-4" />
              <span className="text-xs">Safety</span>
            </Button>
            <Button
              variant={currentScreen === 'itinerary' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setCurrentScreen('itinerary')}
              className="flex flex-col items-center space-y-1"
            >
              <MapPin className="h-4 w-4" />
              <span className="text-xs">Trip</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}