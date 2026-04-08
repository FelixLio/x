<script setup lang="ts">
import type { PromptsProps } from "@antdv-next/x";

import {
  BulbOutlined,
  CheckCircleOutlined,
  CoffeeOutlined,
  FireOutlined,
  InfoCircleOutlined,
  RocketOutlined,
  SmileOutlined,
  WarningOutlined,
} from "@antdv-next/icons";

const items: PromptsProps["items"] = [
  {
    key: "1",
    description: "Got any sparks for a new project?",
  },
  {
    key: "2",
    description: "Help me understand the background of this topic.",
  },
  {
    key: "3",
    description: "How to solve common issues? Share some tips!",
  },
  {
    key: "4",
    description: "How can I work faster and better?",
  },
  {
    key: "5",
    description: "What are some tricks for getting tasks done?",
  },
  {
    key: "6",
    description: "How to rest effectively after long hours of work?",
  },
  {
    key: "7",
    description: "What are the secrets to maintaining a positive mindset?",
  },
  {
    key: "8",
    description: "How to stay calm under immense pressure?",
  },
];
</script>

<template>
  <ax-prompts
    title="✨ Inspirational Sparks and Marvelous Tips"
    :items="items"
    wrap
  >
    <template #iconRender="{ item }">
      <BulbOutlined v-if="item.key === '1'" style="color: #ffd700" />
      <InfoCircleOutlined v-else-if="item.key === '2'" style="color: #1890ff" />
      <WarningOutlined v-else-if="item.key === '3'" style="color: #ff4d4f" />
      <RocketOutlined v-else-if="item.key === '4'" style="color: #722ed1" />
      <CheckCircleOutlined
        v-else-if="item.key === '5'"
        style="color: #52c41a"
      />
      <CoffeeOutlined v-else-if="item.key === '6'" style="color: #964b00" />
      <SmileOutlined v-else-if="item.key === '7'" style="color: #faad14" />
      <FireOutlined v-else-if="item.key === '8'" style="color: #ff4d4f" />
    </template>
  </ax-prompts>
</template>

<docs lang="zh-CN">
通过 `wrap` 属性使提示列表自动换行。
</docs>

<docs lang="en-US">
Use the `wrap` prop to allow the prompt list to wrap automatically.
</docs>
