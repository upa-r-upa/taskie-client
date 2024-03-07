interface Props {
  currentYear?: number;
  currentMonth?: number;
  highlight?: boolean;
  dateContents?: Array<DateContent>;

  className?: string;
}

interface DateContent {
  date: number;

  content?: React.ReactNode;
  highlight?: boolean;
}

const Calendar = ({
  currentYear,
  currentMonth,
  dateContents,
  className,
}: Props) => {
  const today = new Date();
  const year = currentYear || today.getFullYear();
  const month = currentMonth || today.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const firstDayOfMonth = new Date(year, month).getDay();

  const leadingDays = Array.from({ length: firstDayOfMonth }).map((_, i) => (
    <div key={`leading-${i}`} className="p-2"></div>
  ));

  const days = Array.from({ length: daysInMonth }, (_, i) => {
    const dayData = dateContents?.find((data) => data.date === i + 1);

    return (
      <div
        key={i}
        className={`text-center p-1 ${
          dayData?.highlight
            ? "border-2 border-blue-500 rounded-lg" // highlight가 true일 때
            : today.getDate() === i + 1
              ? "bg-blue-500 text-white rounded-lg" // 오늘 날짜
              : "bg-gray-100 rounded-lg" // 기본 스타일
        }`}
      >
        {i + 1}

        {dayData?.content && <div className="mt-2">{dayData.content}</div>}
      </div>
    );
  });

  return (
    <div className={`container mx-auto rounded-md p-2 ${className}`}>
      <div className="flex flex-col">
        <div className="overflow-auto">
          <div className="calendar grid grid-cols-7 gap-2 p-4">
            {/* Calendar Header */}
            <div className="text-center font-bold">Sun</div>
            <div className="text-center font-bold">Mon</div>
            <div className="text-center font-bold">Tue</div>
            <div className="text-center font-bold">Wed</div>
            <div className="text-center font-bold">Thu</div>
            <div className="text-center font-bold">Fri</div>
            <div className="text-center font-bold">Sat</div>

            {/* Leading Days */}
            {leadingDays}

            {/* Days in Month */}
            {days}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
