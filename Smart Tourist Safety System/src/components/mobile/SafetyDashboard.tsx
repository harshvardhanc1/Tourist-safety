import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Alert, AlertDescription } from '../ui/alert';
import { Brain, Activity, Clock, MapPin, Phone, AlertTriangle, TrendingUp } from 'lucide-react';

export function SafetyDashboard() {
  const safetyScore = 85;
  const emergencyContacts = [
    { name: 'Local Police', number: '100', type: 'police' },
    { name: 'Tourism Helpline', number: '1363', type: 'tourism' },
    { name: 'Medical Emergency', number: '108', type: 'medical' },
  ];

  const aiAlerts = [
    {
      id: 1,
      type: 'behavior',
      message: 'No unusual activity detected',
      severity: 'normal',
      time: '2 min ago'
    },
    {
      id: 2,
      type: 'location',
      message: 'Staying within planned itinerary',
      severity: 'normal',
      time: '5 min ago'
    },
    {
      id: 3,
      type: 'activity',
      message: 'Regular movement pattern detected',
      severity: 'normal',
      time: '10 min ago'
    }
  ];

  return (
    <div className="p-4 space-y-4 bg-gradient-to-b from-green-50 to-white min-h-full">
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="text-xl text-green-900 mb-1">Safety Dashboard</h1>
        <p className="text-sm text-gray-600">AI-powered safety monitoring</p>
      </div>

      {/* Safety Score */}
      <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Safety Score</span>
            <Badge variant="outline" className="text-white border-white">
              <TrendingUp className="h-3 w-3 mr-1" />
              Good
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="text-3xl">{safetyScore}%</div>
            <Progress value={safetyScore} className="bg-white/20" />
            <p className="text-sm opacity-90">
              All systems monitoring. No immediate risks detected.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* AI Monitoring */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-4 w-4 text-purple-600" />
            <span>AI Behavior Analysis</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {aiAlerts.map((alert) => (
            <div key={alert.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className={`w-2 h-2 rounded-full mt-2 ${
                alert.severity === 'normal' ? 'bg-green-500' : 
                alert.severity === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
              }`} />
              <div className="flex-1">
                <p className="text-sm">{alert.message}</p>
                <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Activity Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="h-4 w-4 text-blue-600" />
            <span>Activity Monitor</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <Clock className="h-5 w-5 text-blue-600 mx-auto mb-1" />
              <p className="text-sm text-blue-900">Last Active</p>
              <p className="text-xs text-blue-700">2 minutes ago</p>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <MapPin className="h-5 w-5 text-green-600 mx-auto mb-1" />
              <p className="text-sm text-green-900">Location</p>
              <p className="text-xs text-green-700">Calangute Beach</p>
            </div>
          </div>
          
          <Alert className="border-blue-200 bg-blue-50">
            <Activity className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              Movement pattern indicates normal tourist activity. All clear!
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Emergency Contacts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Phone className="h-4 w-4 text-red-600" />
            <span>Emergency Contacts</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {emergencyContacts.map((contact, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="text-sm">{contact.name}</p>
                <p className="text-xs text-gray-500">{contact.number}</p>
              </div>
              <Badge variant="outline" className={
                contact.type === 'police' ? 'text-blue-600' :
                contact.type === 'medical' ? 'text-red-600' : 'text-green-600'
              }>
                {contact.type}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Risk Alerts */}
      <Alert className="border-yellow-200 bg-yellow-50">
        <AlertTriangle className="h-4 w-4 text-yellow-600" />
        <AlertDescription className="text-yellow-800">
          <strong>Tip:</strong> Stay hydrated and avoid isolated areas after sunset.
        </AlertDescription>
      </Alert>
    </div>
  );
}