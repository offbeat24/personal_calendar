import React from 'react';
import { Button } from 'antd';
import ThemeToggle from './ThemeToggle';

interface GNBProps {
  toggleTheme: () => void; // 테마 토글 함수
  isDarkMode: boolean; // 다크 모드 여부
  clearAllEvents: () => void; // 모든 일정 삭제 함수
}

const Header: React.FC<GNBProps> = ({ toggleTheme, isDarkMode, clearAllEvents }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: isDarkMode ? '#333' : '#f0f2f5', // 다크 모드에 따른 배경색 설정
        color: isDarkMode ? '#fff' : '#000', // 다크 모드에 따른 텍스트 색상 설정
      }}
    >
      {/* 왼쪽 로고 섹션 */}
      <div style={{ fontWeight: 'bold', fontSize: '20px' }}>
        Calendar
      </div>

      {/* 오른쪽 버튼 섹션: 모든 일정 삭제 및 테마 토글 */}
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <Button onClick={clearAllEvents}>모든 일정 삭제</Button>
        <ThemeToggle toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
      </div>
    </div>
  );
};

export default Header;
