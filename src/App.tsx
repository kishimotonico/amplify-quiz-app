import { View } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

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
  const userId = localStorage.getItem("userId");
  if (userId === null) {
    throw registerUser();
  }

  return (
    <View>
      <p>
        こんにちは {userId} さん
      </p>
    </View>
  );
};
