import React, { useState, useEffect } from 'react';
import { Button, List, message } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { Event } from '../types';
import EventModal from './EventModal';

interface SchedulerProps {
  selectedDate: Dayjs; // 현재 선택된 날짜
  events: Event[]; // 모든 이벤트 데이터 배열
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>; // 이벤트 배열 업데이트 함수
  moveToToday: () => void; // 오늘 날짜로 이동하는 함수
}

const Scheduler: React.FC<SchedulerProps> = ({ selectedDate, events, setEvents, moveToToday }) => {
  const [isModalVisible, setIsModalVisible] = useState(false); // 모달 가시성 상태
  const [newEvent, setNewEvent] = useState<Event>({
    time: '',
    location: '',
    description: '',
    type: 'meeting',
  }); // 새 이벤트의 초기 상태 설정

  const [validationErrors, setValidationErrors] = useState({
    time: '',
    location: '',
    description: '',
  }); // 입력 검증 오류 메시지 상태

  // 선택된 날짜가 변경될 때 로컬 스토리지에서 이벤트 불러오기
  useEffect(() => {
    const storedEvents = localStorage.getItem(selectedDate.format('YYYY-MM-DD'));
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
  }, [selectedDate, setEvents]);

  /**
    입력된 이벤트 데이터의 유효성을 검사하는 함수.
    유효하지 않은 경우 오류 메시지를 설정.
   */
  const validateInputs = (): boolean => {
    const errors = { time: '', location: '', description: '' };
    let isValid = true;

    if (!newEvent.time) {
      errors.time = '시간을 선택해주세요';
      isValid = false;
    }
    if (!newEvent.location.trim()) {
      errors.location = '장소를 입력해주세요';
      isValid = false;
    }
    if (!newEvent.description.trim()) {
      errors.description = '내용을 입력해주세요';
      isValid = false;
    }

    setValidationErrors(errors);
    return isValid;
  };

  // 타임피커에서 선택한 시간을 이벤트에 설정
  const handleTimeChange = (time: Dayjs | null) => {
    setNewEvent({ ...newEvent, time: time ? time.format('YYYY-MM-DD HH:mm') : '' });
  };

  /**
    이벤트를 추가하는 함수.
    유효성 검사를 통과하면 이벤트를 추가하고 모달을 닫음.
   */
  const handleAddEvent = () => {
    if (!validateInputs()) {
      message.error('모든 필드를 올바르게 입력해주세요.');
      return;
    }

    const updatedEvents = [...events, { ...newEvent, time: selectedDate.format('YYYY-MM-DD HH:mm') }];
    setEvents(updatedEvents);
    setIsModalVisible(false);
    setNewEvent({ time: '', location: '', description: '', type: 'meeting' });
  };

  // 선택된 날짜에 해당하는 이벤트를 필터링
  const filteredEvents = events.filter(event =>
    dayjs(event.time).isSame(selectedDate, 'day')
  );

  return (
    <div>
      {/* 오늘로 이동 및 일정 추가 버튼 */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
        <Button onClick={moveToToday}>오늘로 이동</Button>
        <Button type="primary" onClick={() => setIsModalVisible(true)}>일정 추가</Button>
      </div>
      {/* 선택된 날짜의 이벤트 목록 표시 */}
      <List
        itemLayout="horizontal"
        dataSource={filteredEvents}
        renderItem={(item, index) => (
          <List.Item key={index}>
            <List.Item.Meta
              title={`${item.type} - ${dayjs(item.time).format('HH:mm')}`}
              description={`${item.location} | ${item.description}`}
            />
          </List.Item>
        )}
      />
      {/* 일정 추가 모달 컴포넌트 */}
      <EventModal
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleAddEvent}
        event={newEvent}
        setEvent={setNewEvent}
        validationErrors={validationErrors}
        handleTimeChange={handleTimeChange}
      />
    </div>
  );
};

export default Scheduler;
