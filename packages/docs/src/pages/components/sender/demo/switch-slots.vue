<script setup lang="ts">
import {
  CheckCircleOutlined,
  SearchOutlined,
  ThunderboltOutlined,
} from "@antdv-next/icons";
import { Sender } from "@antdv-next/x";
import { Badge, Flex, Tag, Typography } from "antdv-next";
import { ref } from "vue";

const checked = ref(true);
</script>

<template>
  <Flex vertical gap="middle">
    <Flex align="center" gap="small">
      Slot content:
      <Sender.Switch
        :value="checked"
        :on-change="(next: boolean) => (checked = next)"
      >
        <template #icon>
          <Badge dot :offset="[-2, 10]">
            <SearchOutlined />
          </Badge>
        </template>
        <template #checkedChildren>
          <Flex align="center" gap="small">
            <CheckCircleOutlined />
            <span>Deep Search On</span>
            <Tag color="green">Active</Tag>
          </Flex>
        </template>
        <template #unCheckedChildren>
          <Flex align="center" gap="small">
            <ThunderboltOutlined />
            <span>Deep Search Off</span>
            <Typography.Text type="secondary">Manual</Typography.Text>
          </Flex>
        </template>
      </Sender.Switch>
    </Flex>

    <Flex align="center" gap="small">
      Mixed with default slot:
      <Sender.Switch>
        <template #icon>
          <SearchOutlined />
        </template>
        <template #unCheckedChildren>Search</template>
        <Typography.Text type="secondary">Beta</Typography.Text>
      </Sender.Switch>
    </Flex>
  </Flex>
</template>

<docs lang="zh-CN">
通过 `Sender.Switch` 的 `#icon`、`#checkedChildren`、`#unCheckedChildren` 插槽自定义图标和开关两种状态下的内容。
</docs>

<docs lang="en-US">
Customize icon and state-specific content with the `Sender.Switch` `#icon`, `#checkedChildren`, and `#unCheckedChildren` slots.
</docs>
