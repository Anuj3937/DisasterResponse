import { ApiDisaster, ApiNews } from "./types";

// Sample disaster data for testing/development
export const sampleDisasters: ApiDisaster[] = [
  { id: 1, lat: 34.05, lng: -118.24, type: 'Wildfire', severity: 'high', details: 'Wildfire in Los Angeles County' },
  { id: 2, lat: 29.76, lng: -95.36, type: 'Flood', severity: 'critical', details: 'Flooding in Houston metropolitan area' },
  { id: 3, lat: 40.71, lng: -74.00, type: 'Storm', severity: 'medium', details: 'Severe thunderstorm warning' },
  { id: 4, lat: 33.44, lng: -112.07, type: 'Heat Wave', severity: 'high', details: 'Extreme heat advisory' },
  { id: 5, lat: 47.60, lng: -122.33, type: 'Earthquake', severity: 'low', details: 'Minor seismic activity detected' },
  { id: 6, lat: 25.76, lng: -80.19, type: 'Hurricane', severity: 'critical', details: 'Hurricane warning issued for Miami' },
  { id: 7, lat: 41.85, lng: -87.65, type: 'Tornado', severity: 'medium', details: 'Tornado watch in effect' },
  { id: 8, lat: 39.95, lng: -75.16, type: 'Power Outage', severity: 'low', details: 'Localized power disruptions' }
];

// Sample news data for testing/development
export const sampleNews: ApiNews[] = [
  {
    id: 1,
    title: 'Wildfire Update: Northern Region',
    content: 'Containment has reached 45% as additional fire crews arrive from neighboring states. Evacuation orders remain in effect for Riverdale County.',
    category: 'Wildfire',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() // 2 hours ago
  },
  {
    id: 2,
    title: 'Hurricane Warning: Coastal Areas',
    content: 'Category 3 hurricane expected to make landfall Friday evening. Mandatory evacuations issued for zones A through C.',
    category: 'Hurricane',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString() // 4 hours ago
  },
  {
    id: 3,
    title: 'Earthquake Relief: Southern Province',
    content: 'Relief supplies being airlifted to remote villages. Medical teams have established field hospitals in the most affected areas.',
    category: 'Earthquake',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString() // 6 hours ago
  },
  {
    id: 4,
    title: 'Flood Recovery: Eastern Districts',
    content: 'Water levels beginning to recede in most areas. Clean-up crews deployed to assist with removal of debris and restoration of essential services.',
    category: 'Flood',
    timestamp: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString() // 10 hours ago
  }
];
