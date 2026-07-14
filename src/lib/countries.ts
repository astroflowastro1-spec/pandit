export interface CountryData {
  code: string;
  name: string;
  currencyCode: string;
  currencySymbol: string;
  flag: string;
}

export const SUPPORTED_COUNTRIES: CountryData[] = [
  { code: 'IN', name: 'India', currencyCode: 'INR', currencySymbol: '₹', flag: '🇮🇳' },
  { code: 'US', name: 'United States', currencyCode: 'USD', currencySymbol: '$', flag: '🇺🇸' },
  { code: 'CA', name: 'Canada', currencyCode: 'CAD', currencySymbol: 'C$', flag: '🇨🇦' },
  { code: 'GB', name: 'United Kingdom', currencyCode: 'GBP', currencySymbol: '£', flag: '🇬🇧' },
  { code: 'AU', name: 'Australia', currencyCode: 'AUD', currencySymbol: 'A$', flag: '🇦🇺' },
  { code: 'SG', name: 'Singapore', currencyCode: 'SGD', currencySymbol: 'S$', flag: '🇸🇬' },
  { code: 'AE', name: 'United Arab Emirates', currencyCode: 'AED', currencySymbol: 'AED', flag: '🇦🇪' },
  { code: 'SA', name: 'Saudi Arabia', currencyCode: 'SAR', currencySymbol: 'SAR', flag: '🇸🇦' },
  { code: 'QA', name: 'Qatar', currencyCode: 'QAR', currencySymbol: 'QAR', flag: '🇶🇦' },
  { code: 'BH', name: 'Bahrain', currencyCode: 'BHD', currencySymbol: 'BHD', flag: '🇧🇭' },
  { code: 'KW', name: 'Kuwait', currencyCode: 'KWD', currencySymbol: 'KWD', flag: '🇰🇼' },
  { code: 'OM', name: 'Oman', currencyCode: 'OMR', currencySymbol: 'OMR', flag: '🇴🇲' },
  { code: 'TH', name: 'Thailand', currencyCode: 'THB', currencySymbol: '฿', flag: '🇹🇭' },
  { code: 'DE', name: 'Germany', currencyCode: 'EUR', currencySymbol: '€', flag: '🇩🇪' },
  { code: 'FR', name: 'France', currencyCode: 'EUR', currencySymbol: '€', flag: '🇫🇷' },
  { code: 'IT', name: 'Italy', currencyCode: 'EUR', currencySymbol: '€', flag: '🇮🇹' },
  { code: 'NZ', name: 'New Zealand', currencyCode: 'NZD', currencySymbol: 'NZ$', flag: '🇳🇿' },
  { code: 'MY', name: 'Malaysia', currencyCode: 'MYR', currencySymbol: 'RM', flag: '🇲🇾' },
  { code: 'NL', name: 'Netherlands', currencyCode: 'EUR', currencySymbol: '€', flag: '🇳🇱' },
];

export const getCountryByCode = (code: string): CountryData => {
  return SUPPORTED_COUNTRIES.find(c => c.code === code) || SUPPORTED_COUNTRIES[1]; // Fallback to US
};
