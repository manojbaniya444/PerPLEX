import { StreamData, SearchInfo, Message } from '@/types';

const API_BASE_URL = 'http://localhost:8000';

export class ChatAPI {
  static createStreamURL(userInput: string, checkpointId?: string | null): string {
    let url = `${API_BASE_URL}/chat_stream/${encodeURIComponent(userInput)}`;
    if (checkpointId) {
      url += `?checkpoint_id=${encodeURIComponent(checkpointId)}`;
    }
    return url;
  }

  static parseStreamData(data: string): StreamData | null {
    try {
      return JSON.parse(data);
    } catch (error) {
      console.error("Error parsing event data:", error, data);
      return null;
    }
  }

  static parseSearchUrls(urls: string | string[]): string[] {
    try {
      return typeof urls === 'string' ? JSON.parse(urls) : urls;
    } catch (err) {
      console.error("Error parsing search results:", err);
      return [];
    }
  }
}

export class SearchInfoProcessor {
  static createSearchInfo(
    existingSearchData: SearchInfo | null,
    stage: string,
    data: Partial<SearchInfo> = {}
  ): SearchInfo {
    const stages = existingSearchData ? [...existingSearchData.stages] : [];
    
    if (!stages.includes(stage)) {
      stages.push(stage);
    }

    return {
      stages,
      query: data.query || existingSearchData?.query || "",
      urls: data.urls || existingSearchData?.urls || [],
      error: data.error || existingSearchData?.error
    };
  }

  static addSearchingStage(query: string): SearchInfo {
    return {
      stages: ['searching'],
      query,
      urls: []
    };
  }

  static addReadingStage(
    existingSearchData: SearchInfo | null,
    urls: string[]
  ): SearchInfo {
    return this.createSearchInfo(existingSearchData, 'reading', { urls });
  }

  static addWritingStage(existingSearchData: SearchInfo | null): SearchInfo {
    return this.createSearchInfo(existingSearchData, 'writing');
  }

  static addErrorStage(
    existingSearchData: SearchInfo | null,
    error: string
  ): SearchInfo {
    return this.createSearchInfo(existingSearchData, 'error', { error });
  }
}

export const generateMessageId = (messages: Message[]): number => {
  return messages.length > 0 ? Math.max(...messages.map(msg => msg.id)) + 1 : 1;
};
