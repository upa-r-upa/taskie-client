const todo = [
  {
    id: 1,
    title: "네비게이션 변경하기",

    content:
      "- 네비게이션이 결국 접근하기 어려움\n- 전체적으로 텍스트 박스를 ghost로 바꾸고, 수정이 가능하게끔 바꾸기\n- 습관이나 할 일 등에서 추가로 보여야 할 데이터 넣기\n- 너무 단순한 형태 탈피하기",
  },
  {
    id: 2,
    title: "도웅이 데리러가기",
    content:
      "- 네비게이션이 결국 접근하기 어려움\n- 전체적으로 텍스트 박스를 ghost로 바꾸고, 수정이 가능하게끔 바꾸기\n- 습관이나 할 일 등에서 추가로 보여야 할 데이터 넣기\n- 너무 단순한 형태 탈피하기",
    innerTodoList: [
      {
        title: "할 일 페이지",
        isDone: false,
      },
      {
        title: "루틴 페이지",
        isDone: false,
      },
    ],
  },
  {
    id: 3,
    title: "유치원 알아보기",
    content:
      "- 네비게이션이 결국 접근하기 어려움\n- 전체적으로 텍스트 박스를 ghost로 바꾸기",
  },
  {
    id: 4,
    title: "자동 세차하기",
    innerTodoList: [
      {
        title: "할 일 페이지",
        isDone: false,
      },
      {
        title: "루틴 페이지",
        isDone: false,
      },
    ],
  },
];

export default todo;
