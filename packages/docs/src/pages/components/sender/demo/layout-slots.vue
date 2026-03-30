<script setup lang="ts">
import {
  PaperClipOutlined,
  SearchOutlined,
  SettingOutlined,
} from "@antdv-next/icons";
import { Sender } from "@antdv-next/x";
import { Button, Flex, Tag, Typography, message } from "antdv-next";
import { ref } from "vue";

const value = ref("");
const headerOpen = ref(true);

function handleSubmit() {
  message.success(`发送内容: ${value.value || "空消息"}`);
  value.value = "";
}
</script>

<template>
  <Sender
    :value="value"
    placeholder="试试用 slot 自定义布局"
    :on-change="(nextValue: string) => (value = nextValue)"
    :on-submit="handleSubmit"
  >
    <template #header>
      <Sender.Header
        title="会话配置"
        :open="headerOpen"
        :on-open-change="(open: boolean) => (headerOpen = open)"
      >
        <Flex gap="small" wrap="wrap">
          <Tag color="blue">gpt-4.1</Tag>
          <Tag color="green">联网搜索</Tag>
          <Tag color="gold">低温度</Tag>
        </Flex>
      </Sender.Header>
    </template>

    <template #prefix>
      <Button type="text">
        <template #icon>
          <PaperClipOutlined />
        </template>
      </Button>
    </template>

    <template #suffix="{ components }">
      <Flex align="center" gap="small">
        <Typography.Text type="secondary">
          <small>Enter 发送</small>
        </Typography.Text>
        <Button type="text">
          <template #icon>
            <SettingOutlined />
          </template>
        </Button>
        <component :is="components.SpeechButton" />
        <component :is="components.ClearButton" />
        <component
          :is="components.SendButton"
          type="primary"
          :disabled="!value"
        />
      </Flex>
    </template>

    <template #footer>
      <Flex justify="space-between" align="center">
        <Typography.Text type="secondary">
          通过 `#header / #prefix / #suffix / #footer` 定制布局
        </Typography.Text>
        <Button type="link">
          <template #icon>
            <SearchOutlined />
          </template>
          更多工具
        </Button>
      </Flex>
    </template>
  </Sender>
</template>

<docs lang="zh-CN">
通过 `#header`、`#prefix`、`#suffix`、`#footer` 命名插槽自定义 Sender 的各个区域；`#suffix` 插槽还能拿到默认操作节点和内置按钮组件。
</docs>

<docs lang="en-US">
Customize each Sender area with `#header`, `#prefix`, `#suffix`, and `#footer` slots. The `#suffix` slot also receives the default action node and built-in action components.
</docs>
