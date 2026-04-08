<docs lang="zh-CN">
基础用法。
</docs>

<docs lang="en-US">
Basic usage.
</docs>

<script setup lang="ts">
import type { ActionsProps } from "@antdv-next/x";

import { EditOutlined, RedoOutlined } from "@antdv-next/icons";
import { message } from "antdv-next";

const items: ActionsProps["items"] = [
  {
    key: "retry",
    label: "Retry",
  },
  {
    key: "edit",
    label: "Edit",
  },
];

const onClick: ActionsProps["onClick"] = ({ keyPath }) => {
  message.success(`you clicked ${keyPath.join(",")}`);
};
</script>

<template>
  <ax-actions :items="items" @click="onClick">
    <template #iconRender="{ item }">
      <RedoOutlined v-if="item.key === 'retry'" />
      <EditOutlined v-else-if="item.key === 'edit'" />
    </template>
  </ax-actions>
</template>
