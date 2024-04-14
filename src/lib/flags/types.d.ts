import React from 'react';

export interface Flag {
  enabled?: boolean;
  secretMenu: string[];
  featureValue?: string;
  feature: {
    name: string;
    id: string
  }
}
export interface Flags {
  [key: string]: Flag;
}

export interface FlagsProviderOptions {
  flagsURL?: string;
  companyId?: string;
  agentId?: string;
  enableLogs?: boolean;

}

export interface FlagsProviderProps {
  options: FlagsProviderOptions;
  children: React.ReactNode;
}

export interface ServerResponse {
  intervalAllowed: number;
  secretMenu: string[];
  flags: Flag[];
}
