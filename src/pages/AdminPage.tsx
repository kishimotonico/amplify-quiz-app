import { useEffect, useState } from 'react';
import { View, Heading, Button, Flex, Text, Card } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import type { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { getCurrentProgression, isQuestionCloseup, isQuestionFinished, isQuestionInProgress, isQuestionNotStarted } from '../logic/progression';
import { sortOptionsByLabel } from '../logic/option';
import { sortQuestionsByLabel } from '../logic/question';

const client = generateClient<Schema>();

type Question = Schema["Question"]["type"];
type Option = Schema["Option"]["type"];
type Progression = Schema["Progression"]["type"];
type Answer = Schema["Answer"]["type"];

const QuestionCard = (props: {
  question: Question,
  progressions: Progression[],
  answers: Answer[],
}) => {
  const { question, progressions, answers } = props;
  const [options, setOptions] = useState<Array<Option>>([]);

  useEffect(() => {
    const sub = client.models.Option.observeQuery({
      filter: { questionID: { eq: question.id } }
    }).subscribe({
      next: (data) => setOptions(sortOptionsByLabel([...data.items])),
    });

    return () => sub.unsubscribe();
  }, []);

  const currentProgression = getCurrentProgression(progressions);
  const inProgress = isQuestionInProgress(progressions, question.id);
  const closeup = isQuestionCloseup(progressions, question.id);
  const finished = isQuestionFinished(progressions, question.id);
  const notStarted = isQuestionNotStarted(progressions, question.id);
  const canStart = currentProgression === undefined || currentProgression?.state === "finished";

  const onStartButtonClick = async () => {
    await client.models.Progression.create({
      state: "in_progress",
      questionID: question.id,
    });
  };
  
  const onCloseupButtonClick = async () => {
    await client.models.Progression.create({
      state: "closeup",
      questionID: question.id,
    });
  };

  const onFinishButtonClick = async () => {
    await client.models.Progression.create({
      state: "finished",
      questionID: question.id,
    });
  };

  const onClearAnswersButtonClick = async () => {
    answers.filter((a) => options.map((o) => o.id).includes(a.optionID)).forEach(async (ans) => {
      await client.models.Answer.delete({ id: ans.id });
    });
  };

  return (
    <Card>
      <Flex gap="0.5rem" justifyContent="space-between">
        <Flex gap="0.5rem" direction="column" width="100%" paddingRight="20px">
          <Flex justifyContent="space-between">
            <Text style={{ lineHeight: 2.4 }}>
              {question.label ?? ""} {question.content}
            </Text>
            <Button onClick={onClearAnswersButtonClick} size="small">
              全回答削除
            </Button>
          </Flex>
          <Flex direction="column" gap="0.5rem" marginLeft="1rem">
            {options.map((option) => (
              <Flex justifyContent="space-between">
                <div key={option.id}>
                  {option.label}. {option.title ?? option.content ?? ""}
                </div>
                <div>
                  {answers.filter((a) => a.optionID === option.id).length}人
                </div>
              </Flex>
            ))}
          </Flex>
        </Flex>
        <Flex direction="column" width="200px" justifyContent="flex-end">
          {
            canStart && notStarted ?
            (
              <Button onClick={onStartButtonClick}>開始する</Button>
            ) :
            inProgress ? 
            (
              <Button onClick={onCloseupButtonClick} variation="primary">締め切る</Button>
            ) : 
            closeup ?
            (
              <Button onClick={onFinishButtonClick} variation="primary">答え合わせ</Button>
            ) :
            (
              <Button disabled>{finished ? "終了済" : "ー" }</Button>
            )
          }
        </Flex>
      </Flex>
    </Card>
  );
}


export const AdminPage = () => {
  const [questions, setQuestions] = useState<Array<Question>>([]);
  const [progressions, setProgressions] = useState<Array<Progression>>([]);
  const [users, setUsers] = useState<Array<Schema["User"]["type"]>>([]);
  const [answers, setAnswers] = useState<Array<Schema["Answer"]["type"]>>([]);

  useEffect(() => {
    const sub = client.models.Question.observeQuery().subscribe({
      next: (data) => setQuestions(sortQuestionsByLabel([...data.items])),
    });

    return () => sub.unsubscribe();
  }, []);

  useEffect(() => {
    const sub = client.models.Progression.observeQuery().subscribe({
      next: (data) => setProgressions([...data.items]),
    });

    return () => sub.unsubscribe();
  }, []);

  useEffect(() => {
    const sub = client.models.User.observeQuery().subscribe({
      next: (data) => setUsers([...data.items]),
    });

    return () => sub.unsubscribe();
  }, []);

  useEffect(() => {
    const sub = client.models.Answer.observeQuery().subscribe({
      next: (data) => setAnswers([...data.items]),
    });

    return () => sub.unsubscribe();
  }, []);

  const progressionReset = async () => {
    const progressions = await client.models.Progression.list();
    progressions.data.forEach(async (progression) => {
      await client.models.Progression.delete({ id: progression.id });
    });
  };

  const progressionLastResult = async () => {
    await client.models.Progression.create({ state: "last_result" });
  };

  const userReset = async () => {
    const users = await client.models.User.list();
    users.data.forEach(async (user) => {
      await client.models.User.delete({ id: user.id });
    });
  };

  const answerReset = (userID: string) => async () => {
    const answers = await client.models.Answer.list();
    answers.data.forEach(async (answer) => {
      if (answer.userID === userID) {
        await client.models.Answer.delete({ id: answer.id });
      }
    });
  };

  return (
    <View padding="2rem">
      <div>
        <Flex>
          <Heading level={4}>クイズ進行状況</Heading>
          <Button onClick={progressionReset} size="small">リセット</Button>
          <Button onClick={progressionLastResult} size="small">最終結果</Button>
        </Flex>
        <Flex direction="column" gap="0.5rem">
          {questions.map((question) => (
            <QuestionCard
              key={question.id}
              question={question}
              progressions={progressions}
              answers={answers}
            />
          ))}
        </Flex>
      </div>
      <div>
        <Flex marginBottom="0.8rem">
          <Heading level={4}>ユーザー</Heading>
          <Button onClick={userReset} size="small">リセット</Button>
        </Flex>
        <Flex direction="column" gap="0.5rem">
          {users.map((user) => (
            <Flex>
              <span style={{ lineHeight: 2.4 }}>
                {user.id}
              </span>
              <Button onClick={answerReset(user.id)} size="small">
                回答削除（{answers.filter((a) => a.userID === user.id).length}件）
              </Button>
            </Flex>
          ))}
        </Flex>
      </div>
    </View>
  );
};
