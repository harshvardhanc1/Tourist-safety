import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription } from '../ui/alert';
import { QrCode, Shield, MapPin, Phone, AlertTriangle, CheckCircle, Cloud } from 'lucide-react';

export function HomeScreen() {
  const [sosPressed, setSosPressed] = useState(false);
  const [currentZone, setCurrentZone] = useState('safe');

  const handleSOS = () => {
    setSosPressed(true);
    setTimeout(() => setSosPressed(false), 3000);
  };

  return (
    <div className="p-4 space-y-4 bg-gradient-to-b from-blue-50 to-white min-h-full">
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="text-xl text-blue-900 mb-1">SafeTour Dashboard</h1>
        <p className="text-sm text-gray-600">Stay safe, explore more</p>
      </div>

      {/* Digital ID Card */}
      <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">Digital Tourist ID</CardTitle>
              <p className="text-sm opacity-90">Blockchain Verified</p>
            </div>
            <Badge variant="outline" className="text-white border-white">
              <CheckCircle className="h-3 w-3 mr-1" />
              Active
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p><span className="opacity-80">Name:</span> John Doe</p>
              <p><span className="opacity-80">ID:</span> ST12345678</p>
              <p><span className="opacity-80">Location:</span> Goa, India</p>
            </div>
            <div className="bg-white p-2 rounded-lg">
              <QrCode className="h-12 w-12 text-gray-800" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SOS Emergency Button */}
      <Card className="border-red-200">
        <CardContent className="p-4">
          <div className="text-center space-y-3">
            <h3 className="text-red-900">Emergency SOS</h3>
            <Button
              onClick={handleSOS}
              className={`w-24 h-24 rounded-full text-white ${
                sosPressed 
                  ? 'bg-green-600 hover:bg-green-700' 
                  : 'bg-red-600 hover:bg-red-700'
              }`}
              size="lg"
            >
              {sosPressed ? (
                <CheckCircle className="h-8 w-8" />
              ) : (
                <Phone className="h-8 w-8" />
              )}
            </Button>
            <p className="text-xs text-gray-600">
              {sosPressed ? 'Alert sent! Help is on the way' : 'Tap for immediate help'}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Geo-fencing Status */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="h-4 w-4" />
            <span>Location Status</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span>Current Zone</span>
            <Badge variant={currentZone === 'safe' ? 'default' : 'destructive'}>
              {currentZone === 'safe' ? 'Safe Zone' : 'Restricted Area'}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span>GPS Status</span>
            <Badge variant="outline" className="text-green-600">
              <CheckCircle className="h-3 w-3 mr-1" />
              Active
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span>Geo-fence</span>
            <Badge variant="outline" className="text-blue-600">
              Enabled
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Weather & Safety Alerts */}
      <div className="space-y-2">
        <Alert className="border-orange-200 bg-orange-50">
          <Cloud className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800">
            Weather Alert: Heavy rainfall expected in the evening. Plan accordingly.
          </AlertDescription>
        </Alert>

        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            All systems operational. Have a safe trip!
          </AlertDescription>
        </Alert>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" size="sm" className="flex flex-col items-center p-4 h-auto">
              <Shield className="h-5 w-5 mb-1" />
              <span className="text-xs">Safety Tips</span>
            </Button>
            <Button variant="outline" size="sm" className="flex flex-col items-center p-4 h-auto">
              <MapPin className="h-5 w-5 mb-1" />
              <span className="text-xs">Nearby Help</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}