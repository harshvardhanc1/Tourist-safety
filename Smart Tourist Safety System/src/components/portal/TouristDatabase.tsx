import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Users, Search, Shield, MapPin, Phone, Calendar, CheckCircle, AlertTriangle, QrCode } from 'lucide-react';

export function TouristDatabase() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedTourist, setSelectedTourist] = useState<any>(null);

  const tourists = [
    {
      id: 'ST12345678',
      name: 'John Doe',
      nationality: 'USA',
      age: 28,
      phone: '+1-555-0123',
      email: 'john.doe@email.com',
      idType: 'Passport',
      idNumber: 'US1234567',
      checkIn: '2024-01-15',
      checkOut: '2024-01-22',
      location: 'Calangute Beach',
      status: 'active',
      safetyScore: 85,
      emergencyContact: 'Jane Doe (+1-555-0124)',
      verificationStatus: 'verified',
      blockchainHash: '0x1a2b3c4d...',
      lastActivity: '2 min ago',
      riskLevel: 'low'
    },
    {
      id: 'ST87654321',
      name: 'Sarah Smith',
      nationality: 'UK',
      age: 35,
      phone: '+44-7700-900123',
      email: 'sarah.smith@email.com',
      idType: 'Passport',
      idNumber: 'GB9876543',
      checkIn: '2024-01-14',
      checkOut: '2024-01-21',
      location: 'Baga Beach',
      status: 'alert',
      safetyScore: 67,
      emergencyContact: 'Mike Smith (+44-7700-900124)',
      verificationStatus: 'verified',
      blockchainHash: '0x5e6f7g8h...',
      lastActivity: '15 min ago',
      riskLevel: 'medium'
    },
    {
      id: 'ST11223344',
      name: 'Mike Johnson',
      nationality: 'Canada',
      age: 42,
      phone: '+1-613-555-0189',
      email: 'mike.johnson@email.com',
      idType: 'Passport',
      idNumber: 'CA5566778',
      checkIn: '2024-01-13',
      checkOut: '2024-01-20',
      location: 'Anjuna Beach',
      status: 'monitoring',
      safetyScore: 73,
      emergencyContact: 'Lisa Johnson (+1-613-555-0190)',
      verificationStatus: 'verified',
      blockchainHash: '0x9i0j1k2l...',
      lastActivity: '32 min ago',
      riskLevel: 'low'
    },
    {
      id: 'ST55667788',
      name: 'Emma Wilson',
      nationality: 'Australia',
      age: 26,
      phone: '+61-2-9876-5432',
      email: 'emma.wilson@email.com',
      idType: 'Passport',
      idNumber: 'AU3344556',
      checkIn: '2024-01-16',
      checkOut: '2024-01-23',
      location: 'Candolim Beach',
      status: 'active',
      safetyScore: 92,
      emergencyContact: 'Tom Wilson (+61-2-9876-5433)',
      verificationStatus: 'verified',
      blockchainHash: '0xm3n4o5p6...',
      lastActivity: '5 min ago',
      riskLevel: 'low'
    },
    {
      id: 'ST99887766',
      name: 'David Brown',
      nationality: 'Germany',
      age: 33,
      phone: '+49-30-12345678',
      email: 'david.brown@email.com',
      idType: 'Passport',
      idNumber: 'DE7788990',
      checkIn: '2024-01-15',
      checkOut: '2024-01-22',
      location: 'Palolem Beach',
      status: 'inactive',
      safetyScore: 45,
      emergencyContact: 'Anna Brown (+49-30-12345679)',
      verificationStatus: 'pending',
      blockchainHash: '0xq7r8s9t0...',
      lastActivity: '2 hours ago',
      riskLevel: 'high'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'alert': return 'bg-red-100 text-red-800';
      case 'monitoring': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'high': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const filteredTourists = tourists.filter(tourist => {
    const matchesSearch = tourist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tourist.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tourist.nationality.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || tourist.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header & Search */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-2xl text-gray-900">Tourist Database</h1>
          <p className="text-gray-600">Blockchain-verified digital identities</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by name, ID, nationality..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="monitoring">Monitoring</SelectItem>
              <SelectItem value="alert">Alert</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Registered</p>
                <p className="text-2xl text-blue-900">1,247</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Verified IDs</p>
                <p className="text-2xl text-green-900">1,203</p>
              </div>
              <Shield className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Now</p>
                <p className="text-2xl text-purple-900">892</p>
              </div>
              <MapPin className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Under Alert</p>
                <p className="text-2xl text-red-900">3</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tourist Table */}
      <Card>
        <CardHeader>
          <CardTitle>Tourist Registry ({filteredTourists.length} tourists)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tourist ID</TableHead>
                  <TableHead>Name & Details</TableHead>
                  <TableHead>Nationality</TableHead>
                  <TableHead>Current Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Safety Score</TableHead>
                  <TableHead>Verification</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTourists.map((tourist) => (
                  <TableRow key={tourist.id}>
                    <TableCell className="text-blue-600">{tourist.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm">{tourist.name}</p>
                        <p className="text-xs text-gray-500">Age: {tourist.age} • {tourist.phone}</p>
                        <p className="text-xs text-gray-500">Last active: {tourist.lastActivity}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{tourist.nationality}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-3 w-3 text-gray-400" />
                        <span className="text-sm">{tourist.location}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusColor(tourist.status)}>
                        {tourist.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div className="w-12 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${tourist.safetyScore >= 80 ? 'bg-green-600' : 
                                                 tourist.safetyScore >= 60 ? 'bg-yellow-600' : 'bg-red-600'}`}
                            style={{ width: `${tourist.safetyScore}%` }}
                          />
                        </div>
                        <span className={`text-sm ${getRiskColor(tourist.riskLevel)}`}>
                          {tourist.safetyScore}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <CheckCircle className={`h-4 w-4 ${
                          tourist.verificationStatus === 'verified' ? 'text-green-600' : 'text-yellow-600'
                        }`} />
                        <span className="text-xs">{tourist.verificationStatus}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline" onClick={() => setSelectedTourist(tourist)}>
                              View
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Tourist Profile: {tourist.name}</DialogTitle>
                            </DialogHeader>
                            
                            {selectedTourist && (
                              <div className="space-y-6">
                                {/* Digital ID Card */}
                                <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                                  <CardContent className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                      <div>
                                        <h3 className="text-lg">Digital Tourist ID</h3>
                                        <p className="text-sm opacity-90">Blockchain Verified</p>
                                      </div>
                                      <div className="bg-white p-2 rounded">
                                        <QrCode className="h-8 w-8 text-gray-800" />
                                      </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                      <div>
                                        <p><span className="opacity-80">Name:</span> {selectedTourist.name}</p>
                                        <p><span className="opacity-80">ID:</span> {selectedTourist.id}</p>
                                        <p><span className="opacity-80">Nationality:</span> {selectedTourist.nationality}</p>
                                      </div>
                                      <div>
                                        <p><span className="opacity-80">Age:</span> {selectedTourist.age}</p>
                                        <p><span className="opacity-80">Check-in:</span> {selectedTourist.checkIn}</p>
                                        <p><span className="opacity-80">Check-out:</span> {selectedTourist.checkOut}</p>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>

                                {/* Details Grid */}
                                <div className="grid grid-cols-2 gap-6">
                                  <div className="space-y-4">
                                    <div>
                                      <h4 className="text-sm text-gray-600 mb-2">Contact Information</h4>
                                      <div className="space-y-1 text-sm">
                                        <p>Phone: {selectedTourist.phone}</p>
                                        <p>Email: {selectedTourist.email}</p>
                                        <p>Emergency: {selectedTourist.emergencyContact}</p>
                                      </div>
                                    </div>
                                    
                                    <div>
                                      <h4 className="text-sm text-gray-600 mb-2">Identity Verification</h4>
                                      <div className="space-y-1 text-sm">
                                        <p>Document: {selectedTourist.idType}</p>
                                        <p>Number: {selectedTourist.idNumber}</p>
                                        <p className="text-xs text-gray-500">
                                          Blockchain: {selectedTourist.blockchainHash}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div className="space-y-4">
                                    <div>
                                      <h4 className="text-sm text-gray-600 mb-2">Current Status</h4>
                                      <div className="space-y-2">
                                        <div className="flex justify-between">
                                          <span>Location:</span>
                                          <span>{selectedTourist.location}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span>Status:</span>
                                          <Badge variant="outline" className={getStatusColor(selectedTourist.status)}>
                                            {selectedTourist.status}
                                          </Badge>
                                        </div>
                                        <div className="flex justify-between">
                                          <span>Safety Score:</span>
                                          <span className={getRiskColor(selectedTourist.riskLevel)}>
                                            {selectedTourist.safetyScore}%
                                          </span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span>Last Activity:</span>
                                          <span>{selectedTourist.lastActivity}</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex space-x-3 pt-4 border-t">
                                  <Button size="sm" variant="outline" className="flex-1">
                                    <Phone className="h-4 w-4 mr-2" />
                                    Contact Tourist
                                  </Button>
                                  <Button size="sm" variant="outline" className="flex-1">
                                    <MapPin className="h-4 w-4 mr-2" />
                                    Track Location
                                  </Button>
                                  <Button size="sm" variant="outline" className="flex-1">
                                    <AlertTriangle className="h-4 w-4 mr-2" />
                                    Send Alert
                                  </Button>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
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