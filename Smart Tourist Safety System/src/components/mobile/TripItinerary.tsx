import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { MapPin, Clock, CheckCircle, Circle, Navigation, Camera } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function TripItinerary() {
  const itineraryItems = [
    {
      id: 1,
      time: '09:00 AM',
      location: 'Calangute Beach',
      description: 'Beach activities and water sports',
      status: 'completed',
      coordinates: { lat: 15.5497, lng: 73.7617 },
      actualTime: '09:15 AM'
    },
    {
      id: 2,
      time: '12:00 PM',
      location: 'Anjuna Flea Market',
      description: 'Shopping and local crafts',
      status: 'current',
      coordinates: { lat: 15.5739, lng: 73.7446 },
      actualTime: '12:05 PM'
    },
    {
      id: 3,
      time: '03:00 PM',
      location: 'Fort Aguada',
      description: 'Historical site visit',
      status: 'planned',
      coordinates: { lat: 15.4946, lng: 73.7734 },
      actualTime: null
    },
    {
      id: 4,
      time: '06:00 PM',
      location: 'Baga Beach Sunset',
      description: 'Sunset viewing and dinner',
      status: 'planned',
      coordinates: { lat: 15.5556, lng: 73.7515 },
      actualTime: null
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'current':
        return <Navigation className="h-4 w-4 text-blue-600" />;
      default:
        return <Circle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'current':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="p-4 space-y-4 bg-gradient-to-b from-purple-50 to-white min-h-full">
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="text-xl text-purple-900 mb-1">Trip Itinerary</h1>
        <p className="text-sm text-gray-600">Planned vs Actual Journey</p>
      </div>

      {/* Map Preview */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="h-4 w-4" />
            <span>Route Overview</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative bg-gray-100 rounded-lg h-32 flex items-center justify-center">
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1676139034007-6a0a01b2d937?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3VyaXN0JTIwc2FmZXR5JTIwbW9iaWxlJTIwYXBwJTIwaW50ZXJmYWNlfGVufDF8fHx8MTc1NzUxMzY2NHww&ixlib=rb-4.0&q=80&w=400"
              alt="Map overview"
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center">
              <Badge variant="outline" className="bg-white">
                <MapPin className="h-3 w-3 mr-1" />
                Live Tracking
              </Badge>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
            <div className="text-center p-2 bg-green-50 rounded">
              <p className="text-green-900">Distance Covered</p>
              <p className="text-green-700">12.5 km</p>
            </div>
            <div className="text-center p-2 bg-blue-50 rounded">
              <p className="text-blue-900">Time Elapsed</p>
              <p className="text-blue-700">3h 15m</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Itinerary Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Schedule</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {itineraryItems.map((item, index) => (
            <div key={item.id} className="relative">
              {/* Timeline line */}
              {index < itineraryItems.length - 1 && (
                <div className="absolute left-4 top-8 w-0.5 h-12 bg-gray-200" />
              )}
              
              <div className={`border rounded-lg p-4 ${getStatusColor(item.status)}`}>
                <div className="flex items-start space-x-3">
                  <div className="mt-1">
                    {getStatusIcon(item.status)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-sm">{item.location}</h3>
                      <Badge 
                        variant="outline" 
                        className={item.status === 'current' ? 'border-blue-500 text-blue-700' : ''}
                      >
                        {item.status}
                      </Badge>
                    </div>
                    
                    <p className="text-xs text-gray-600 mb-2">{item.description}</p>
                    
                    <div className="flex items-center space-x-4 text-xs">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>Planned: {item.time}</span>
                      </div>
                      {item.actualTime && (
                        <div className="flex items-center space-x-1">
                          <span>Actual: {item.actualTime}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {item.status === 'current' && (
                  <div className="mt-3 pt-3 border-t border-blue-200">
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Camera className="h-3 w-3 mr-1" />
                        Check In
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        Navigate
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Deviation Alert */}
      <Card className="border-orange-200 bg-orange-50">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            <div>
              <p className="text-sm text-orange-900">Minor Deviation Detected</p>
              <p className="text-xs text-orange-700">
                You're 15 minutes behind schedule. Consider adjusting remaining stops.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}