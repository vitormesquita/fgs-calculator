import { apiService } from "../APIService";

export interface ValidatePhoneResponse {
  phone_number: string;
  phone_validation: {
    is_valid: boolean;
  }
}

export class PhoneRoutes {
  
  static async validatePhone(phone: string) {
    const params = { 
      phone, 
      api_key: process.env.EXPO_PUBLIC_PHONE_API_KEY || '' 
    };
    
    try {
      const response = await apiService.get<ValidatePhoneResponse>('', { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};