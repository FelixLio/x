<script setup lang="ts">
import type { PromptsProps } from "@antdv-next/x";

import { CoffeeOutlined, FireOutlined, SmileOutlined } from "@antdv-next/icons";

const items: PromptsProps["items"] = [
  {
    key: "1",
    description: "How to rest effectively after long hours of work?",
  },
  {
    key: "2",
    description: "What are the secrets to maintaining a positive mindset?",
  },
  {
    key: "3",
    description: "How to stay calm under immense pressure?",
  },
];
</script>

<template>
  <ax-prompts title="🤔 You might also want to ask:" :items="items" vertical>
    <template #iconRender="{ item }">
      <CoffeeOutlined v-if="item.key === '1'" style="color: #964b00" />
      <SmileOutlined v-else-if="item.key === '2'" style="color: #faad14" />
      <FireOutlined v-else-if="item.key === '3'" style="color: #ff4d4f" />
    </template>
  </ax-prompts>
</template>

<docs lang="zh-CN">
通过 `vertical` 属性将提示列表设置为纵向排列。
</docs>

<docs lang="en-US">
Use the `vertical` prop to arrange the prompt list vertically.
</docs>
