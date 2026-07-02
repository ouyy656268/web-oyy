const prompts = {
  content: {
    title: "文案全流程提示词",
    text: `我想做一篇自媒体内容，主题是：[填写主题]。

请你作为资深自媒体策划，按流程帮我完成：
1. 先问我 8 个关键问题，不要直接写。
2. 根据我的回答生成 20 个选题。
3. 挑出最推荐的 5 个，并说明理由。
4. 为选定选题生成 30 个标题。
5. 生成 5 个不同风格的开头。
6. 先写大纲，再写正文。
7. 检查 AI 味，并改成真人表达。
8. 拆成小红书图文卡片。
9. 改成 60 秒短视频口播稿。
10. 做发布前风险检查。`
  },
  rewrite: {
    title: "去 AI 味提示词",
    text: `请检查下面这篇文案哪里有 AI 味，并逐条指出。

然后帮我改成更像真人分享的版本，要求：
1. 少用“赋能、提升效率、打造、轻松实现”这类词。
2. 多用真实场景和具体动作。
3. 句子短一点，不要端着。
4. 保留信息量，不要只改得口语。
5. 最后给我一版可直接发布的终稿。`
  },
  video: {
    title: "短视频口播提示词",
    text: `请把这篇图文文案改成 60 秒短视频口播稿。

要求：
1. 开头 3 秒抓住注意力。
2. 每 10 秒一个信息点。
3. 语言适合直接念出来。
4. 标出每段对应的画面建议。
5. 最后自然引导用户评论“模板”。
6. 不要夸大效果，不要焦虑营销。`
  }
};

const promptTitle = document.querySelector("#promptTitle");
const promptText = document.querySelector("#promptText");
const copyButton = document.querySelector("#copyPrompt");
const tabButtons = document.querySelectorAll(".tab-btn");

function setPrompt(key) {
  const prompt = prompts[key] ?? prompts.content;
  promptTitle.textContent = prompt.title;
  promptText.textContent = prompt.text;

  tabButtons.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.prompt === key);
  });

  copyButton.textContent = "复制";
}

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setPrompt(button.dataset.prompt);
  });
});

copyButton.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(promptText.textContent);
    copyButton.textContent = "已复制";
  } catch {
    copyButton.textContent = "请手动复制";
  }

  window.setTimeout(() => {
    copyButton.textContent = "复制";
  }, 1600);
});

setPrompt("content");
