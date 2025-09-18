import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Shield, Smartphone, QrCode, CheckCircle } from 'lucide-react';

interface OnboardingScreenProps {
  onComplete: () => void;
}

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    idType: '',
    idNumber: '',
    phone: '',
    email: ''
  });

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Shield className="h-16 w-16 text-blue-500 mx-auto mb-4" />
              <h2 className="text-2xl text-blue-900 mb-2">Welcome to SafeTour</h2>
              <p className="text-gray-600">Your safety companion for smart tourism</p>
            </div>
            
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-blue-900 mb-2">Features include:</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• One-tap SOS emergency alerts</li>
                  <li>• Geo-fenced safety zones</li>
                  <li>• AI-powered behavior monitoring</li>
                  <li>• Blockchain-verified digital ID</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-xl text-blue-900 mb-4">Registration Details</h2>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <Label htmlFor="idType">ID Type</Label>
                <Select value={formData.idType} onValueChange={(value) => setFormData({...formData, idType: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select ID type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aadhaar">Aadhaar Card</SelectItem>
                    <SelectItem value="passport">Passport</SelectItem>
                    <SelectItem value="license">Driving License</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="idNumber">ID Number</Label>
                <Input
                  id="idNumber"
                  value={formData.idNumber}
                  onChange={(e) => setFormData({...formData, idNumber: e.target.value})}
                  placeholder="Enter ID number"
                />
              </div>
              
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="your.email@example.com"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
            <h2 className="text-xl text-green-900">Digital ID Created!</h2>
            
            <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3>Digital Tourist ID</h3>
                    <p className="text-sm opacity-90">Blockchain Verified</p>
                  </div>
                  <Badge variant="outline" className="text-white border-white">
                    Verified
                  </Badge>
                </div>
                
                <div className="text-left space-y-2 mb-4">
                  <p><span className="opacity-80">Name:</span> {formData.name || 'John Doe'}</p>
                  <p><span className="opacity-80">ID:</span> ST{Math.random().toString().substr(2, 8)}</p>
                  <p><span className="opacity-80">Type:</span> {formData.idType || 'Tourist'}</p>
                </div>
                
                <div className="flex justify-center">
                  <div className="bg-white p-3 rounded-lg">
                    <QrCode className="h-12 w-12 text-gray-800" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <p className="text-sm text-gray-600">
              Your digital ID is now ready. Tap Continue to access your safety dashboard.
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6 h-full flex flex-col">
      {/* Progress Indicator */}
      <div className="flex justify-center mb-6">
        {[1, 2, 3].map((stepNumber) => (
          <div
            key={stepNumber}
            className={`w-3 h-3 rounded-full mx-1 ${
              stepNumber <= step ? 'bg-blue-500' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="flex-1">
        {renderStep()}
      </div>

      {/* Navigation */}
      <div className="mt-6 space-y-3">
        <Button 
          onClick={handleNext} 
          className="w-full"
          disabled={step === 2 && (!formData.name || !formData.idType || !formData.phone)}
        >
          {step === 3 ? 'Continue to App' : 'Next'}
        </Button>
        
        {step > 1 && step < 3 && (
          <Button 
            variant="outline" 
            onClick={() => setStep(step - 1)} 
            className="w-full"
          >
            Back
          </Button>
        )}
      </div>
    </div>
  );
}