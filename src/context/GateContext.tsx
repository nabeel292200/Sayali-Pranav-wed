import React, { createContext, useContext, useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { GateOpening } from '../components/GateOpening';
import { audioService } from '../services/audio';

const GateContext = createContext<boolean>(false);

export const useGate = () => useContext(GateContext);

export function GateProvider({ children }: { children: React.ReactNode }) {
  const [opened, setOpened] = useState(false);
  const [unmounted, setUnmounted] = useState(false);

  useEffect(() => {
    document.body.style.overflow = opened ? '' : 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [opened]);

  useEffect(() => {
    if (!opened) return;
    const timer = setTimeout(() => setUnmounted(true), 2200);
    return () => clearTimeout(timer);
  }, [opened]);

  const handleOpen = () => {
    setOpened(true);
    audioService.play();
  };

  return (
    <GateContext.Provider value={opened}>
      {children}
      <AnimatePresence>
        {!unmounted && <GateOpening opened={opened} onOpen={handleOpen} />}
      </AnimatePresence>
    </GateContext.Provider>
  );
}
