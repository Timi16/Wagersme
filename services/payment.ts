import axios from 'axios';

interface WithdrawalResponse {
  message: string;
  transfer: any;
}

export const initiateWithdrawal = async (amount: number): Promise<WithdrawalResponse> => {
  try {
    const response = await axios.post<WithdrawalResponse>('/api/payment/withdraw', { amount });
    return response.data;
  } catch (error) {
    throw error;
  }
};