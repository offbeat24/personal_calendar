import React from 'react';
import { Calendar as AntdCalendar, Badge } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { Event } from '../types';

interface CalendarProps {
  onSelectDate: (date: Dayjs) => void; // 날짜 선택 시 호출되는 함수
  events: Event[]; // 모든 이벤트 데이터 배열
  selectedDate: Dayjs; // 현재 선택된 날짜
}

const Calendar: React.FC<CalendarProps> = ({ onSelectDate, events, selectedDate }) => {
  // 날짜가 선택되었을 때 호출되는 함수
  const onSelect = (date: Dayjs) => {
    onSelectDate(dayjs(date));
  };

  /**
    달력의 각 날짜 셀에 표시될 이벤트 뱃지를 렌더링하는 함수.
    선택된 날짜에 해당하는 이벤트가 있다면 뱃지를 표시합니다.
   */
  const dateCellRender = (value: Dayjs) => {
    const listData = events.filter(event => value.isSame(dayjs(event.time, 'YYYY-MM-DD'), 'day'));

    return (
      <ul style={{ margin: 0, padding: '0 0.5rem', listStyle: 'none', display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: '5px' }}>
        {listData.map((item, index) => (
          <li key={index}>
            <Badge status={item.type === 'meeting' ? 'success' : item.type === 'event' ? 'warning' : 'error'} />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <AntdCalendar value={selectedDate} onSelect={onSelect} dateCellRender={dateCellRender} />
  );
};

export default Calendar;
