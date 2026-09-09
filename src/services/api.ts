import { SocialWorld, Spark, Challenge, NexusUser, ConnectionEdge, SparkAuthor, ReactionType } from '../types';

/**
 * NEXUS Centralized API Client Service Layer
 * Provides robust error handling, typed payloads, and resilient fallback responses.
 */

class ApiService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000); // 12s timeout

    try {
      const response = await fetch(endpoint, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          ...(options.headers || {}),
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        throw new Error(errorBody.error || `HTTP error ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (err: unknown) {
      clearTimeout(timeoutId);
      if (err instanceof Error && err.name === 'AbortError') {
        throw new Error(`Request to ${endpoint} timed out.`);
      }
      throw err;
    }
  }

  // --- Health & Audits ---
  public async getHealth(): Promise<{ status: string }> {
    return this.request('/api/health');
  }

  public async getSecurityAudit(): Promise<any> {
    return this.request('/api/system/security-audit');
  }

  // --- Worlds ---
  public async getWorlds(): Promise<{ worlds: SocialWorld[] }> {
    return this.request('/api/worlds');
  }

  public async getWorld(id: string): Promise<{ world: SocialWorld }> {
    return this.request(`/api/worlds/${id}`);
  }

  // --- Sparks ---
  public async getSparks(): Promise<{ sparks: Spark[] }> {
    return this.request('/api/sparks');
  }

  public async createSpark(payload: {
    worldId: string;
    title: string;
    content: string;
    tags?: string[];
    authorId?: string;
  }): Promise<{ success: boolean; spark: Spark }> {
    return this.request('/api/sparks', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  public async remixSpark(
    parentSparkId: string,
    payload: {
      title: string;
      content: string;
      remixType: 'fork' | 'counter-thesis' | 'specialization' | 'analogy';
      evolutionNote: string;
      worldId: string;
      tags?: string[];
      authorId?: string;
    }
  ): Promise<{ success: boolean; spark: Spark }> {
    return this.request(`/api/sparks/${parentSparkId}/remix`, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  public async mergeSparks(payload: {
    sparkIds: string[];
    synthesizedTitle: string;
    synthesizedContent: string;
    targetWorldId: string;
    tags?: string[];
    authorId?: string;
  }): Promise<{ success: boolean; projectSpark: Spark }> {
    return this.request('/api/sparks/merge', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  public async igniteEnergy(sparkId: string): Promise<{ success: boolean; energy: number }> {
    return this.request(`/api/sparks/${sparkId}/ignite`, {
      method: 'POST',
    });
  }

  public async reactToSpark(
    sparkId: string,
    reactionType: ReactionType
  ): Promise<{ success: boolean; spark: Spark }> {
    return this.request(`/api/sparks/${sparkId}/react`, {
      method: 'POST',
      body: JSON.stringify({ reactionType }),
    });
  }

  // --- Challenges ---
  public async getChallenges(): Promise<{ challenges: Challenge[] }> {
    return this.request('/api/challenges');
  }

  public async joinChallenge(
    challengeId: string,
    authorId?: string
  ): Promise<{ success: boolean; challenge: Challenge }> {
    return this.request(`/api/challenges/${challengeId}/join`, {
      method: 'POST',
      body: JSON.stringify({ authorId }),
    });
  }

  // --- Connections & Synergy Graph ---
  public async getConnections(): Promise<{ connections: ConnectionEdge[] }> {
    return this.request('/api/connections');
  }

  // --- Auth ---
  public async login(
    email: string,
    password?: string
  ): Promise<{ success: boolean; user: NexusUser; token: string }> {
    return this.request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  public async register(payload: {
    name: string;
    email: string;
    role?: string;
    bio?: string;
    skills?: string[];
  }): Promise<{ success: boolean; user: NexusUser; token: string }> {
    return this.request('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }
}

export const api = new ApiService();
