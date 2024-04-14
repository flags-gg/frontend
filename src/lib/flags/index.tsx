import React, {createContext, useContext, useEffect, useState, FC, useCallback} from 'react';
import deepEqual from 'fast-deep-equal';

import {Flags, FlagsProviderProps, ServerResponse} from './types';
import SecretMenu from "./keycodes.tsx";

// Creating the context
const defaultFlags: Flags = {};
const FlagsContext = createContext<Flags>(defaultFlags);

const logIt = (...message: unknown[]) => {
  console.log.apply(console, [
    'Flags.gg',
    new Date().toISOString(),
    ...message,
  ]);
}

export const FlagsProvider: FC<FlagsProviderProps> = ({ options, children }) => {
  const { flagsURL = "https://api.flags.gg/v1/flags", companyId, agentId, enableLogs } = options;

  const [flags, setFlags] = useState<Flags>({});
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
      if (enableLogs) { logIt('oldFlags:', flags); }
      if (enableLogs) { logIt('newFlags:', newFlags); }
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
    if (enableLogs) {
      logIt('Toggling flag:', flagName);
      logIt('prevFlags:', flags);
      logIt('prevLocalOverrides:', localOverrides);
    }

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
        enabled: !prevLocalOverrides[flagName]?.enabled,
      },
    }));
  }

  return (
    <FlagsContext.Provider value={flags}>
      {children}
      {secretMenu && <SecretMenu secretMenu={secretMenu} flags={flags} toggleFlag={toggleFlag} />}
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
