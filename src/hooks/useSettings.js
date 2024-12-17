import { useState } from 'react';
import { useLocalStorage } from './useLocalStorage';

export const useSettings = () => {
  const [fontSize, setFontSize] = useLocalStorage('editor.fontSize', 14);
  const [minimap, setMinimap] = useLocalStorage('editor.minimap', true);
  const [wordWrap, setWordWrap] = useLocalStorage('editor.wordWrap', true);

  return {
    fontSize,
    setFontSize,
    minimap,
    setMinimap,
    wordWrap,
    setWordWrap
  };
};