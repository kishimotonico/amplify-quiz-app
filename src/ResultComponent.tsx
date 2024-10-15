import '@aws-amplify/ui-react/styles.css';
import type { Schema } from "../amplify/data/resource";
import "./Result.css";

function getSelectedOption(questinoID: string, options: Schema["Option"]["type"][], answers: Schema["Answer"]["type"][]): Schema["Option"]["type"] | undefined {
  const optionIDs = options.filter((o) => o.questionID === questinoID).map((o) => o.id);
  const selectedAnswer = answers.find((a) => optionIDs.includes(a.optionID));
  return options.find((o) => o.id === selectedAnswer?.optionID);
}

export const ResultComponent = (props: {
  questions: Schema["Question"]["type"][],
  options: Schema["Option"]["type"][],
  answers: Schema["Answer"]["type"][],
}) => {
  const { questions, options, answers } = props;

  return (
    <div className="result-root">
      <h1>
        最終結果
      </h1>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>問題</th>
            <th>選択</th>
            <th>正誤</th>
          </tr>
        </thead>
        <tbody>
          {
            questions.map((question) => (
              <tr key={question.id}>
                <td>
                  {question.label}
                </td>
                <td>
                  {question.content}
                </td>
                <td>
                  {getSelectedOption(question.id, options, answers)?.label ?? "ー"}
                </td>
                <td>
                  {getSelectedOption(question.id, options, answers) ? getSelectedOption(question.id, options, answers)?.correct ? "⭕️" : "❌️" : "ー"}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
