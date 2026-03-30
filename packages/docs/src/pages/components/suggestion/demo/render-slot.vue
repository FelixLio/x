<script setup lang="ts">
import type { SuggestionItem } from "@antdv-next/x";

import { FireOutlined, SearchOutlined } from "@antdv-next/icons";
import { Sender, Suggestion } from "@antdv-next/x";
import { h, ref } from "vue";

const value = ref("");

const items: SuggestionItem[] = [
  {
    label: "Trending topics",
    value: "trending",
    icon: h(FireOutlined),
    extra: "Hot",
  },
  {
    label: "Search docs",
    value: "docs",
    icon: h(SearchOutlined),
    extra: "Cmd+K",
  },
];

const onSelect = (itemValue: string) => {
  value.value = `/${itemValue}`;
};

const onSenderChange = (
  nextValue: string,
  onTrigger: (info?: string | false) => void,
) => {
  if (nextValue === "/") {
    onTrigger();
  } else if (!nextValue) {
    onTrigger(false);
  }

  value.value = nextValue;
};
</script>

<template>
  <Suggestion :items="items" :on-select="onSelect">
    <template #default="{ onTrigger, onKeyDown }">
      <Sender
        :value="value"
        placeholder="输入 / 查看自定义建议项"
        :on-change="(nextValue: string) => onSenderChange(nextValue, onTrigger)"
        :on-key-down="onKeyDown"
      />
    </template>

    <template #iconRender="{ item }">
      <span style="display: inline-flex; color: #1677ff">
        #{{ item.value }}
      </span>
    </template>

    <template #labelRender="{ item }">
      <span>
        {{ item.label }}
        <span style="margin-inline-start: 8px; color: rgba(0, 0, 0, 0.45)">
          /{{ item.value }}
        </span>
      </span>
    </template>

    <template #extraRender="{ item }">
      <span style="color: #52c41a; font-size: 12px">
        {{ item.extra }}
      </span>
    </template>
  </Suggestion>
</template>

<docs lang="zh-CN">
通过 `labelRender`、`iconRender`、`extraRender` 插槽自定义建议项的不同区域。
</docs>

<docs lang="en-US">
Customize label, icon, and extra areas of each suggestion item with dedicated slots.
</docs>
