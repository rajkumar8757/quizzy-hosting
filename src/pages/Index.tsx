import { useState } from "react";
import { questions } from "../data/quiz-questions";
import { QuizCard } from "../components/QuizCard";
import { QuizProgress } from "../components/QuizProgress";
import { QuizComplete } from "../components/QuizComplete";
import { UserDetailsForm } from "../components/UserDetailsForm";
import type { QuizState } from "../types/quiz";

interface UserDetails {
  name: string;
  rollNo: string;
  collegeName: string;
}

const Index = () => {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
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
    setUserDetails(null);
  };

  const handleUserDetailsSubmit = (details: UserDetails) => {
    setUserDetails(details);
    console.log("User details submitted:", details);
  };

  if (!userDetails) {
    return <UserDetailsForm onSubmit={handleUserDetailsSubmit} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12 px-4">
      <div className="container max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-primary">Fun Quiz Time!</h1>
          <p className="text-gray-600">Welcome, {userDetails.name}!</p>
          <p className="text-sm text-gray-500">
            {userDetails.rollNo} | {userDetails.collegeName}
          </p>
        </div>

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