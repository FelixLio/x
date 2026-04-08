<script setup lang="ts">
import { MoreOutlined } from "@antdv-next/icons";
</script>

<template>
  <ax-welcome>
    <template #icon>
      <a-avatar
        shape="square"
        :size="48"
        src="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*s5sNRo5LjfQAAAAAAAAAAAAADgCCAQ/fmt.webp"
      />
    </template>

    <template #title>
      <a-space direction="vertical" :size="0">
        <span>你好，我是 Antdv Next X</span>
        <a-typography-text type="secondary">
          支持通过插槽自定义标题区域
        </a-typography-text>
      </a-space>
    </template>

    <template #description>
      <a-typography-paragraph :style="{ marginBottom: 0 }">
        你可以把更复杂的内容放进插槽里，比如强调文案、富文本或者自定义布局。
      </a-typography-paragraph>
    </template>

    <template #extra>
      <a-button type="text">
        <MoreOutlined />
      </a-button>
    </template>
  </ax-welcome>
</template>

<docs lang="zh-CN">
支持通过 `icon`、`title`、`description`、`extra` 同名插槽自定义内容。
</docs>

<docs lang="en-US">
Supports custom content via `icon`, `title`, `description`, and `extra` slots.
</docs>
