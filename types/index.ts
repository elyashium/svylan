export type UserType = 'household' | 'commercial';

export interface User {
  id: string;
  name: string;
  email: string;
  userType: UserType;
  createdAt: Date;
}

export interface GeoLocation {
  latitude: number;
  longitude: number;
}

export interface Plant {
  id: string;
  name: string;
  species: string;
  image: string;
  location: PlantLocation;
  geoLocation?: GeoLocation; // Geographical coordinates of the plant
  region?: string; // Area/region name where the plant is located
  age: number; // in weeks
  userId: string;
  twitterHandle?: string;
  sensorId?: string;
  createdAt: Date;
}

export type PlantLocation = 'indoor' | 'outdoor';

export interface PlantSensorData {
  plantId: string;
  waterLevel: number; // percentage
  humidity: number; // percentage
  light: number; // percentage
  temperature: number; // celsius
  fertilizer: number; // percentage
  nextWatering: number; // minutes until next watering
  lastUpdated: Date;
}

export interface PlantHealth {
  overallStatus: 'excellent' | 'good' | 'fair' | 'poor' | 'critical';
  issues: HealthIssue[];
  recommendations: string[];
  lastUpdated: Date;
}

export interface HealthIssue {
  type: 'water' | 'light' | 'temperature' | 'humidity' | 'fertilizer' | 'other';
  severity: 'low' | 'medium' | 'high';
  message: string;
}

export interface Tweet {
  id: string;
  plantId: string;
  message: string;
  sentiment: 'happy' | 'neutral' | 'annoyed' | 'distressed';
  createdAt: Date;
}

export interface FarmSection {
  id: string;
  name: string;
  type: 'greenhouse' | 'field' | 'indoor' | 'hydroponics';
  plantCount: number;
  area: number; // in square meters
  userId: string;
}