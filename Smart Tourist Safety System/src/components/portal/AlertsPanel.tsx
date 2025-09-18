import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { AlertTriangle, Search, Filter, Phone, MapPin, Clock, User, Brain } from 'lucide-react';

export function AlertsPanel() {
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const alerts = [
    {
      id: 'ALT001',
      type: 'SOS',
      tourist: 'John Doe',
      touristId: 'ST12345678',
      location: 'Calangute Beach, Goa',
      coordinates: '15.5497°N, 73.7617°E',
      time: '14:23:15',
      date: '2024-01-15',
      severity: 'high',
      status: 'responding',
      description: 'Emergency SOS button activated',
      responseUnit: 'Calangute Police Station',
      responseTime: '2m 15s',
      aiConfidence: 95
    },
    {
      id: 'ALT002',
      type: 'Geo-fence',
      tourist: 'Sarah Smith',
      touristId: 'ST87654321',
      location: 'Restricted Area - Fort Aguada',
      coordinates: '15.4946°N, 73.7734°E',
      time: '14:08:42',
      date: '2024-01-15',
      severity: 'medium',
      status: 'resolved',
      description: 'Tourist entered restricted zone',
      responseUnit: 'Fort Aguada Security',
      responseTime: '5m 30s',
      aiConfidence: 87
    },
    {
      id: 'ALT003',
      type: 'Behavior',
      tourist: 'Mike Johnson',
      touristId: 'ST11223344',
      location: 'Anjuna Beach, Goa',
      coordinates: '15.5739°N, 73.7446°E',
      time: '13:51:28',
      date: '2024-01-15',
      severity: 'low',
      status: 'monitoring',
      description: 'Unusual prolonged inactivity detected (45 minutes)',
      responseUnit: 'Anjuna Patrol Unit',
      responseTime: 'N/A',
      aiConfidence: 73
    },
    {
      id: 'ALT004',
      type: 'Weather',
      tourist: 'Emma Wilson',
      touristId: 'ST55667788',
      location: 'Baga Beach, Goa',
      coordinates: '15.5556°N, 73.7515°E',
      time: '13:30:10',
      date: '2024-01-15',
      severity: 'medium',
      status: 'notified',
      description: 'Severe weather warning - High tide alert',
      responseUnit: 'Coastal Security',
      responseTime: '1m 45s',
      aiConfidence: 92
    },
    {
      id: 'ALT005',
      type: 'Medical',
      tourist: 'David Brown',
      touristId: 'ST99887766',
      location: 'Candolim Beach, Goa',
      coordinates: '15.5183°N, 73.7633°E',
      time: '12:45:33',
      date: '2024-01-15',
      severity: 'high',
      status: 'resolved',
      description: 'Medical emergency reported via app',
      responseUnit: 'Candolim Medical Unit',
      responseTime: '3m 22s',
      aiConfidence: 98
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'responding': return 'text-red-600 bg-red-50';
      case 'resolved': return 'text-green-600 bg-green-50';
      case 'monitoring': return 'text-yellow-600 bg-yellow-50';
      case 'notified': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    const matchesType = filterType === 'all' || alert.type.toLowerCase() === filterType.toLowerCase();
    const matchesStatus = filterStatus === 'all' || alert.status === filterStatus;
    const matchesSearch = alert.tourist.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.touristId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesType && matchesStatus && matchesSearch;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header & Filters */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-2xl text-gray-900">Alert Management</h1>
          <p className="text-gray-600">Monitor and respond to tourist safety alerts</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search tourists, IDs, locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="sos">SOS</SelectItem>
              <SelectItem value="geo-fence">Geo-fence</SelectItem>
              <SelectItem value="behavior">Behavior</SelectItem>
              <SelectItem value="weather">Weather</SelectItem>
              <SelectItem value="medical">Medical</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="responding">Responding</SelectItem>
              <SelectItem value="monitoring">Monitoring</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
              <SelectItem value="notified">Notified</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Alerts</p>
                <p className="text-2xl text-red-900">3</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Resolved Today</p>
                <p className="text-2xl text-green-900">12</p>
              </div>
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600">✓</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Response</p>
                <p className="text-2xl text-blue-900">2.5m</p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">AI Accuracy</p>
                <p className="text-2xl text-purple-900">87%</p>
              </div>
              <Brain className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts Table */}
      <Card>
        <CardHeader>
          <CardTitle>Alert Details ({filteredAlerts.length} alerts)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Alert ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Tourist</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>AI Confidence</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAlerts.map((alert) => (
                  <TableRow key={alert.id}>
                    <TableCell className="text-blue-600">{alert.id}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{alert.type}</Badge>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm">{alert.tourist}</p>
                        <p className="text-xs text-gray-500">{alert.touristId}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm">{alert.location}</p>
                        <p className="text-xs text-gray-500">{alert.coordinates}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm">{alert.time}</p>
                        <p className="text-xs text-gray-500">{alert.date}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getSeverityColor(alert.severity)}>
                        {alert.severity}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusColor(alert.status)}>
                        {alert.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-purple-600" 
                            style={{ width: `${alert.aiConfidence}%` }}
                          />
                        </div>
                        <span className="text-xs">{alert.aiConfidence}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        <Button size="sm" variant="outline">
                          <Phone className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <MapPin className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <User className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}