import { useState, useEffect, useCallback } from 'react';
import { SocialWorld, Spark, Challenge, ConnectionEdge, NexusUser, WorldFilter } from '../types';
import { api } from '../services/api';
import { mockWorlds, mockSparks, mockChallenges, mockConnections } from '../data/mockData';

export function useNexusData() {
  const [worlds, setWorlds] = useState<SocialWorld[]>(mockWorlds);
  const [sparks, setSparks] = useState<Spark[]>(mockSparks);
  const [challenges, setChallenges] = useState<Challenge[]>(mockChallenges);
  const [connections, setConnections] = useState<ConnectionEdge[]>(mockConnections);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Synchronize state from backend
  const refreshData = useCallback(async () => {
    try {
      const [worldsRes, sparksRes, challengesRes, connectionsRes] = await Promise.allSettled([
        api.getWorlds(),
        api.getSparks(),
        api.getChallenges(),
        api.getConnections(),
      ]);

      if (worldsRes.status === 'fulfilled') setWorlds(worldsRes.value.worlds);
      if (sparksRes.status === 'fulfilled') setSparks(sparksRes.value.sparks);
      if (challengesRes.status === 'fulfilled') setChallenges(challengesRes.value.challenges);
      if (connectionsRes.status === 'fulfilled') setConnections(connectionsRes.value.connections);
      setError(null);
    } catch (err: unknown) {
      console.warn('Backend sync failed, maintaining resilient local state:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const igniteEnergy = useCallback(async (sparkId: string) => {
    // Optimistic local update
    setSparks((prev) =>
      prev.map((s) => (s.id === sparkId ? { ...s, energy: Math.min(100, s.energy + 5) } : s))
    );

    try {
      const res = await api.igniteEnergy(sparkId);
      if (res.success) {
        setSparks((prev) =>
          prev.map((s) => (s.id === sparkId ? { ...s, energy: res.energy } : s))
        );
      }
    } catch {
      // Retain optimistic state
    }
  }, []);

  const joinChallenge = useCallback(async (challengeId: string, authorId?: string) => {
    try {
      const res = await api.joinChallenge(challengeId, authorId);
      if (res.success) {
        setChallenges((prev) =>
          prev.map((c) => (c.id === challengeId ? res.challenge : c))
        );
      }
    } catch {
      // Optimistic local update
      setChallenges((prev) =>
        prev.map((c) =>
          c.id === challengeId ? { ...c, participantCount: c.participantCount + 1 } : c
        )
      );
    }
  }, []);

  return {
    worlds,
    setWorlds,
    sparks,
    setSparks,
    challenges,
    setChallenges,
    connections,
    setConnections,
    isLoading,
    error,
    refreshData,
    igniteEnergy,
    joinChallenge,
  };
}
