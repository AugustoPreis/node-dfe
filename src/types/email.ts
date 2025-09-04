export type StatusEnvioEmail = 'pending' | 'sending' | 'sent' | 'delivered' | 'delivery_delayed' | 'bounced' | 'complained' | 'rejected' | 'cancelled' | 'failed';

export interface EmailStatusResponse {
  id: string;
  status?: StatusEnvioEmail;
  status_message?: string;
}

export interface EnderecoEmail {
  email: string;
}