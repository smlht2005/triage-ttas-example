# Pull Request 初學者完整指南

## 🌟 歡迎！

如果您是第一次接觸 Pull Request，不用擔心！這份指南將一步一步帶您了解整個流程。

---

## 📖 目錄

1. [什麼是 Pull Request？](#什麼是-pull-request)
2. [Pull Request 的工作流程](#pull-request-的工作流程)
3. [Git 基礎指令](#git-基礎指令)
4. [如何創建 Pull Request](#如何創建-pull-request)
5. [如何回應代碼審查](#如何回應代碼審查)
6. [常見問題](#常見問題)
7. [最佳實踐](#最佳實踐)

---

## 什麼是 Pull Request？

**Pull Request (PR)** 是一種協作機制，讓您可以：

- ✅ 將您的代碼更改提交給專案維護者審查
- ✅ 討論您的實作方式
- ✅ 獲得反饋和建議
- ✅ 在合併前確保代碼品質

### 簡單比喻

想像您在寫一份報告：
1. **分支 (Branch)** = 您的草稿副本
2. **提交 (Commit)** = 儲存您的進度
3. **Pull Request** = 請老師審查您的報告
4. **代碼審查** = 老師給予建議和更正
5. **合併 (Merge)** = 您的報告被接受並成為正式版本

---

## Pull Request 的工作流程

```
1. Fork/Clone 專案
   ↓
2. 創建新分支
   ↓
3. 進行更改
   ↓
4. 提交更改 (Commit)
   ↓
5. 推送到 GitHub (Push)
   ↓
6. 創建 Pull Request
   ↓
7. 代碼審查
   ↓
8. 根據反饋修改
   ↓
9. 獲得批准
   ↓
10. 合併！🎉
```

---

## Git 基礎指令

### 查看狀態

```bash
# 查看當前分支和更改狀態
git status

# 您會看到類似這樣的輸出：
# On branch copilot/code-review-second-changes
# Changes not staged for commit:
#   modified:   TriageForm.jsx
```

### 查看更改

```bash
# 查看所有更改的詳細內容
git diff

# 查看特定文件的更改
git diff TriageForm.jsx

# 查看已暫存的更改
git diff --staged
```

### 提交更改

```bash
# 步驟 1: 將更改添加到暫存區
git add .                    # 添加所有更改
git add TriageForm.jsx       # 添加特定文件

# 步驟 2: 提交更改
git commit -m "修復：改進錯誤處理"

# 步驟 3: 推送到 GitHub
git push origin copilot/code-review-second-changes
```

### 提交訊息最佳實踐

好的提交訊息：
```bash
✅ git commit -m "修復：改進生命徵象的錯誤處理"
✅ git commit -m "新增：添加檢傷級別計算的單元測試"
✅ git commit -m "重構：將計算邏輯提取到獨立函數"
✅ git commit -m "文檔：更新 README 添加安裝說明"
```

不好的提交訊息：
```bash
❌ git commit -m "修復"
❌ git commit -m "更新"
❌ git commit -m "asdf"
❌ git commit -m "修了一些東西"
```

提交訊息格式建議：
- **修復 (Fix)**: 修正錯誤
- **新增 (Add)**: 添加新功能
- **重構 (Refactor)**: 改進代碼結構
- **文檔 (Docs)**: 文檔更新
- **樣式 (Style)**: 代碼格式調整
- **測試 (Test)**: 添加或修改測試

---

## 如何創建 Pull Request

### 步驟 1: 確保所有更改已提交

```bash
# 檢查狀態
git status

# 如果有未提交的更改，先提交
git add .
git commit -m "您的提交訊息"
git push origin copilot/code-review-second-changes
```

### 步驟 2: 在 GitHub 上創建 PR

1. 打開瀏覽器，前往：
   ```
   https://github.com/smlht2005/triage-ttas-example
   ```

2. 點擊 **"Pull requests"** 標籤

3. 點擊綠色的 **"New pull request"** 按鈕

4. 選擇分支：
   - **Base** (目標分支): `main`
   - **Compare** (您的分支): `copilot/code-review-second-changes`

5. 查看更改摘要，確保正確

6. 點擊 **"Create pull request"**

### 步驟 3: 填寫 PR 資訊

#### PR 標題範例
```
改進：增強 TTAS 檢傷系統的代碼品質和錯誤處理
```

#### PR 描述範本
```markdown
## 📝 更改摘要
本 PR 改進了 TTAS 急診檢傷系統的代碼品質，包括更好的錯誤處理、代碼組織和文檔。

## 🎯 更改原因
根據代碼審查建議，需要改進以下方面：
- 改善錯誤處理機制
- 將常量和計算邏輯模組化
- 完善 package.json 配置

## 🔧 更改內容
- [x] 創建 `constants.js` 來集中管理常量
- [x] 創建 `utils/triageCalculator.js` 來處理檢傷級別計算
- [x] 改進 `parseInt()` 的錯誤處理
- [x] 更新 `package.json` 添加完整的腳本和元數據
- [x] 添加 JSDoc 註解提高代碼可讀性
- [x] 創建詳細的代碼審查文檔（中文）

## ✅ 測試
- [ ] 手動測試各種輸入組合
- [ ] 驗證錯誤處理是否正常工作
- [ ] 確認 UI 仍然正常運作

## 📸 截圖
（如果有 UI 更改，請附上截圖）

## 📚 相關問題
關閉 #issue_number（如果適用）

## 📝 審查者注意事項
這是我第一個 Pull Request，歡迎任何建議和反饋！
```

### 步驟 4: 提交 PR

點擊 **"Create pull request"** 按鈕完成創建。

---

## 如何回應代碼審查

### 當有人審查您的 PR 時

1. **閱讀所有評論**
   - 仔細理解每個建議
   - 不要感到被批評 - 這是學習的機會！

2. **分類評論**
   - ✅ 同意並會修改
   - 🤔 需要澄清或討論
   - ❌ 不同意（需要說明理由）

3. **回應評論**

   同意並會修改：
   ```
   謝謝您的建議！我會立即修正這個問題。
   ```

   需要澄清：
   ```
   感謝您的反饋。我不太確定您的意思，能否提供一個範例？
   ```

   不同意：
   ```
   我理解您的觀點，但在這個情況下，我選擇了這種方式是因為...
   您覺得呢？
   ```

4. **進行修改**

   ```bash
   # 在本地進行修改
   
   # 提交修改
   git add .
   git commit -m "根據審查意見：改進錯誤訊息"
   
   # 推送更新（會自動更新 PR）
   git push origin copilot/code-review-second-changes
   ```

5. **標記已解決**

   修改完成後，在 GitHub 上：
   - 回覆評論說明已修改
   - 點擊 "Resolve conversation" 按鈕

### 審查通過後

當 PR 被批准（Approved）：

1. 確認所有對話都已解決
2. 檢查是否有合併衝突
3. 如果一切正常，點擊 **"Merge pull request"**
4. 選擇合併方式：
   - **Create a merge commit**: 保留所有提交歷史（推薦）
   - **Squash and merge**: 合併所有提交為一個
   - **Rebase and merge**: 線性歷史
5. 點擊 **"Confirm merge"**
6. 可選：刪除分支以保持儲存庫整潔

---

## 常見問題

### Q1: 我不小心提交了錯誤的文件，怎麼辦？

```bash
# 方法 1: 撤銷最後一次提交（保留更改）
git reset --soft HEAD~1

# 方法 2: 修改最後一次提交
git add <正確的文件>
git commit --amend

# 方法 3: 從暫存區移除文件
git reset <文件名>
```

### Q2: 如何更新我的分支以包含最新的 main 分支更改？

```bash
# 方法 1: Merge（推薦給初學者）
git checkout copilot/code-review-second-changes
git pull origin main
git push origin copilot/code-review-second-changes

# 方法 2: Rebase（較進階）
git checkout copilot/code-review-second-changes
git fetch origin
git rebase origin/main
git push -f origin copilot/code-review-second-changes
```

### Q3: 我的 PR 有合併衝突，該怎麼辦？

GitHub 會提示有衝突。解決步驟：

```bash
# 1. 更新本地 main 分支
git checkout main
git pull origin main

# 2. 切換回您的分支
git checkout copilot/code-review-second-changes

# 3. 合併 main 到您的分支
git merge main

# 4. Git 會標記衝突文件，手動編輯解決衝突
# 衝突看起來像這樣：
# <<<<<<< HEAD
# 您的更改
# =======
# main 分支的更改
# >>>>>>> main

# 5. 解決衝突後
git add <解決衝突的文件>
git commit -m "解決合併衝突"
git push origin copilot/code-review-second-changes
```

### Q4: 如何查看我的 PR 包含哪些更改？

```bash
# 在本地查看
git diff main...copilot/code-review-second-changes

# 或在 GitHub 上
# 前往您的 PR 頁面，點擊 "Files changed" 標籤
```

### Q5: 提交後發現錯字，需要新建一個提交嗎？

不需要！可以修改最後一次提交：

```bash
# 修改文件
# 然後：
git add .
git commit --amend --no-edit
git push -f origin copilot/code-review-second-changes
```

---

## 最佳實踐

### 1. 保持 PR 小而專注

❌ 不好：
```
一個 PR 包含：
- 新功能
- 重構
- 錯誤修復
- 文檔更新
- 樣式調整
```

✅ 好：
```
分成多個 PR：
- PR #1: 修復登入錯誤
- PR #2: 添加檢傷級別驗證功能
- PR #3: 更新 README 文檔
```

### 2. 寫清楚的提交訊息

```bash
# 格式：<類型>: <簡短描述>

修復：修正 SpO2 < 80 時的級別判定錯誤
新增：添加檢傷級別計算的單元測試
重構：將常量提取到獨立文件
文檔：更新安裝說明
```

### 3. 經常提交

不要等到完成所有工作才提交：

```bash
✅ 每完成一個小功能就提交一次
✅ 每修復一個錯誤就提交一次
✅ 每天結束時提交進度
```

### 4. 在提交前自我審查

```bash
# 查看將要提交的更改
git diff

# 確保：
✅ 沒有調試代碼（console.log, debugger）
✅ 沒有臨時測試代碼
✅ 沒有註解掉的代碼
✅ 格式一致
```

### 5. 回應反饋要及時

- 盡快回應審查評論（24-48 小時內）
- 如果需要時間思考，先回覆說明
- 保持禮貌和專業

### 6. 測試您的更改

提交 PR 前：
```bash
✅ 在本地運行應用
✅ 測試您更改的功能
✅ 測試相關功能是否還能正常工作
✅ 檢查控制台是否有錯誤
```

---

## 🎓 延伸學習

### 推薦資源

1. **GitHub 官方指南**
   - [創建 Pull Request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request)
   - [審查 Pull Request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests)

2. **Git 教學**
   - [Pro Git 繁體中文版](https://git-scm.com/book/zh-tw/v2)
   - [Git 初學者教學](https://gitbook.tw/)

3. **互動式學習**
   - [Learn Git Branching](https://learngitbranching.js.org/)
   - [GitHub Learning Lab](https://lab.github.com/)

### 練習建議

1. **從小處開始**
   - 修正拼寫錯誤
   - 更新文檔
   - 添加註解

2. **參與開源專案**
   - 尋找標記為 "good first issue" 的問題
   - 閱讀專案的貢獻指南
   - 觀察其他人的 PR

3. **創建個人專案**
   - 創建自己的儲存庫
   - 練習分支和合併
   - 嘗試不同的 Git 工作流程

---

## 🚀 現在該做什麼？

基於代碼審查報告，這是您的行動計劃：

### 階段一：立即行動（今天）

- [ ] 閱讀 `CODE_REVIEW_ZH-TW.md`
- [ ] 查看已實施的更改
- [ ] 在本地測試應用是否正常運作
- [ ] 提交並推送任何剩餘的更改

### 階段二：本週內

- [ ] 根據審查建議添加更多改進
- [ ] 添加基本的測試
- [ ] 配置 ESLint 和 Prettier

### 階段三：持續改進

- [ ] 學習 TypeScript
- [ ] 深入了解測試
- [ ] 探索更多 React 最佳實踐

---

## 💬 需要幫助？

遇到問題時：

1. **搜尋答案**
   - Google
   - Stack Overflow
   - GitHub Discussions

2. **尋求幫助**
   - 在 PR 中留言詢問
   - 在 issue 中提問
   - 聯繫維護者

3. **提問技巧**
   - 說明您想做什麼
   - 描述您嘗試過什麼
   - 分享錯誤訊息
   - 提供相關代碼

---

## 🎉 恭喜！

您已經學會了 Pull Request 的基礎知識！記住：

- 💪 每個專業開發者都曾是初學者
- 📚 持續學習和實踐
- 🤝 不要害怕尋求幫助
- 🎯 從小處開始，逐步進步

繼續加油！您做得很好！ 🚀

---

**最後更新：** 2026-02-01  
**作者：** GitHub Copilot for Pull Requests
