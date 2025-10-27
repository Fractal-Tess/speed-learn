'use client';

interface QuestionIndicatorsProps {
  questions: Array<{ id: string }>;
  currentQuestion: number;
  answers: Record<string, string[]>;
  checkedAnswers: Record<string, boolean>;
  onQuestionSelect: (index: number) => void;
}

export default function QuestionIndicators({
  questions,
  currentQuestion,
  answers,
  checkedAnswers,
  onQuestionSelect
}: QuestionIndicatorsProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center p-4 bg-card border rounded-lg">
      {questions.map((question, index) => {
        const isAnswered = answers[question.id] && answers[question.id].length > 0;
        const isChecked = checkedAnswers[question.id] !== undefined;
        const isCorrect = checkedAnswers[question.id];
        const isCurrent = index === currentQuestion;

        let bgColor = 'bg-white border-2 border-gray-300';
        let hoverColor = 'hover:bg-gray-100';

        if (isCurrent) {
          bgColor = 'bg-blue-500 border-2 border-blue-600';
          hoverColor = 'hover:bg-blue-600';
        } else if (isChecked) {
          if (isCorrect) {
            bgColor = 'bg-green-500 border-2 border-green-600';
            hoverColor = 'hover:bg-green-600';
          } else {
            bgColor = 'bg-red-500 border-2 border-red-600';
            hoverColor = 'hover:bg-red-600';
          }
        } else if (isAnswered) {
          bgColor = 'bg-blue-200 border-2 border-blue-300';
          hoverColor = 'hover:bg-blue-300';
        }

        return (
          <button
            key={question.id}
            onClick={() => onQuestionSelect(index)}
            className={`w-8 h-8 rounded transition-colors ${bgColor} ${hoverColor}`}
            title={`Въпрос ${index + 1}${isChecked ? (isCorrect ? ' - Правилно' : ' - Грешно') : isAnswered ? ' - Отговорен' : ''}`}
          />
        );
      })}
    </div>
  );
}