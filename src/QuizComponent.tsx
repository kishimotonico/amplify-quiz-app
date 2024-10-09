import '@aws-amplify/ui-react/styles.css';
import type { Schema } from "../amplify/data/resource";
import './Quiz.css';

export const QuizComponent = (props: {
  progression: Schema["Progression"]["type"],
  question: Schema["Question"]["type"],
  options: Schema["Option"]["type"][],
  selectedOption?: Schema["Option"]["type"],
  selectButtonHandler: (optionID: string) => () => Promise<void>,
}) => {
  const { progression, question, options, selectedOption, selectButtonHandler } = props;

  return (
    <div className="quiz-root">
      {
        progression.state === "finished" ? (
          <div className="result-overlay">
            <div className="state-display">
              <div>
                結果は…
              </div>
            </div>
            <div className="result-content">
              {
                selectedOption?.correct ? (
                  <div className="result-display correct">
                    <div className="result-icon">⭕️</div>
                    正解です！
                  </div>
                ) : (
                  <div className="result-display wrong">
                    <div className="result-icon">❌️</div>
                    不正解です
                  </div>
                )
              }
              <div>
                あなたの回答: {selectedOption?.label ?? "未選択"}
                <br />
                正解: {options.find((o) => o.correct)?.label}
              </div>
            </div>
          </div>
        ) : null
      }
      <div className="question-root">
        <div className="question-header">
          <span className="question-label">{question.label}</span>
          <span className="question-content">{question.content}</span>
        </div>
        <div className="options-container">
          {
            options.map((option) => (
              <div
                key={option.id}
                onClick={selectButtonHandler(option.id)}
                className={`quiz-button ${selectedOption?.id === option.id ? 'selected' : ''}`}
              >
                <div className="checkmark">
                  {selectedOption?.id === option.id ? '✔' : ''}
                </div>
                <div className="button-content">
                  <span className="label-text">{option.label}</span>
                  <span className="title-text">{option.title}</span>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};
