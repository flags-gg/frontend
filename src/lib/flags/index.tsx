import React, {createContext, useContext, useEffect, useState, FC, useCallback} from 'react';
import deepEqual from 'fast-deep-equal';

import {Flags, FlagsProviderProps, ServerResponse} from './types';

// Creating the context
const defaultFlags: Flags = {};
const FlagsContext = createContext<Flags>(defaultFlags);

export const FlagsProvider: FC<FlagsProviderProps> = ({ options, children }) => {
  const { flagsURL = "https://api.flags.gg/v1/flags", companyId, agentId } = options;

  const [flags, setFlags] = useState({});
  const [intervalAllowed, setIntervalAllowed] = useState(60);
  const [secretMenu, setSecretMenu] = useState<string[]>([]);
  const [localOverrides, setLocalOverrides] = useState<Flags>({});

  const fetchFlags = useCallback(async () => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    if (companyId) {
      headers.append('x-company-id', companyId);
    }
    if (agentId) {
      headers.append('x-agent-id', agentId);
    }

    try {
      const response = await fetch(flagsURL, {
        method: 'GET',
        headers: headers,
      });
      const data: ServerResponse = await response.json();
      setIntervalAllowed(data.intervalAllowed);
      setSecretMenu(data.secretMenu);
      const newFlags = data.flags.reduce((acc: any, flag: { feature: { name: string; }; }) => ({
        ...acc,
        [flag.feature.name]: flag
      }), {});
      if (!deepEqual(flags, newFlags)) {
        setFlags(newFlags);
      }
    } catch (error) {
      console.error('Error fetching flags:', error);
    }
  }, [flagsURL, intervalAllowed, agentId, companyId]);

  useEffect(() => {
    fetchFlags();
    const interval = setInterval(() => {
      fetchFlags();
    }, intervalAllowed * 1000);
    return () => clearInterval(interval);
  }, [fetchFlags, intervalAllowed]);

  const toggleFlag = (flagName: string) => {
    setFlags(prevFlags => ({
      ...prevFlags,
      [flagName]: {
        ...prevFlags[flagName],
        enabled: !prevFlags[flagName].enabled,
      },
    }));
    setLocalOverrides(prevLocalOverrides => ({
      ...prevLocalOverrides,
      [flagName]: {
        ...prevLocalOverrides[flagName],
        enabled: !prevLocalOverrides[flagName].enabled,
      },
    }));
  }

  return (
    <FlagsContext.Provider value={flags}>
      {children}
    </FlagsContext.Provider>
  );
};

// Hook to use flags
export const useFlags = () => {
  const context = useContext(FlagsContext);
  if (context === undefined) {
    throw new Error('useFlags must be used within a FlagsProvider');
  }
  return {
    is: (featureName: string) => ({
      enabled: () => context[featureName] && context[featureName].enabled,
    }),
  };
};
