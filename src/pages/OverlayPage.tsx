import '@aws-amplify/ui-react/styles.css';
import type { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useEffect, useState } from 'react';
import { getCurrentProgression } from '../logic/progression';
import { sortOptionsByLabel } from '../logic/option';

const client = generateClient<Schema>();

const Status = (props: { progression: Schema["Progression"]["type"], options: Schema["Option"]["type"][], answers: Schema["Answer"]["type"][] }) => {
  const { progression, options, answers } = props;
  console.log("<Status>", { options, answers });

  return (
    options.length === 2 || options.length === 3 || options.length === 4 ? (
      <div style={{
        display: "flex",
        flexDirection: options.length === 4 ? "column" : "row",
        justifyContent: "space-around",
        alignItems: "center",
        height: "100vh",
        fontSize: "4rem",
        textAlign: "right",
      }}>
        {
          options.map((option) => (
            <div key={option.id} style={{
              flexGrow: 1,
              padding: "1rem 3rem",
              display: "flex",
              justifyContent: "right",
              alignItems: "end",
              height: "100%",
              width: "100%",
            }}>
              <div style={{
                backgroundColor: progression?.state === "finished" && option.correct ? "rgba(0,255,0,0.5)" : "rgba(255,255,255,0.5)",
                padding: "0.5rem 2rem",
              }}>
                {answers.filter((a) => a.optionID === option.id).length}<span style={{ fontSize: "2rem", padding: "1rem" }}>人</span>
              </div>
            </div>
          ))
        }
      </div>
    ) : null
  );
}

export const OverlayPage = () => {
  const [progressions, setProgressions] = useState<Array<Schema["Progression"]["type"]>>([]);
  const [question, setQuestion] = useState<Schema["Question"]["type"]>();
  const [options, setOptions] = useState<Array<Schema["Option"]["type"]>>([]);
  const [answers, setAnswers] = useState<Array<Schema["Answer"]["type"]>>();
  const progression = getCurrentProgression(progressions);

  useEffect(() => {
    const sub = client.models.Progression.observeQuery().subscribe({
      next: (data) => setProgressions([...data.items]),
    });
    
    return () => { sub.unsubscribe(); };
  }, []);

  useEffect(() => {
    if (! progression?.questionID) {
      return;
    }

    const sub = client.models.Question.observeQuery({
      filter: { id: { eq: progression?.questionID } }
    }).subscribe({
      next: (data) => setQuestion(data.items[0]),
    });

    return () => sub.unsubscribe();
  }, [progression?.questionID]);

  useEffect(() => {
    if (! progression?.questionID) {
      return;
    }

    const sub = client.models.Option.observeQuery({
      filter: { questionID: { eq: progression?.questionID } }
    }).subscribe({
      next: (data) => setOptions(sortOptionsByLabel([...data.items])),
    });

    return () => sub.unsubscribe();
  }, [progression?.questionID]);

  useEffect(() => {
    if (! progression?.questionID) {
      return;
    }

    const sub = client.models.Answer.observeQuery().subscribe({
      next: (data) => {
        const optionIDs = options.map((o) => o.id);
        setAnswers([...data.items.filter((a) => optionIDs.includes(a.optionID))]);
      },
    });

    return () => sub.unsubscribe();
  }, [options]);


  return progression?.questionID && question && options && answers ? (
    <Status progression={progression} options={options} answers={answers} />
  ) : (
    null
  );
};
