<script setup lang="ts">
import { Bubble } from "@antdv-next/x";
import { Button, Image, Space, Typography } from "antdv-next";
import { h, ref } from "vue";

interface CustomContent {
  imageUrl: string;
  text: string;
  actionLabel: string;
}

const content = ref<CustomContent>({
  imageUrl:
    "https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*eco6RrQhxbMAAAAAAAAAAAAADgCCAQ/original",
  text: "Ant Design X",
  actionLabel: "Click Me",
});

function updateAction() {
  content.value = {
    ...content.value,
    actionLabel: "Happy Ant Design X!",
  };
}

function footerRender(value: any) {
  return h(
    Button,
    {
      type: "text",
      size: "small",
      onClick: updateAction,
    },
    {
      default: () => value.actionLabel,
    },
  );
}
</script>

<template>
  <Bubble :content="content" :footer="footerRender">
    <template #contentRender="{ content: value }">
      <Space align="center" :size="10">
        <Image :width="50" :src="value.imageUrl" :preview="false" />
        <Typography.Text strong>
          {{ value.text }}
        </Typography.Text>
      </Space>
    </template>
  </Bubble>
</template>

<docs lang="zh-CN">
自定义渲染内容。
</docs>

<docs lang="en-US">
Custom rendering content.
</docs>
