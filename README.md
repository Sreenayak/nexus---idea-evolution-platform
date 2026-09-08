# NEXUS — Collaborative Idea Evolution Engine

> **"Ideas evolve through people."**  
> NEXUS is an evolutionary ideation and research platform where concepts don't live in static silos—they branch, cross-pollinate, remix, and mutate across thematic Social Worlds through collective human-machine intelligence.

---

##  Table of Contents

- [Overview](#-overview)
- [Core Concepts & Architecture](#-core-concepts--architecture)
  - [1. Social Worlds](#1-social-worlds)
  - [2. Sparks & Lineage DAGs](#2-sparks--lineage-dags)
  - [3. Remix & Merge Engine](#3-remix--merge-engine)
  - [4. Collaborative Sprint Challenges](#4-collaborative-sprint-challenges)
  - [5. NOVA AI Synthesis Copilot](#5-nova-ai-synthesis-copilot)
  - [6. Omni-Search Engine](#6-omni-search-engine)
  - [7. Node Identity & Authentication](#7-node-identity--authentication)
- [Tech Stack](#-tech-stack)
- [Getting Started & Local Setup](#-getting-started--local-setup)
  - [Prerequisites](#prerequisites)
  - [Installation Steps](#installation-steps)
  - [Environment Configuration](#environment-configuration)
  - [Running the Application](#running-the-application)
- [Important Troubleshooting (Browser Access)](#-important-troubleshooting-browser-access)
- [Project Directory Structure](#-project-directory-structure)
- [API Reference](#-api-reference)
- [Contributing](#-contributing)
- [License](#-license)

---

##  Overview

Traditional collaboration platforms treat ideas like static social posts, tickets, or documents. In contrast, **NEXUS** treats every idea as a living evolutionary organism:
- Ideas (**Sparks**) possess genealogy, energy pulses, and cross-domain compatibility.
- Any researcher can clone, branch, critique, or merge ideas into new evolutionary offshoots.
- Interactive **Directed Acyclic Graphs (DAGs)** visualize the entire ancestry and branching pedigree of every discovery.
- AI co-agents assist researchers in identifying conceptual blind spots and proposing synthesis leaps across unrelated fields.

---

##  Core Concepts & Architecture

### 1. Social Worlds
Thematic innovation hubs where creators and researchers congregate around specific technological and philosophical frontiers:
- **Neural Autonomy & Synthetic Cognition**: Multi-agent swarms, self-reflecting LLMs, and cognitive feedback loops.
- **Spatial UI & Tactile Computing**: Neural-haptic interfaces, lightfield displays, and perceptual ergonomics.
- **Decentralized Science (DeSci)**: Quadratic micro-grants, open peer-review consensus, and on-chain protocol mechanics.
- **Bio-Synthetic Interfaces**: Wetware computation, DNA data storage, and biological neural nets.
- **Planetary Resilience & Energy**: Smart micro-grids, carbon-capture kinetics, and closed-loop material cycles.

### 2. Sparks & Lineage DAGs
Every concept created in NEXUS is an atomic unit known as a **Spark**:
- **Branch Types**:
  - `Seed / Original Spark`: The root idea establishing the conceptual foundation.
  - `Critical Critique`: Formal architectural or philosophical stress tests.
  - `Technical Extension`: Implementation blueprints, schematics, or mathematical models.
  - `Cross-Domain Fusion`: Combining elements from two disparate scientific disciplines.
  - `Synthetic Pivot`: Strategic evolution based on automated AI-assisted counterfactuals.
- **Evolutionary Lineage Graph**: An interactive visual graph mapping parent-child relationships, ancestry depth, mutation rates, and contributor paths.

### 3. Remix & Merge Engine
- **Remix**: Fork an existing Spark to create a specialized lineage branch, carrying forward citations and attribution.
- **Merge**: Synthesize two disparate Sparks into a single unified hybrid concept, resolving contradictions and bridging disparate disciplines.

### 4. Collaborative Sprint Challenges
Time-bound community sprints targeting specific open research questions (e.g., *"Zero-Latency Neural Synchronization"*):
- Milestone tracking, community submission rosters, and verification voting.
- Contributor reputation rewards, verified skill badges, and node attribution.

### 5. NOVA AI Synthesis Copilot
A context-aware intelligent agent integrated into the ideation pipeline:
- **Challenge Co-Creation**: Generates rigorous multidisciplinary research prompts.
- **Spark Evolution**: Suggests concrete next steps, technical implementations, or contrarian critiques for any active Spark.
- **Synthesis Engine**: Merges concepts using prompt-grounded reasoning models.

### 6. Omni-Search Engine
- Accessible via global hotkeys (<kbd>/</kbd> or <kbd>Ctrl</kbd> + <kbd>K</kbd>) or navigation controls.
- Real-time multi-index querying across:
  - **Sparks** (titles, technical abstracts, tags, and authors)
  - **Social Worlds** (domains, categories, active topics)
  - **Sprint Challenges** (active rewards, criteria, participant lists)
  - **Researchers & Contributors** (profiles, handles, skills)

### 7. Node Identity & Authentication
- **Secure Registration & Login**: Full email + password authentication with credential validation.
- **Demo Personas**: Instant one-click node switching between pre-configured researchers (Elena Vance, Alex Rivera, Marcus Thorne, Dr. Soren Chen).
- **Session State**: Seamless login/logout flows, token storage, and persistent identity profiles.

---

##  Tech Stack

### Frontend
- **React 18**: Modern component architecture utilizing functional components and hooks.
- **TypeScript**: Strict type definitions for nodes, graphs, sparks, and users.
- **Tailwind CSS (v4)**: Utility-first design system with responsive typography, neutral scales, and micro-interactions.
- **Lucide Icons**: Consistent vector iconography.
- **Typography**: Paired display fonts (*Outfit* for headings, *Plus Jakarta Sans* for UI/body, and *JetBrains Mono* for telemetry and node identifiers).

### Backend
- **Node.js + Express**: RESTful API service handling authentication, social world registry, spark mutation, and search indexing.
- **Vite Middleware**: Unified development pipeline serving the Single Page Application through the Express server.
- **Google GenAI SDK (`@google/genai`)**: Integration for server-side AI-assisted ideation and synthesis via the Gemini models.

---

##  Getting Started & Local Setup

### Prerequisites
- **Node.js** (version 18.x or 20.x or later)
- **npm** (version 9.x or higher)
- **Visual Studio Code** (or any code editor of your choice)

---

### Installation Steps

1. **Extract Project Archive**:
   Extract the downloaded ZIP file to your preferred workspace directory.

2. **Open in Visual Studio Code**:
   - Open VS Code.
   - Click **File** > **Open Folder...** and select the extracted project directory.

3. **Open the Terminal**:
   - In VS Code, press `Ctrl + \`` (or `Cmd + \`` on macOS), or select **Terminal** > **New Terminal**.

4. **Install Node Dependencies**:
   Run the following command to install all frontend and backend libraries:
   ```bash
   npm install

##  Project File Structure

```text
nexus-idea-evolution/
├── .env.example                 # Environment variables template (GEMINI_API_KEY)
├── index.html                   # HTML entry point with font imports & SEO metadata
├── metadata.json                # Project identification and capabilities config
├── package.json                 # Project dependencies, build scripts, and engine info
├── server.ts                    # Full-stack Express backend, REST APIs & Vite dev middleware
├── tsconfig.json                # TypeScript project configuration
├── tsconfig.node.json           # TypeScript configuration for Node environment
├── vite.config.ts               # Vite build configuration with Tailwind CSS plugin
│
└── src/
    ├── main.tsx                 # React DOM client entry point
    ├── App.tsx                  # Core application orchestrator, state manager & router
    ├── index.css                # Global Tailwind CSS directives, design tokens & typography
    ├── types.ts                 # Global TypeScript definitions (Spark, World, User, DAG, Node)
    │
    ├── data/
    │   └── mockData.ts          # Seed data for Social Worlds, Sparks, Challenges & Contributors
    │
    └── components/
        ├── Navbar.tsx           # Global navigation header with conditional Auth & quick search
        ├── HeroSection.tsx      # Landing hero with live network metrics & quick-action triggers
        ├── UniverseOverview.tsx # Constellation-style graph view of Worlds & Sparks
        ├── WorldsDirectory.tsx  # Categorized directory of research domains and themes
        ├── WorldDetail.tsx      # Individual world view with Sparks feed, sprints & participants
        ├── EvolutionGraph.tsx   # Interactive visual Lineage DAG & branch genealogy tree
        ├── ChallengesBoard.tsx  # Collaborative Sprint Challenges, bounties & rewards
        ├── ActivityFeed.tsx     # Real-time event ticker of mutations, forks & merges
        ├── GlobalSearchModal.tsx# Omni-search engine modal with categorization & hotkeys (/ or Ctrl+K)
        ├── AuthModal.tsx        # Sign In, Password Registration & Demo Persona Switcher
        ├── CreateSparkModal.tsx # Modal form for launching new root research Sparks
        ├── RemixModal.tsx       # Branch creation modal with lineage parent tracking
        ├── MergeModal.tsx       # Dual-concept synthesis modal for cross-domain mergers
        ├── UserProfileModal.tsx # Contributor portfolio, created sparks, statistics & badges
        └── NovaAiCopilot.tsx    # AI ideation assistant drawer for synthesis & critiques
```