import { Routine } from "../types/routine";

const routine: Array<Routine> = [
  {
    id: 1,
    title: "미라클 점심",
    start_time_minutes: 720,
    repeat_days: [1, 2, 3, 4, 5],
    routine_elements: [
      {
        id: 1,
        title: "목 스트레칭 해주기",
        duration_minutes: 5,
      },
      {
        id: 2,
        title: "리팩토링 책 읽기",
        duration_minutes: 20,
      },
      {
        id: 3,
        title: "오후 회의 준비하기",
        duration_minutes: 10,
      },
      {
        id: 4,
        title: "허리 스트레칭 해주기",
        duration_minutes: 5,
      },
    ],
  },
  {
    id: 2,
    title: "미라클 저녁",
    start_time_minutes: 1080,
    repeat_days: [1, 2, 3, 4, 5],
    routine_elements: [
      {
        id: 5,
        title: "머리 감기",
        duration_minutes: 25,
      },
      {
        id: 6,
        title: "리모델링 팩 하기",
        duration_minutes: 10,
      },
      {
        id: 7,
        title: "다리 스트레칭 하기",
        duration_minutes: 10,
      },
      {
        id: 8,
        title: "잘 준비하기",
        duration_minutes: 5,
      },
    ],
  },
];

export default routine;
