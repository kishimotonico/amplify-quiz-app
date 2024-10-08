import '@aws-amplify/ui-react/styles.css';
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useEffect, useState } from 'react';

const client = generateClient<Schema>();



export const Quiz = (props: {
  progression: Schema["Progression"]["type"],
}) => {
  const { progression } = props;
  const [question, setQuestion] = useState<Schema["Question"]["type"]>();
  const [options, setOptions] = useState<Array<Schema["Option"]["type"]>>([]);
  const [answer, setAnswer] = useState<Schema["Option"]["type"]>();

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

  return (
    <div>
      <p>
        Q. {question?.content}
      </p>
      <ul>
        {options.map((option) => (
          <li key={option.id}>{option.label}. {option.content}</li>
        ))}
      </ul>
    </div>
  );
};
