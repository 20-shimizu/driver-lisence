# driver-lisence
サイバーフィジカルイノベーション日本語6班。
『運転診断くん（仮称）』は高齢者ドライバーの運転技能を評価することと危険な運転がされたときに免許返納を促すことを目的としたアプリケーションです。

## ライブラリ同期
他人の変更をpullした時は実行してください。
```
rye sync
```

## マイグレーション
### マイグレーションの作成 (新しく追加したくなった時)
modelsと既存DBの差分検出して、マイグレーションを自動生成する。
```
rye run alembic revision -m "メッセージ記述"
```
### マイグレーションの実行
```
rye run alembic upgrade head
```
### ロールバックする時
```
rye run alembic downgrade <revision_id>
```