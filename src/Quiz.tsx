import '@aws-amplify/ui-react/styles.css';
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useCallback, useEffect, useState } from 'react';
import { Button } from '@aws-amplify/ui-react';

const client = generateClient<Schema>();



export const Quiz = (props: {
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
      next: (data) => setOptions([...data.items]),
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

  const onClick = useCallback((optionID: string) => async () => {
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
    <div>
      <p>
        Q. {question?.content}
      </p>
      <ul>
        {options.map((option) => (
          <li key={option.id}>({option.id}) {option.label}. {option.content} {
            answer?.optionID === option.id ? (
              <span>✅</span>
            ) : (
              <Button onClick={onClick(option.id)} size="small">選択</Button>
            )
          }</li>
        ))}
      </ul>
    </div>
  );
};
