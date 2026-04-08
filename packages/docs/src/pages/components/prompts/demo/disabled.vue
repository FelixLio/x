<script setup lang="ts">
import type { PromptsProps } from "@antdv-next/x";

import { CheckCircleOutlined, CoffeeOutlined } from "@antdv-next/icons";

const items: PromptsProps["items"] = [
  {
    key: "1",
    label: "Task Completion Secrets",
    description: "What are some tricks for getting tasks done?",
    disabled: true,
  },
  {
    key: "2",
    label: "Time for a Coffee Break",
    description: "How to rest effectively after long hours of work?",
  },
];
</script>

<template>
  <ax-prompts title="☕️ It's time to relax!" :items="items">
    <template #iconRender="{ item }">
      <CheckCircleOutlined v-if="item.key === '1'" style="color: #52c41a" />
      <CoffeeOutlined v-else-if="item.key === '2'" style="color: #964b00" />
    </template>
  </ax-prompts>
</template>

<docs lang="zh-CN">
禁用状态，通过 `disabled` 属性禁用某个提示项的点击事件。
</docs>

<docs lang="en-US">
Disabled state. Use the `disabled` prop to disable click events on a prompt item.
</docs>
