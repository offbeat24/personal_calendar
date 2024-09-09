import React from 'react';
import { Calendar as AntdCalendar, Badge } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { Event } from '../types';

interface CalendarProps {
  onSelectDate: (date: Dayjs) => void;
  events: Event[];
}

const Calendar: React.FC<CalendarProps> = ({ onSelectDate, events }) => {
  const onSelect = (date: Dayjs) => {
    onSelectDate(dayjs(date));
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = events.filter(event => value.isSame(dayjs(event.time, 'YYYY-MM-DD'), 'day'));

    return (
      <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: '5px' }}>
        {listData.map((item, index) => (
          <li key={index}>
            <Badge status={item.type === 'meeting' ? 'success' : item.type === 'event' ? 'warning' : 'error'} />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <AntdCalendar onSelect={onSelect} dateCellRender={dateCellRender} />
  );
};

export default Calendar;
