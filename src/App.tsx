import { View } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useEffect, useState } from 'react';
import { getCurrentProgression } from './logic/progression';
import { Quiz } from './Quiz';

const client = generateClient<Schema>();

async function registerUser() {
  const userId = await client.models.User.create({});
  if (userId.data === null) {
    console.error("ユーザー登録に失敗しました");
    return;
  }
  localStorage.setItem("userId", userId.data.id);
  // デバッグのため、わざと遅らせる
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
}

export const App = () => {
  const userID = localStorage.getItem("userId");
  if (userID === null) {
    throw registerUser();
  }

  const [progressions, setProgressions] = useState<Array<Schema["Progression"]["type"]>>([]);

  useEffect(() => {
    const sub = client.models.Progression.observeQuery().subscribe({
      next: (data) => setProgressions([...data.items]),
    });
    
    return () => { sub.unsubscribe(); };
  }, []);

  const currentProgression = getCurrentProgression(progressions);

  return (
    <View>
      <p>
        こんにちは {userID} さん
      </p>
      {
        currentProgression === undefined ?
        (
          <p>開始前</p>
        ) :
        currentProgression.questionID ?
        (
          <Quiz userID={userID} progression={currentProgression} key={currentProgression.questionID} />
        ) :
        (
          <p>エラー</p>
        )
      }
    </View>
  );
};
