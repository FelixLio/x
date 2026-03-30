<script setup lang="ts">
import { BulbOutlined } from "@antdv-next/icons";
import { Think } from "@antdv-next/x";
import { Button, Flex, Tag, Typography } from "antdv-next";
</script>

<template>
  <Think title="prop title" :icon="BulbOutlined">
    <template #icon>
      <Tag color="gold">AI</Tag>
    </template>

    <template #title>
      <Flex align="center" gap="small">
        <Typography.Text strong>Reasoning Trace</Typography.Text>
        <Tag color="processing">streaming</Tag>
      </Flex>
    </template>

    <div>
      <p>
        The model is comparing options, checking constraints, and narrowing the
        final answer.
      </p>
      <Button type="link" size="small">Inspect details</Button>
    </div>
  </Think>
</template>

<docs lang="zh-CN">
通过 `title`、`icon` 和默认插槽，自定义 Think 的状态栏与思考内容区域。
</docs>

<docs lang="en-US">
Customize Think with `title`, `icon`, and default slots for the status bar and thinking content.
</docs>
