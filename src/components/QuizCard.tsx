import { useEffect, useState } from "react";
import { Question } from "../types/quiz";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface QuizCardProps {
  question: Question;
  onAnswer: (answerIndex: number) => void;
  userAnswer?: number;
  isAnswered: boolean;
}

export const QuizCard = ({ question, onAnswer, userAnswer, isAnswered }: QuizCardProps) => {
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    if (!isAnswered) {
      const timer = setTimeout(() => {
        onAnswer(-1); // -1 indicates time ran out
      }, 60000); // 1 minute in milliseconds

      const interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      return () => {
        clearTimeout(timer);
        clearInterval(interval);
      };
    }
  }, [question, isAnswered, onAnswer]);

  // Reset timer when question changes
  useEffect(() => {
    setTimeLeft(60);
  }, [question]);

  return (
    <Card className="w-full max-w-2xl p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{question.text}</h2>
        <div className={cn(
          "text-lg font-semibold rounded-full w-12 h-12 flex items-center justify-center",
          timeLeft <= 10 ? "text-red-500" : "text-primary"
        )}>
          {timeLeft}s
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {question.options.map((option, index) => (
          <Button
            key={index}
            onClick={() => !isAnswered && onAnswer(index)}
            className={cn(
              "h-auto py-4 px-6 text-lg",
              isAnswered && index === question.correctAnswer && "bg-green-500 hover:bg-green-600",
              isAnswered && userAnswer === index && index !== question.correctAnswer && "bg-red-500 hover:bg-red-600",
              isAnswered && "cursor-default"
            )}
            disabled={isAnswered}
          >
            {option}
          </Button>
        ))}
      </div>
    </Card>
  );
};