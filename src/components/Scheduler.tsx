import React, { useState, useEffect } from 'react';
import { Button, Input, Modal, Select, List, TimePicker } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { Event } from '../types';

interface SchedulerProps {
  selectedDate: Dayjs;
  events: Event[];
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
}

const Scheduler: React.FC<SchedulerProps> = ({ selectedDate, events, setEvents }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newEvent, setNewEvent] = useState<Event>({
    time: '',
    location: '',
    description: '',
    type: 'meeting',
  });

  useEffect(() => {
    const storedEvents = localStorage.getItem(selectedDate.format('YYYY-MM-DD'));
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
  }, [selectedDate, setEvents]);

  const handleTimeChange = (time: Dayjs | null) => {
    setNewEvent({ ...newEvent, time: time ? time.format('YYYY-MM-DD HH:mm') : '' });
  };

  const handleAddEvent = () => {
    const updatedEvents = [...events, { ...newEvent, time: selectedDate.format('YYYY-MM-DD HH:mm') }];
    setEvents(updatedEvents);
    localStorage.setItem(selectedDate.format('YYYY-MM-DD'), JSON.stringify(updatedEvents));
    setIsModalVisible(false);
    setNewEvent({ time: '', location: '', description: '', type: 'meeting' });
  };

  return (
    <div>
      <Button onClick={() => setIsModalVisible(true)}>일정 추가</Button>
      <List
        itemLayout="horizontal"
        dataSource={events}
        renderItem={(item, index) => (
          <List.Item key={index}>
            <List.Item.Meta
              title={`${dayjs(item.time).format('HH:mm')} - ${item.type}`}
              description={`${item.location} | ${item.description}`}
            />
          </List.Item>
        )}
      />
      <Modal
        title="일정 추가"
        open={isModalVisible}
        onOk={handleAddEvent}
        onCancel={() => setIsModalVisible(false)}
      >
        <TimePicker
          placeholder="시간 선택"
          format="HH:mm"
          onChange={handleTimeChange}
          value={newEvent.time ? dayjs(newEvent.time, "YYYY-MM-DD HH:mm") : null}
        />
        <Input
          placeholder="장소"
          value={newEvent.location}
          onChange={e => setNewEvent({ ...newEvent, location: e.target.value })}
        />
        <Input
          placeholder="내용"
          value={newEvent.description}
          onChange={e => setNewEvent({ ...newEvent, description: e.target.value })}
        />
        <Select
          defaultValue="meeting"
          onChange={(value) => setNewEvent({ ...newEvent, type: value })}
        >
          <Select.Option value="meeting">회의</Select.Option>
          <Select.Option value="event">행사</Select.Option>
          <Select.Option value="task">작업</Select.Option>
        </Select>
      </Modal>
    </div>
  );
};

export default Scheduler;
