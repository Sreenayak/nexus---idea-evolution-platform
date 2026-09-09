export type WorldCategory = 'AI & Systems' | 'Startups & Venture' | 'Design & Spatial' | 'Deep Science' | 'Creative & Media' | 'Gaming & Metaverse' | 'BioTech';

export interface WorldPulse {
  energy: number;       // 0-100%
  curiosity: number;    // 0-100%
  creativity: number;   // 0-100%
  collaboration: number;// 0-100%
}

export interface SocialWorld {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: WorldCategory;
  accentColor: string;
  glowColor: string;
  iconName: string;
  coordinates: { x: number; y: number }; // Relative coordinates in Universe (0-100%)
  activeParticipants: number;
  activeSparks: number;
  ongoingChallenges: number;
  activeProjects: number;
  pulse: WorldPulse;
  connectedWorldIds: string[];
  trendingKeywords: string[];
}

export type SparkStatus = 'spark' | 'branching' | 'merged' | 'project' | 'active';
export type RemixType = 'extend' | 'challenge' | 'pivot' | 'specialize' | 'synthesize';

export interface SparkAuthor {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  role: string;
  compatibilityScore?: number;
}

export type ReactionType = 'paradigmShift' | 'contrarian' | 'empiricalRigor' | 'moonshot';

export interface SparkReactions {
  paradigmShift: number;  // 💡 Shifts fundamental paradigm
  contrarian: number;     // ⚡ Healthy contrarian critique
  empiricalRigor: number; // 📐 Scientifically/technically sound
  moonshot: number;       // 🚀 Audacious 10x breakthrough
}

export interface Spark {
  id: string;
  worldId: string;
  title: string;
  content: string;
  author: SparkAuthor;
  createdAt: string;
  status: SparkStatus;
  tags: string[];
  parentSparkId?: string;
  branchType?: 'original' | 'remix' | 'merge' | 'merged';
  remixType?: RemixType;
  remixCount: number;
  mergeCount: number;
  collaboratorsCount?: number;
  views?: number;
  energy: number; // 0-100
  evolutionNote?: string;
  mergedFromIds?: string[];
  mergedIntoId?: string;
  targetProjectTitle?: string;
  childSparkIds?: string[];
  reactions?: SparkReactions;
}

export interface Challenge {
  id: string;
  worldId: string;
  title: string;
  description: string;
  targetOutcome: string;
  rewardBadge: string;
  deadline: string;
  daysRemaining: number;
  participantCount: number;
  maxParticipants: number;
  progressPercent: number;
  tags: string[];
  participants: SparkAuthor[];
  status: 'active' | 'evaluating' | 'completed';
}

export interface NexusUser {
  id: string;
  name: string;
  email?: string;
  handle: string;
  avatar: string;
  role: string;
  bio: string;
  stats: {
    worldsEntered: number;
    sparksCreated: number;
    ideasRemixed: number;
    challengesCompleted: number;
    projectsBuilt: number;
  };
  skills: string[];
  activeProjects: string[];
  badges: {
    id: string;
    name: string;
    icon: string;
    description: string;
  }[];
}

export interface ActivityConnection {
  id: string;
  targetUser: NexusUser;
  compatibilityScore: number; // e.g. 94
  sharedIdeasCount: number;
  mutualWorlds: string[];
  complementarySkills: {
    userSkill: string;
    partnerSkill: string;
    synergyReason: string;
  };
  collaborationStatus: 'connected' | 'exploring' | 'collaborating';
  recentSharedSparkTitle: string;
}

export interface MergedProject {
  id: string;
  title: string;
  synopsis: string;
  sourceSparks: {
    id: string;
    title: string;
    authorName: string;
  }[];
  worldId: string;
  contributors: SparkAuthor[];
  createdAt: string;
  stage: 'Ideation' | 'Prototype' | 'Sprint' | 'Built';
  challengeAligned?: string;
}

// Aliases for architecture flexibility
export type ConnectionEdge = ActivityConnection;
export type WorldFilter = 'all' | 'sparks' | 'remixes' | 'projects';
