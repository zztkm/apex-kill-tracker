# Apex Kill tracker

指定のApexレジェンドのキル数を取得してPixelaにPOSTするアプリケーションです。

**注意**
プロパティ設定を使うので GAS Editor は古いやつを使います。


## Require

- [clasp](https://github.com/google/clasp#install)
- tracker.gg のAPI Key
    - https://tracker.gg/developers/docs/getting-started
- [pixela](https://pixe.la/ja) の グラフを作成
    - 作成例
    ```json
    {
        "id": "octanekills",
        "name": "octane total kills",
        "unit": "kill",
        "type":"float",
        "color": "shibafu",
        "timezone": "Asia/Tokyo"
    }
    ```


## GASのプロパティ設定

以下をプロジェクトのプロパティに設定してください。

- TRN_API_TOKEN
    - tracker.gg https://tracker.gg/developers/docs/getting-started
- LEGEND
    - 例: Octane
- GRAPH_ID
    - pixela のグラフID
- PIXELA_USER_TOKEN
    - pixela のユーザートークン

## デプロイ

`clasp login`は済ませた前提

1. `git clone https://github.com/zztkm/apex-kill-tracker.git`
1. `clasp create --type standalone`
1. `clasp push`
1. 適当にGASのトリガー設定