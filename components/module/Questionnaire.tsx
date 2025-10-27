'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle, RotateCcw, Check } from 'lucide-react';
import { parseQuestions, generateSampleQuestions, type Question } from '@/lib/questions';
import QuestionIndicators from './QuestionIndicators';

interface QuestionnaireProps {
  content: string;
}

export default function Questionnaire({ content }: QuestionnaireProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [checkedAnswers, setCheckedAnswers] = useState<Record<string, boolean>>({});
  const [showFeedback, setShowFeedback] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const parsedQuestions = parseQuestions(content);
    // If no questions found, use sample questions for demo
    if (parsedQuestions.length === 0) {
      setQuestions(generateSampleQuestions());
    } else {
      setQuestions(parsedQuestions);
    }
  }, [content]);

  const handleAnswerChange = (questionId: string, selectedOptions: string[]) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: selectedOptions
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    let correctCount = 0;

    questions.forEach(question => {
      const userAnswers = answers[question.id] || [];
      const correctAnswers = question.correctAnswers;

      // Check if answers match exactly
      if (userAnswers.length === correctAnswers.length &&
          userAnswers.every(answer => correctAnswers.includes(answer))) {
        correctCount++;
      }
    });

    setScore(correctCount);
    return correctCount;
  };

  const handleSubmit = () => {
    const finalScore = calculateScore();
    setScore(finalScore);
    setShowResults(true);
  };

  const checkCurrentAnswer = () => {
    const currentQ = questions[currentQuestion];
    const userAnswers = answers[currentQ.id] || [];
    const isCorrect = userAnswers.length === currentQ.correctAnswers.length &&
                     userAnswers.every(answer => currentQ.correctAnswers.includes(answer));

    setCheckedAnswers(prev => ({
      ...prev,
      [currentQ.id]: isCorrect
    }));

    setShowFeedback(prev => ({
      ...prev,
      [currentQ.id]: true
    }));
  };

  const handleRetake = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setScore(0);
    setCheckedAnswers({});
    setShowFeedback({});
  };

  if (questions.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No questions available for this module.
      </div>
    );
  }

  if (showResults) {
    const percentage = Math.round((score / questions.length) * 100);

    return (
      <div className="text-center py-6">
        <div className="mb-6">
          <div className="text-6xl font-bold text-blue-600 mb-2">
            {score}/{questions.length}
          </div>
          <div className="text-xl text-gray-600 mb-4">
            {percentage}% Correct
          </div>
          <Progress value={percentage} className="w-full mb-6" />
        </div>

        <div className="space-y-3 mb-6">
          {questions.map((question, index) => {
            const userAnswers = answers[question.id] || [];
            const isCorrect = userAnswers.length === question.correctAnswers.length &&
                             userAnswers.every(answer => question.correctAnswers.includes(answer));

            return (
              <Card key={question.id} className={`p-4 text-left ${isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                <div className="flex items-start space-x-3">
                  {isCorrect ? (
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 mb-1">
                      Question {index + 1}
                    </div>
                    <div className="text-sm text-gray-600">
                      {question.question}
                    </div>
                    {!isCorrect && (
                      <div className="text-sm text-red-700 mt-2">
                        Correct: {question.correctAnswers.join(', ')}
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <Button onClick={handleRetake} className="flex items-center space-x-2">
          <RotateCcw className="h-4 w-4" />
          <span>Retake Quiz</span>
        </Button>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const answeredCount = Object.keys(answers).length;

  return (
    <div className="space-y-6">
      {/* Question Navigation Indicators */}
      <QuestionIndicators
        questions={questions}
        currentQuestion={currentQuestion}
        answers={answers}
        checkedAnswers={checkedAnswers}
        onQuestionSelect={setCurrentQuestion}
      />

      {/* Progress */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            Въпрос {currentQuestion + 1} от {questions.length}
          </span>
          <div className="flex items-center space-x-2">
            {checkedAnswers[currentQ.id] !== undefined && (
              <div className="flex items-center space-x-1">
                {checkedAnswers[currentQ.id] ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-600" />
                )}
                <span className={`text-sm ${checkedAnswers[currentQ.id] ? 'text-green-600' : 'text-red-600'}`}>
                  {checkedAnswers[currentQ.id] ? 'Правилно' : 'Грешно'}
                </span>
              </div>
            )}
            <span className="text-sm text-gray-500">
              {answeredCount} с отговори
            </span>
          </div>
        </div>
        <Progress value={progress} />
      </div>

      {/* Question */}
      <Card className="p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          {currentQ.question}
        </h3>

        {currentQ.multipleCorrect ? (
          <div className="space-y-3">
            {currentQ.options.map((option, index) => {
              const optionLetter = String.fromCharCode(65 + index);
              const isSelected = answers[currentQ.id]?.includes(optionLetter) || false;
              const isCorrect = currentQ.correctAnswers.includes(optionLetter);
              const showOptionFeedback = showFeedback[currentQ.id];

              return (
                <div key={index} className={`flex items-start space-x-3 p-3 rounded-lg border ${
                  showOptionFeedback
                    ? isCorrect
                      ? 'bg-green-50 border-green-200'
                      : isSelected
                        ? 'bg-red-50 border-red-200'
                        : 'bg-gray-50 border-gray-200'
                    : 'border-gray-200'
                }`}>
                  <Checkbox
                    id={`option-${index}`}
                    checked={isSelected}
                    onCheckedChange={(checked) => {
                      const currentAnswers = answers[currentQ.id] || [];

                      if (checked) {
                        handleAnswerChange(currentQ.id, [...currentAnswers, optionLetter]);
                      } else {
                        handleAnswerChange(currentQ.id, currentAnswers.filter(a => a !== optionLetter));
                      }
                    }}
                  />
                  <Label
                    htmlFor={`option-${index}`}
                    className="flex-1 text-sm font-normal cursor-pointer flex items-center justify-between"
                  >
                    <span className={`${showOptionFeedback && !isCorrect && isSelected ? 'text-red-700' : 'text-gray-700'}`}>
                      <span className="font-semibold">{optionLetter}.</span> {option}
                    </span>
                    {showOptionFeedback && (
                      <div className="flex items-center space-x-1">
                        {isCorrect ? (
                          <Check className="h-4 w-4 text-green-600" />
                        ) : isSelected ? (
                          <XCircle className="h-4 w-4 text-red-600" />
                        ) : null}
                      </div>
                    )}
                  </Label>
                </div>
              );
            })}
          </div>
        ) : (
          <RadioGroup
            value={answers[currentQ.id]?.[0] || ''}
            onValueChange={(value) => {
              handleAnswerChange(currentQ.id, [value]);
            }}
          >
            {currentQ.options.map((option, index) => {
              const optionLetter = String.fromCharCode(65 + index);
              const isSelected = answers[currentQ.id]?.[0] === optionLetter;
              const isCorrect = currentQ.correctAnswers.includes(optionLetter);
              const showOptionFeedback = showFeedback[currentQ.id];

              return (
                <div key={index} className={`flex items-center space-x-2 p-3 rounded-lg border ${
                  showOptionFeedback
                    ? isCorrect
                      ? 'bg-green-50 border-green-200'
                      : isSelected
                        ? 'bg-red-50 border-red-200'
                        : 'bg-gray-50 border-gray-200'
                    : 'border-gray-200'
                }`}>
                  <RadioGroupItem value={optionLetter} id={`option-${index}`} />
                  <Label
                    htmlFor={`option-${index}`}
                    className="flex-1 text-sm font-normal cursor-pointer flex items-center justify-between"
                  >
                    <span className={`${showOptionFeedback && !isCorrect && isSelected ? 'text-red-700' : 'text-gray-700'}`}>
                      <span className="font-semibold">{optionLetter}.</span> {option}
                    </span>
                    {showOptionFeedback && (
                      <div className="flex items-center space-x-1">
                        {isCorrect ? (
                          <Check className="h-4 w-4 text-green-600" />
                        ) : isSelected ? (
                          <XCircle className="h-4 w-4 text-red-600" />
                        ) : null}
                      </div>
                    )}
                  </Label>
                </div>
              );
            })}
          </RadioGroup>
        )}

        {currentQ.multipleCorrect && (
          <p className="text-sm text-blue-600 mt-4">
            Multiple answers may be correct. Select all that apply.
          </p>
        )}

        {/* Feedback Section */}
        {showFeedback[currentQ.id] && (
          <div className={`mt-4 p-3 rounded-lg border ${
            checkedAnswers[currentQ.id]
              ? 'bg-green-50 border-green-200'
              : 'bg-red-50 border-red-200'
          }`}>
            <div className="flex items-start space-x-2">
              {checkedAnswers[currentQ.id] ? (
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              ) : (
                <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
              )}
              <div className="flex-1">
                <p className={`text-sm font-medium ${
                  checkedAnswers[currentQ.id] ? 'text-green-800' : 'text-red-800'
                }`}>
                  {checkedAnswers[currentQ.id] ? 'Правилен отговор!' : 'Грешен отговор!'}
                </p>
                {!checkedAnswers[currentQ.id] && (
                  <p className="text-sm text-red-700 mt-1">
                    Правилни отговори: {currentQ.correctAnswers.join(', ')}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* Check Button */}
      <div className="flex justify-center">
        <Button
          onClick={checkCurrentAnswer}
          disabled={!answers[currentQ.id] || answers[currentQ.id].length === 0}
          variant="outline"
          className="flex items-center space-x-2"
        >
          <Check className="h-4 w-4" />
          <span>Провери отговор</span>
        </Button>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
        >
          Предишен
        </Button>

        <div className="text-sm text-gray-500">
          {answeredCount} от {questions.length} въпроса с отговори
        </div>

        {currentQuestion === questions.length - 1 ? (
          <Button
            onClick={handleSubmit}
            disabled={answeredCount === 0}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Предай теста
          </Button>
        ) : (
          <Button onClick={handleNext}>
            Следващ
          </Button>
        )}
      </div>
    </div>
  );
}