import React, { useState, useEffect } from 'react';
import Calendar from './components/Calendar';
import Scheduler from './components/Scheduler';
import GNB from './components/GNB';
import { ThemeProvider } from 'antd-style';
import dayjs, { Dayjs } from 'dayjs';
import { Event } from './types';

const App: React.FC = () => {
  // `selectedDate`: 사용자가 선택한 날짜를 저장합니다. 기본값은 오늘 날짜입니다.
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());

  // `events`: 모든 일정 이벤트를 저장하는 상태입니다.
  const [events, setEvents] = useState<Event[]>([]);

  // `isDarkMode`: 다크 모드 여부를 나타내는 상태입니다. 초기값은 라이트 모드(false)입니다.
  const [isDarkMode, setIsDarkMode] = useState(false);

  /**
    컴포넌트 마운트 시 로컬 스토리지에서 이벤트 데이터를 불러옵니다.
    이 효과는 한 번만 실행됩니다.
   */
  useEffect(() => {
    const storedEvents = localStorage.getItem('events');
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
  }, []);

  /**
    `events` 상태가 변경될 때마다 로컬 스토리지에 이벤트 데이터를 저장합니다.
    이로 인해 새로고침 후에도 데이터가 유지됩니다.
   */
  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  /**
    테마를 토글합니다. 현재 테마 모드를 반전시켜 다크 모드와 라이트 모드를 전환합니다.
   */
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  /**
    모든 일정을 삭제하고, 로컬 스토리지에서도 삭제합니다.
    이 함수는 '모든 일정 삭제' 버튼에 연결됩니다.
   */
  const clearAllEvents = () => {
    setEvents([]); // 모든 이벤트를 상태에서 제거
    localStorage.removeItem('events'); // 로컬 스토리지에서도 제거
  };

  /**
    현재 날짜를 오늘로 변경합니다. 달력에서 오늘 날짜로 이동하는 기능을 제공합니다.
    이 함수는 '오늘로 이동' 버튼에 연결됩니다.
   */
  const moveToToday = () => {
    setSelectedDate(dayjs()); // 선택된 날짜를 오늘로 설정
  };

  return (
    <ThemeProvider themeMode={isDarkMode ? 'dark' : 'light'}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          backgroundColor: isDarkMode ? '#141414' : '#ffffff', // 현재 테마에 따른 배경색 설정
          color: isDarkMode ? '#ffffff' : '#000000', // 현재 테마에 따른 텍스트 색상 설정
        }}
      >
        {/* GNB: 상단 글로벌 내비게이션 바 컴포넌트. 테마 토글 및 모든 일정 삭제 기능을 포함합니다. */}
        <GNB toggleTheme={toggleTheme} isDarkMode={isDarkMode} clearAllEvents={clearAllEvents} />

        <div style={{ display: 'flex', flex: 1 }}>
          <div style={{ flex: 1, padding: 20 }}>
            {/* Calendar: 달력 컴포넌트. 사용자가 날짜를 선택할 수 있습니다. */}
            <Calendar selectedDate={selectedDate} onSelectDate={setSelectedDate} events={events} />
          </div>
          <div style={{ flex: 1, padding: 20 }}>
            {/* Scheduler: 일정 관리 컴포넌트. 선택된 날짜의 일정을 표시하고 새로운 일정을 추가할 수 있습니다. */}
            <Scheduler
              selectedDate={selectedDate}
              events={events}
              setEvents={setEvents}
              moveToToday={moveToToday}
            />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
