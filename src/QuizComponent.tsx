import '@aws-amplify/ui-react/styles.css';
import type { Schema } from "../amplify/data/resource";
import './Quiz.css';

export const QuizComponent = (props: {
  progression: Schema["Progression"]["type"],
  question: Schema["Question"]["type"],
  options: Schema["Option"]["type"][],
  answer?: Schema["Answer"]["type"],
  selectButtonHandler: (optionID: string) => () => Promise<void>,
}) => {
  const { progression, question, options, answer, selectButtonHandler } = props;

  return (
    <div className="quiz-root">
      <div className="options-container">
        {
          options.map((option) => (
            <div
              key={option.id}
              onClick={selectButtonHandler(option.id)}
              className={`quiz-button ${answer?.optionID === option.id ? 'selected' : ''}`}
            >
              <div className="checkmark">
                {answer?.optionID === option.id ? '✔' : ''}
              </div>
              <div className="button-content">
                <span className="label-text">{option.label}</span>
                <span className="content-text">{option.content}</span>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};
