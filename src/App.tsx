import { View } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useEffect, useState } from 'react';
import { getCurrentProgression } from './logic/progression';
import { QuizContainer } from './QuizContainer';
import './App.css';

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

const WaitingAnimation = () => (
  <div>
    <div className="waiting-animation">
      <p>しばらくお待ちください...</p>
      <div className="spinner">
        <div className="double-bounce1"></div>
        <div className="double-bounce2"></div>
      </div>
    </div>

    <style>{`
      .waiting-animation {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        font-size: 1.5rem;
      }
      .spinner {
        width: 40px;
        height: 40px;
        position: relative;
        margin-top: 20px;
      }
      .double-bounce1, .double-bounce2 {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #333;
        opacity: 0.6;
        position: absolute;
        top: 0;
        left: 0;
        animation: bounce 2.0s infinite ease-in-out;
      }
      .double-bounce2 {
        animation-delay: -1.0s;
      }
      @keyframes bounce {
        0%, 100% {
          transform: scale(0.0);
        } 50% {
          transform: scale(1.0);
        }
      }
    `}</style>
  </div>
)

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
    <>
      <View className="app-container">
        <div className="content">
          {currentProgression === undefined ?
          (
            <WaitingAnimation />
          ) : currentProgression.questionID ?
          (
            <QuizContainer
              key={currentProgression.questionID}
              userID={userID}
              progression={currentProgression}
            />
          ) : currentProgression.state === 'last_result' ?
          (
            <p>
              最終結果ページ、作れていません。ご参加ありがとうございました！
            </p>
          ) :
          (
            <p>
              エラー
            </p>
          )}
        </div>
      </View>
    </>
  );
};
