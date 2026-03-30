<script setup lang="ts">
import type { PromptsProps } from "@antdv-next/x";

import { BulbOutlined } from "@antdv-next/icons";
import { Prompts } from "@antdv-next/x";
import { Tag } from "antdv-next";

const items: PromptsProps["items"] = [
  {
    key: "1",
    label: "Generate release notes",
    description: "Summarize the latest shipped features",
  },
  {
    key: "2",
    label: "Draft a reply",
    description: "Write a concise customer response",
  },
];
</script>

<template>
  <Prompts title="Quick actions" :items="items">
    <template #title="{ originNode }">
      <span>{{ originNode }} by slots</span>
    </template>

    <template #iconRender="{ index }">
      <Tag color="processing">#{{ index + 1 }}</Tag>
    </template>

    <template #labelRender="{ item }">
      <span>
        <BulbOutlined />
        {{ item.label }}
      </span>
    </template>

    <template #description="{ item }">
      <span style="color: rgba(0, 0, 0, 0.45)">{{ item.description }}</span>
    </template>
  </Prompts>
</template>

<docs lang="zh-CN">
通过插槽自定义 Prompts 标题以及每个提示项的图标、标题和描述。
</docs>

<docs lang="en-US">
Customize the Prompts title and each prompt item's icon, label, and description with slots.
</docs>
