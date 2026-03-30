<script setup lang="ts">
import {
  CloudUploadOutlined,
  PaperClipOutlined,
  PlusOutlined,
} from "@antdv-next/icons";
import { Sender } from "@antdv-next/x";
import { Button, Flex, Tag, Typography, message } from "antdv-next";
import { ref } from "vue";

const open = ref(true);

function handleSubmit() {
  message.success("Send message successfully!");
}
</script>

<template>
  <Flex :style="{ height: '350px' }" align="end">
    <Sender placeholder="试试 Header title slot" :on-submit="handleSubmit">
      <template #header>
        <Sender.Header
          :open="open"
          :on-open-change="(next: boolean) => (open = next)"
        >
          <template #title>
            <Flex align="center" justify="space-between" style="width: 100%">
              <Flex align="center" gap="small">
                <CloudUploadOutlined />
                <span>Upload Sample</span>
                <Tag color="blue">3 files</Tag>
              </Flex>
              <Typography.Text type="secondary">2MB left</Typography.Text>
            </Flex>
          </template>

          <Flex
            vertical
            align="center"
            gap="small"
            :style="{ marginBlock: '24px' }"
          >
            <CloudUploadOutlined :style="{ fontSize: '4em' }" />
            <Typography.Title :level="5" :style="{ margin: 0 }">
              Drag file here (just demo)
            </Typography.Title>
            <Typography.Text type="secondary">
              Support pdf, doc, xlsx, ppt, txt, image file types
            </Typography.Text>
            <Button @click="message.info('Mock select file')"
              >Select File</Button
            >
          </Flex>
        </Sender.Header>
      </template>

      <template #prefix>
        <Button type="text" :style="{ fontSize: '16px' }" @click="open = !open">
          <template #icon>
            <PaperClipOutlined />
          </template>
        </Button>
      </template>

      <template #suffix="{ components }">
        <Flex align="center" gap="small">
          <Button type="text">
            <template #icon>
              <PlusOutlined />
            </template>
          </Button>
          <component :is="components.SendButton" type="primary" />
        </Flex>
      </template>
    </Sender>
  </Flex>
</template>

<docs lang="zh-CN">
通过 `Sender.Header` 的 `#title` 插槽自定义头部标题区，可以放入图标、状态和额外信息。
</docs>

<docs lang="en-US">
Customize the header title area with the `Sender.Header` `#title` slot for icons, status, and extra metadata.
</docs>
