import '@aws-amplify/ui-react/styles.css';
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useEffect, useState } from 'react';
import { sortOptionsByLabel } from './logic/option';
import { sortQuestionsByLabel } from './logic/question';
import { ResultComponent } from './ResultComponent';

const client = generateClient<Schema>();

export const ResultContainer = (props: {
  userID: string,
  progression: Schema["Progression"]["type"],
}) => {
  const { userID, progression } = props;
  const [questions, setQuestions] = useState<Array<Schema["Question"]["type"]>>([]);
  const [options, setOptions] = useState<Array<Schema["Option"]["type"]>>([]);
  const [answers, setAnswers] = useState<Array<Schema["Answer"]["type"]>>([]);


  useEffect(() => {
    const sub = client.models.Question.observeQuery().subscribe({
      next: (data) => setQuestions(sortQuestionsByLabel([...data.items])),
    });

    return () => sub.unsubscribe();
  }, []);

  useEffect(() => {
    const sub = client.models.Option.observeQuery({
      filter: { questionID: { ne: "dummy" } }
    }).subscribe({
      next: (data) => setOptions(sortOptionsByLabel([...data.items])),
      error: (error) => console.error(error),
    });

    return () => sub.unsubscribe();
  }, []);

  useEffect(() => {
    const sub = client.models.Answer.observeQuery({
      filter: { userID: { eq: userID } }
    }).subscribe({
      next: (data) => {
        setAnswers([...data.items]);
      },
    });

    return () => sub.unsubscribe();
  }, []);

  // console.log("<Result>", {questions, options, answers});
  return (
    progression?.state === "last_result" ?
    (
      <ResultComponent
        questions={questions}
        options={options}
        answers={answers}
      />
    ) : (
      <p>
        エラー
      </p>
    )
  );
};
