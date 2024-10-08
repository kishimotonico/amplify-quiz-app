import '@aws-amplify/ui-react/styles.css';
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useCallback, useEffect, useState } from 'react';
import { QuizComponent } from './QuizComponent';
import { sortByLabel } from './logic/option';

const client = generateClient<Schema>();

export const QuizContainer = (props: {
  userID: string,
  progression: Schema["Progression"]["type"],
}) => {
  const { userID, progression } = props;
  const [question, setQuestion] = useState<Schema["Question"]["type"]>();
  const [options, setOptions] = useState<Array<Schema["Option"]["type"]>>([]);
  const [answer, setAnswer] = useState<Schema["Answer"]["type"]>();

  useEffect(() => {
    if (! progression.questionID) {
      return;
    }

    const sub = client.models.Question.observeQuery({
      filter: { id: { eq: progression.questionID } }
    }).subscribe({
      next: (data) => setQuestion(data.items[0]),
    });

    return () => sub.unsubscribe();
  }, []);

  useEffect(() => {
    if (! progression.questionID) {
      return;
    }

    const sub = client.models.Option.observeQuery({
      filter: { questionID: { eq: progression.questionID } }
    }).subscribe({
      next: (data) => setOptions(sortByLabel([...data.items])),
    });

    return () => sub.unsubscribe();
  }, []);

  useEffect(() => {
    if (! progression.questionID) {
      return;
    }

    const sub = client.models.Answer.observeQuery({
      filter: { userID: { eq: userID } }
    }).subscribe({
      next: (data) => {
        const optionIDs = options.map((o) => o.id);
        const ans = data.items.find((a) => optionIDs.includes(a.optionID));
        console.log("<Quiz> answer sub", { answers: data.items, optionIDs, ans});
        setAnswer(ans);
      },
    });

    return () => sub.unsubscribe();
  }, [options]);

  const selectButtonHandler = useCallback((optionID: string) => async () => {
    if (answer) {
      await client.models.Answer.update({
        id: answer.id,
        optionID,
      });
    } else {
      await client.models.Answer.create({
        optionID,
        userID,
      });
    }
  }, [answer]);

  return (
    question && options.length > 0 ?
    (
      <QuizComponent
        progression={progression}
        question={question}
        options={options}
        answer={answer}
        selectButtonHandler={selectButtonHandler}
      />
    ) : (
      <p>
        ふぇぇ…
      </p>
    )
  );
};
