import React from 'react';
import { Switch } from 'antd';

interface ThemeToggleProps {
  toggleTheme: () => void; // 테마 토글 함수
  isDarkMode: boolean; // 다크 모드 여부
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ toggleTheme, isDarkMode }) => {
  return (
    <Switch
      checked={isDarkMode} // 스위치가 체크된 상태인지 여부
      onChange={toggleTheme} // 스위치가 변경될 때 호출되는 함수
      checkedChildren="다크" // 체크된 상태에서의 레이블
      unCheckedChildren="라이트" // 체크되지 않은 상태에서의 레이블
    />
  );
};

export default ThemeToggle;
