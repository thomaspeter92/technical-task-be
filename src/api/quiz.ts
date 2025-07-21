import api from "./api";

export const getQuizQuestions = (user: string) => {
  return api.get<{ questions: Array<{ id: string; text: string }> }>(
    `/questions?user=${encodeURIComponent(user)}`
  );
};

export const submitQuizAnswers = (
  user: string,
  answers: Array<{ questionId: string; answer: number }>
) => {
  return api.post<{ success: boolean }>(
    `/submissions?user=${encodeURIComponent(user)}`,
    { answers }
  );
};

export const getQuizResults = (user: string) => {
  return api.get<{
    latestSubmission: string;
  }>(`/submissions?user=${encodeURIComponent(user)}`);
};
