import { useMutation, useQuery } from "@tanstack/react-query";
import { getQuizQuestions, submitQuizAnswers } from "../api/quiz";
import { useSearchParams } from "react-router";
import RadioButtons from "./RadioButtons";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import Button from "./Button";

const Quiz = () => {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["quiz"],
    queryFn: () => getQuizQuestions(searchParams.get("user") || ""),
    refetchOnWindowFocus: false,
  });

  const { mutate } = useMutation({
    mutationFn: (data: { questionId: string; answer: number }[]) =>
      submitQuizAnswers(searchParams.get("user") || "", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quiz-result"] });
    },
    onError: (error) => {
      console.error("Error submitting quiz answers:", error);
    },
  });
  const { setValue, watch, handleSubmit } = useForm<{
    [key: string]: number;
  }>();
  const [currentIndex, setCurrentIndex] = useState(0);

  const questions = data?.questions || [];
  const currentQuestion = questions[currentIndex];
  const selectedValue = watch(currentQuestion?.id) ?? -1;
  const hasAnswered = !!watch(currentQuestion?.id);

  const handleClick = (val: number) => {
    setValue(currentQuestion.id, val);
    if (currentIndex < questions.length - 1) {
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
      }, 200);
    }
  };

  const percentComplete =
    currentIndex === 0
      ? 0
      : Math.round(((currentIndex + 1) / questions.length) * 100);

  const onSubmit: SubmitHandler<{ [key: string]: number }> = (data) => {
    const answers = Object.entries(data).map(([questionId, answer]) => ({
      questionId,
      answer,
    }));

    if (answers.length < 24) return;
    mutate(answers);
  };

  if (isLoading || !data) {
    return <div>Loading</div>;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="border border-slate-200 rounded-lg"
    >
      <div className="p-5 border-b border-slate-200 flex gap-5 ">
        <p>Your progress - {percentComplete}%</p>
        <div className="w-50 h-6 rounded-full bg-slate-200 relative">
          <div
            className="absolute top-0 left-0 h-full bg-blue-300 rounded-full"
            style={{
              width: `${percentComplete}%`,
            }}
          ></div>
        </div>
      </div>
      <div className="p-3 sm:p-10 flex flex-col sm:flex-row gap-3 w-4xl max-w-full mx-auto">
        <p className="text-orange-500">
          Q{currentIndex + 1}/{questions.length}
        </p>
        <div className="space-y-10 w-full">
          <div>
            <p className="text-sm mb-1">In a job, I would be motivated by</p>
            <p className="font-medium text-lg">{currentQuestion.text}</p>
          </div>
          <RadioButtons
            name={currentQuestion.id}
            value={selectedValue}
            onChange={handleClick}
          />
          <div className="flex justify-between">
            <button
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex(currentIndex - 1)}
              className="underline font-medium text-slate-500 disabled:text-slate-200 cursor-pointer disabled:cursor-not-allowed"
            >
              Back
            </button>
            {currentIndex !== questions.length - 1 && (
              <button
                onClick={() => setCurrentIndex(currentIndex + 1)}
                className="underline font-medium text-orange-500"
              >
                Next
              </button>
            )}
          </div>
          {currentIndex === questions.length - 1 && hasAnswered && (
            <Button disabled={!hasAnswered}>Finish</Button>
          )}

          <p className="mt-20 text-sm text-center">
            To review your previous answers, scroll back before selecting
            "finish".
          </p>
        </div>
      </div>
    </form>
  );
};

export default Quiz;
