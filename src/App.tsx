import { Suspense, useState } from 'react';
import { View } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

export const App = () => {
  const storedUserId = localStorage.getItem("userId");
  const [userId, setUserId] = useState<string | null>(storedUserId);

  if (storedUserId === null) {
    client.models.User.create({}).then((userId) => {
      // awaitが使えないのでとりあえず
      if (userId.data === null) {
        throw new Error("ユーザー登録に失敗しました");
      }
      localStorage.setItem("userId", userId.data.id);
      setUserId(userId.data.id);
    });
  }

  return (
    <Suspense fallback={<></>}>
      <View>
        <p>
          こんにちは {userId} さん
        </p>
      </View>
    </Suspense>
  );
};
