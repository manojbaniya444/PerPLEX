// Message and Chat Types
export interface SearchInfo {
  stages: string[];
  query: string;
  urls: string[] | string;
  error?: string;
}

export interface Message {
  id: number;
  content: string;
  isUser: boolean;
  type: string;
  isLoading?: boolean;
  searchInfo?: SearchInfo;
}

// Event Source Data Types
export interface StreamData {
  type:
    | "checkpoint"
    | "content"
    | "search_start"
    | "search_results"
    | "search_error"
    | "end";
  content?: string;
  checkpoint_id?: string;
  query?: string;
  urls?: string | string[];
  error?: string;
}

// Component Props Types
export interface InputBarProps {
  currentMessage: string;
  setCurrentMessage: (message: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading?: boolean;
}

export interface MessageAreaProps {
  messages: Message[];
}

export interface SearchStagesProps {
  searchInfo?: SearchInfo;
}

// Chat Hook Types
export interface ChatState {
  messages: Message[];
  currentMessage: string;
  checkpointId: string | null;
  isLoading: boolean;
}

export interface ChatActions {
  setCurrentMessage: (message: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  clearChat: () => void;
}

export type UseChatReturn = ChatState & ChatActions;
