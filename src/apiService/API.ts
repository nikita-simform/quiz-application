import { Question, QuestionsState } from "../types/question";
import { Difficulty } from "../utils/constants";

export const shuffleArray = <T>(array: T[]): T[] =>
{
  return [...array].sort(() => Math.random() - 0.5);

}
  export const fetchQuizQuestions = async (amount: number, difficulty: Difficulty): Promise<QuestionsState[]> => {
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
    const data = await (await fetch(endpoint)).json();
    return data.results.map((question: Question) => ({
      ...question,
      answers: shuffleArray<string>([...question.incorrect_answers, question.correct_answer])
    }))
  };