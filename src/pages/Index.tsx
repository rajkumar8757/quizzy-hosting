import { useState } from "react";
import { questions } from "../data/quiz-questions";
import { QuizCard } from "../components/QuizCard";
import { QuizProgress } from "../components/QuizProgress";
import { QuizComplete } from "../components/QuizComplete";
import type { QuizState } from "../types/quiz";

const Index = () => {
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestionIndex: 0,
    score: 0,
    isCompleted: false,
    answers: [],
  });

  const currentQuestion = questions[quizState.currentQuestionIndex];

  const handleAnswer = (answerIndex: number) => {
    const isCorrect = answerIndex === currentQuestion.correctAnswer;
    const newAnswers = [...quizState.answers];
    newAnswers[quizState.currentQuestionIndex] = answerIndex;

    setTimeout(() => {
      setQuizState(prev => ({
        ...prev,
        score: isCorrect ? prev.score + 1 : prev.score,
        currentQuestionIndex: 
          prev.currentQuestionIndex === questions.length - 1 
            ? prev.currentQuestionIndex 
            : prev.currentQuestionIndex + 1,
        isCompleted: prev.currentQuestionIndex === questions.length - 1,
        answers: newAnswers,
      }));
    }, 1000);
  };

  const handleRestart = () => {
    setQuizState({
      currentQuestionIndex: 0,
      score: 0,
      isCompleted: false,
      answers: [],
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12 px-4">
      <div className="container max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center text-primary mb-12">
          Fun Quiz Time!
        </h1>

        {!quizState.isCompleted ? (
          <>
            <QuizProgress
              current={quizState.currentQuestionIndex}
              total={questions.length}
              score={quizState.score}
            />
            <QuizCard
              question={currentQuestion}
              onAnswer={handleAnswer}
              userAnswer={quizState.answers[quizState.currentQuestionIndex]}
              isAnswered={quizState.answers[quizState.currentQuestionIndex] !== undefined}
            />
          </>
        ) : (
          <QuizComplete
            score={quizState.score}
            totalQuestions={questions.length}
            onRestart={handleRestart}
          />
        )}
      </div>
    </div>
  );
};

export default Index;