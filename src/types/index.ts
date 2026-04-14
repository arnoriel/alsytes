export interface Website {
  id: string;
  name: string;
  prompt: string;
  source_code: string;
  created_at: string;
  thumbnail?: string;
  page_name?: string;
  deployed_at?: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export type GenerationStatus =
  | 'idle'
  | 'thinking'
  | 'streaming'
  | 'done'
  | 'error';

export interface UserCredits {
  id: string;
  user_id: string;
  credits: number;
  reset_at: string;
  created_at: string;
  updated_at: string;
}
