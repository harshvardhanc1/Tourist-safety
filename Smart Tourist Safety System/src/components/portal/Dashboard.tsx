import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Users, MapPin, AlertTriangle, CheckCircle, TrendingUp, Phone, Clock } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function Dashboard() {
  const stats = {
    totalTourists: 1247,
    activeTourists: 892,
    safeZones: 15,
    activeAlerts: 3,
    responseTime: '2.5 min'
  };

  const recentAlerts = [
    {
      id: 1,
      type: 'SOS',
      tourist: 'John Doe (ST12345678)',
      location: 'Calangute Beach',
      time: '2 min ago',
      status: 'responding',
      severity: 'high'
    },
    {
      id: 2,
      type: 'Geo-fence',
      tourist: 'Sarah Smith (ST87654321)',
      location: 'Restricted Area - Fort Aguada',
      time: '15 min ago',
      status: 'resolved',
      severity: 'medium'
    },
    {
      id: 3,
      type: 'Behavior',
      tourist: 'Mike Johnson (ST11223344)',
      location: 'Anjuna Beach',
      time: '32 min ago',
      status: 'monitoring',
      severity: 'low'
    }
  ];

  const activePosts = [
    { name: 'Calangute Police Station', distance: '2.3 km', officers: 4, status: 'active' },
    { name: 'Baga Coastal Security', distance: '1.8 km', officers: 2, status: 'active' },
    { name: 'Anjuna Medical Center', distance: '3.1 km', officers: 3, status: 'busy' }
  ];

  return (
    <div className="p-6 space-y-6 bg-gray-50">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Tourists</p>
                <p className="text-2xl text-blue-900">{stats.totalTourists}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Now</p>
                <p className="text-2xl text-green-900">{stats.activeTourists}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Safe Zones</p>
                <p className="text-2xl text-purple-900">{stats.safeZones}</p>
              </div>
              <MapPin className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Alerts</p>
                <p className="text-2xl text-red-900">{stats.activeAlerts}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Response</p>
                <p className="text-2xl text-orange-900">{stats.responseTime}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Live Map */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="h-5 w-5" />
              <span>Live Tourist Map</span>
              <Badge variant="outline" className="ml-auto">
                Real-time
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1635340038191-96eea7fbd056?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3Zlcm5tZW50JTIwY29udHJvbCUyMGNlbnRlciUyMGRhc2hib2FyZHxlbnwxfHx8fDE3NTc1NzA1NjB8MA&ixlib=rb-4.0&q=80&w=600"
                alt="Control center dashboard"
                className="w-full h-64 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-blue-900/70 rounded-lg flex items-center justify-center">
                <div className="text-center text-white">
                  <MapPin className="h-12 w-12 mx-auto mb-2" />
                  <p>Interactive Map</p>
                  <p className="text-sm opacity-80">892 tourists tracked</p>
                </div>
              </div>
              
              {/* Overlay indicators */}
              <div className="absolute top-4 left-4 space-y-2">
                <Badge className="bg-green-600">Safe Zones: 15</Badge>
                <Badge className="bg-red-600">Alert Areas: 2</Badge>
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
              <div className="text-center p-2 bg-green-50 rounded">
                <p className="text-green-900">Safe</p>
                <p className="text-green-700">845</p>
              </div>
              <div className="text-center p-2 bg-yellow-50 rounded">
                <p className="text-yellow-900">Monitoring</p>
                <p className="text-yellow-700">44</p>
              </div>
              <div className="text-center p-2 bg-red-50 rounded">
                <p className="text-red-900">Alerts</p>
                <p className="text-red-700">3</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <span>Recent Alerts</span>
              </div>
              <Button size="sm" variant="outline">View All</Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentAlerts.map((alert) => (
              <div key={alert.id} className="border rounded-lg p-3">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Badge variant={
                      alert.severity === 'high' ? 'destructive' :
                      alert.severity === 'medium' ? 'default' : 'outline'
                    }>
                      {alert.type}
                    </Badge>
                    <span className="text-sm">{alert.time}</span>
                  </div>
                  <Badge variant="outline" className={
                    alert.status === 'responding' ? 'text-red-600' :
                    alert.status === 'resolved' ? 'text-green-600' : 'text-yellow-600'
                  }>
                    {alert.status}
                  </Badge>
                </div>
                
                <p className="text-sm text-gray-900">{alert.tourist}</p>
                <p className="text-xs text-gray-600">{alert.location}</p>
                
                {alert.status === 'responding' && (
                  <div className="mt-2 flex space-x-2">
                    <Button size="sm" className="flex-1">
                      <Phone className="h-3 w-3 mr-1" />
                      Contact
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <MapPin className="h-3 w-3 mr-1" />
                      Track
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Response Units */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            <span>Active Response Units</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {activePosts.map((post, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm">{post.name}</h3>
                  <Badge variant={post.status === 'active' ? 'default' : 'destructive'}>
                    {post.status}
                  </Badge>
                </div>
                <div className="space-y-1 text-xs text-gray-600">
                  <p>Distance: {post.distance}</p>
                  <p>Officers: {post.officers}</p>
                </div>
                <div className="mt-3">
                  <Progress value={post.status === 'active' ? 85 : 100} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}