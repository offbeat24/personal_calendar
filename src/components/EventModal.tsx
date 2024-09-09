import React from 'react';
import { Modal, Input, Select, TimePicker } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { Event } from '../types';

interface EventModalProps {
  visible: boolean; // 모달의 가시성을 제어하는 상태
  onCancel: () => void; // 모달 취소 시 호출되는 함수
  onOk: () => void; // 모달 확인 시 호출되는 함수
  event: Event; // 현재 입력 중인 이벤트 데이터
  setEvent: React.Dispatch<React.SetStateAction<Event>>; // 이벤트 데이터를 업데이트하는 함수
  validationErrors: { time: string; location: string; description: string }; // 입력 검증 오류 메시지
  handleTimeChange: (time: Dayjs | null) => void; // 시간 변경 핸들러
}

const EventModal: React.FC<EventModalProps> = ({
  visible,
  onCancel,
  onOk,
  event,
  setEvent,
  validationErrors,
  handleTimeChange,
}) => {
  return (
    <Modal
      title="일정 추가" // 모달의 제목
      open={visible} // 모달의 가시성 상태
      onOk={onOk} // 확인 버튼 클릭 시 호출
      onCancel={onCancel} // 취소 버튼 클릭 시 호출
    >
      {/* 이벤트 타입 선택과 시간 선택을 수평으로 배치 */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
        <Select
          defaultValue="회의" // 기본 값 설정
          onChange={(value) => setEvent({ ...event, type: value })} // 선택된 타입을 이벤트에 설정
          style={{ flex: 1 }}
        >
          <Select.Option value="회의">회의</Select.Option>
          <Select.Option value="행사">행사</Select.Option>
          <Select.Option value="작업">작업</Select.Option>
        </Select>
        <TimePicker
          placeholder="시간 선택" // 타임피커의 플레이스홀더
          format="HH:mm" // 시간 형식 지정
          onChange={handleTimeChange} // 시간 변경 핸들러
          value={event.time ? dayjs(event.time, "YYYY-MM-DD HH:mm") : null} // 이벤트 시간 값 설정
          style={{ flex: 2 }}
        />
      </div>
      {validationErrors.time && <div style={{ color: 'red', marginBottom: '10px' }}>{validationErrors.time}</div>}
      <Input
        placeholder="장소" // 입력 필드의 플레이스홀더
        value={event.location} // 이벤트 장소 값 설정
        onChange={e => setEvent({ ...event, location: e.target.value })} // 입력 값 변경 시 이벤트 업데이트
        style={{ marginBottom: '10px' }}
      />
      {validationErrors.location && <div style={{ color: 'red', marginBottom: '10px' }}>{validationErrors.location}</div>}
      <Input
        placeholder="내용" // 입력 필드의 플레이스홀더
        value={event.description} // 이벤트 설명 값 설정
        onChange={e => setEvent({ ...event, description: e.target.value })} // 입력 값 변경 시 이벤트 업데이트
        style={{ marginBottom: '10px' }}
      />
      {validationErrors.description && <div style={{ color: 'red', marginBottom: '10px' }}>{validationErrors.description}</div>}
    </Modal>
  );
};

export default EventModal;
