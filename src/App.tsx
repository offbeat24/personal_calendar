// src/App.tsx
import React, { useState } from 'react';
import Calendar from './components/Calendar';
import Scheduler from './components/Scheduler';
import GNB from './components/GNB'; // GNB 컴포넌트 추가
import { ThemeProvider } from 'antd-style';
import dayjs, { Dayjs } from 'dayjs';
import { Event } from './types';

const App: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const [events, setEvents] = useState<Event[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const clearAllEvents = () => {
    setEvents([]); // 이벤트 상태 초기화
    localStorage.clear(); // 로컬 스토리지 비우기
  };

  return (
    <ThemeProvider themeMode={isDarkMode ? 'dark' : 'light'}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          backgroundColor: isDarkMode ? '#141414' : '#ffffff', // 배경색 설정
          color: isDarkMode ? '#ffffff' : '#000000', // 텍스트 색상 설정
        }}
      >
        {/* GNB 추가 */}
        <GNB toggleTheme={toggleTheme} isDarkMode={isDarkMode} clearAllEvents={clearAllEvents} />

        <div style={{ display: 'flex', flex: 1 }}>
          <div style={{ flex: 1, padding: 20 }}>
            <Calendar onSelectDate={setSelectedDate} events={events} />
          </div>
          <div style={{ flex: 1, padding: 20 }}>
            <Scheduler selectedDate={selectedDate} events={events} setEvents={setEvents} />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
