// src/components/ThemeToggle.tsx
import React from 'react';
import { Switch } from 'antd';

interface ThemeToggleProps {
  toggleTheme: () => void;
  isDarkMode: boolean;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ toggleTheme, isDarkMode }) => {
  return (
    <Switch
      checked={isDarkMode}
      onChange={toggleTheme}
      checkedChildren="다크"
      unCheckedChildren="라이트"
    />
  );
};

export default ThemeToggle;
