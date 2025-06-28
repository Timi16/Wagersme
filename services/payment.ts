import axios from 'axios';
import authService from './auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

interface WithdrawalResponse {
  message: string;
  transfer: any;
}

export const initiateWithdrawal = async (amount: number, bankCode: string, accountNumber: string): Promise<WithdrawalResponse> => {
  try {
    // Retrieve the token using authService
    const token = authService.getToken();
    if (!token) {
      throw new Error('No authentication token found. Please log in.');
    }

    // Make the API call with the token in the Authorization header
    const response = await axios.post<WithdrawalResponse>(
      `${API_URL}/payment/withdraw`,
      { 
        amount,
        bankCode,
        accountNumber 
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      throw new Error('Authentication failed. Please log in again.');
    }
    throw error;
  }
};