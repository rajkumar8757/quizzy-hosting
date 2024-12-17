interface QuizProgressProps {
  current: number;
  total: number;
  score: number;
}

export const QuizProgress = ({ current, total, score }: QuizProgressProps) => {
  const progress = (current / total) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto mb-8 space-y-2">
      <div className="flex justify-between text-sm font-medium">
        <span>Question {current + 1} of {total}</span>
        <span>Score: {score}</span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full">
        <div
          className="h-full bg-primary rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};