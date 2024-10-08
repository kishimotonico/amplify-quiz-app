import '@aws-amplify/ui-react/styles.css';
import type { Schema } from "../amplify/data/resource";
import { Button } from '@aws-amplify/ui-react';

export const QuizComponent = (props: {
  progression: Schema["Progression"]["type"],
  question: Schema["Question"]["type"],
  options: Schema["Option"]["type"][],
  answer?: Schema["Answer"]["type"],
  selectButtonHandler: (optionID: string) => () => Promise<void>,
}) => {
  const { progression, question, options, answer, selectButtonHandler } = props;

  return (
    <div>
      <p>
        Q. {question?.content}
      </p>
      {
        options.map((option) => (
          <Button key={option.id} onClick={selectButtonHandler(option.id)}>
            {option.label}. {option.content}
          </Button>
        ))
      }
    </div>
  );
};
