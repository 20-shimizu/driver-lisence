// ユーザー登録画面
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function UserRegistrationForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailConfirm, setEmailConfirm] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 入力チェックやバリデーションを行い、問題なければサーバーに送信する
    console.log({ name, email, emailConfirm, birthDate, password });
    alert("登録ボタンがクリックされました！");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <Card className="max-w-md w-full shadow-xl rounded-2xl">
        <CardContent className="p-6">
          <h1 className="text-2xl font-bold mb-4">ユーザー登録</h1>
          <form onSubmit={handleSubmit} className="grid gap-4">
            {/* 名前 */}
            <div>
              <label htmlFor="name" className="block mb-1 font-medium">名前</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* メールアドレス */}
            <div>
              <label htmlFor="email" className="block mb-1 font-medium">メールアドレス</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* メールアドレス（確認） */}
            <div>
              <label htmlFor="emailConfirm" className="block mb-1 font-medium">メールアドレス（確認）</label>
              <input
                id="emailConfirm"
                type="email"
                value={emailConfirm}
                onChange={(e) => setEmailConfirm(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* 生年月日 */}
            <div>
              <label htmlFor="birthDate" className="block mb-1 font-medium">生年月日</label>
              <input
                id="birthDate"
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* パスワード */}
            <div>
              <label htmlFor="password" className="block mb-1 font-medium">パスワード</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <Button type="submit" className="w-full mt-4">
              登録
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
