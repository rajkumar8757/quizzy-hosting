import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import confetti from 'canvas-confetti';

interface QuizCompleteProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

export const QuizComplete = ({ score, totalQuestions, onRestart }: QuizCompleteProps) => {
  const percentage = (score / totalQuestions) * 100;

  React.useEffect(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);

  return (
    <Card className="w-full max-w-2xl p-8 text-center animate-celebrate">
      <h2 className="text-3xl font-bold mb-4">Quiz Complete! 🎉</h2>
      <p className="text-xl mb-6">
        You scored {score} out of {totalQuestions} ({Math.round(percentage)}%)
      </p>
      <Button onClick={onRestart} size="lg">
        Try Again
      </Button>
    </Card>
  );
};