import React from 'react';
import { Button } from 'antd';
import ThemeToggle from './ThemeToggle';

interface GNBProps {
  toggleTheme: () => void;
  isDarkMode: boolean;
  clearAllEvents: () => void;
}

const Header: React.FC<GNBProps> = ({ toggleTheme, isDarkMode, clearAllEvents }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: isDarkMode ? '#333' : '#f0f2f5',
        color: isDarkMode ? '#fff' : '#000',
      }}
    >
      {/* 왼쪽 로고 */}
      <div style={{ fontWeight: 'bold', fontSize: '20px' }}>
        Calendar
      </div>

      {/* 오른쪽 버튼들 */}
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <Button onClick={clearAllEvents}>모든 일정 삭제</Button>
        <ThemeToggle toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
      </div>
    </div>
  );
};

export default Header;
