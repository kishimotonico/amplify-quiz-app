import { useEffect, useState } from 'react';
import { View, Heading, Button, Flex, Text, Card } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import type { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { getCurrentProgression, isQuestionFinished, isQuestionInProgress, isQuestionNotStarted } from '../logic/progression';

const client = generateClient<Schema>();

type Question = Schema["Question"]["type"];
type Option = Schema["Option"]["type"];
type Progression = Schema["Progression"]["type"];

const QuestionCard = (props: { question: Question, progressions: Progression[] }) => {
  const { question, progressions } = props;
  const [options, setOptions] = useState<Array<Option>>([]);

  useEffect(() => {
    const sub = client.models.Option.observeQuery({
      filter: { questionID: { eq: question.id } }
    }).subscribe({
      next: (data) => setOptions([...data.items]),
    });

    return () => sub.unsubscribe();
  }, []);

  const currentProgression = getCurrentProgression(progressions);
  const inProgress = isQuestionInProgress(progressions, question.id);
  const finished = isQuestionFinished(progressions, question.id);
  const notStarted = isQuestionNotStarted(progressions, question.id);
  const canStart = currentProgression === undefined || currentProgression?.state === "finished";

  const onStartButtonClick = async () => {
    const progression = await client.models.Progression.create({
      state: "in_progress",
      questionID: question.id,
    });
    if (progression === null) {
      alert("進行状況の作成に失敗しました。");
    }
  };

  const onFinishButtonClick = async () => {
    const progression = await client.models.Progression.create({
      state: "finished",
      questionID: question.id,
    });
    if (progression === null) {
      alert("進行状況の作成に失敗しました。");
    }
  };

  return (
    <Card>
      <Flex gap="0.5rem" justifyContent="space-between">
        <Flex gap="0.5rem" direction="column">
          <Text>{question.content}</Text>
          <Flex direction="column" gap="0.5rem" marginLeft="1rem">
            {options.map((option) => (
              <div key={option.id}>{option.label}. {option.content ?? ""} </div>
            ))}
          </Flex>
          <Flex>
            状態: {finished ? "終了" : inProgress ? "進行中" : "未開始"}
          </Flex>
        </Flex>
        <div>
          {
            canStart && notStarted && <Button onClick={onStartButtonClick}>開始する</Button>
          }
          {
            inProgress && <Button onClick={onFinishButtonClick} variation="primary">終了する</Button>
          }
        </div>
      </Flex>
    </Card>
  );
}


export const AdminPage = () => {
  const [questions, setQuestions] = useState<Array<Question>>([]);
  const [progressions, setProgressions] = useState<Array<Progression>>([]);

  useEffect(() => {
    const sub = client.models.Question.observeQuery().subscribe({
      next: (data) => setQuestions([...data.items]),
    });

    return () => sub.unsubscribe();
  }, []);

  useEffect(() => {
    const sub = client.models.Progression.observeQuery().subscribe({
      next: (data) => setProgressions([...data.items]),
    });

    return () => sub.unsubscribe();
  }, []);

  const progressionReset = async () => {
    const progressions = await client.models.Progression.list();
    progressions.data.forEach(async (progression) => {
      await client.models.Progression.delete({ id: progression.id });
    });
  };

  return (
    <View padding="2rem">
      <div>
        <Flex>
          <Heading level={4}>クイズ進行状況</Heading>
          <Button onClick={progressionReset} size="small">リセット</Button>
        </Flex>
        <Flex direction="column" gap="0.5rem">
          {questions.map((question) => (
            <QuestionCard key={question.id} question={question} progressions={progressions} />
          ))}
        </Flex>
      </div>
    </View>
  );
};
