<script setup lang="ts">
import type { FileCardProps } from "@antdv-next/x";

import { DownloadOutlined } from "@antdv-next/icons";
import { FileCard, FileCardList } from "@antdv-next/x";
import { Button, Flex, Tag, Typography } from "antdv-next";

const listItems: FileCardProps[] = [
  { name: "report.pdf", byte: 1024 * 1024 },
  { name: "spec.docx", byte: 512 * 1024 },
];
</script>

<template>
  <Flex vertical gap="middle">
    <FileCard name="project-plan.pdf" :byte="1024 * 1024" mask="default mask">
      <template #iconRender="{ info }">
        <Tag color="processing">{{ info.nameSuffix }}</Tag>
      </template>

      <template #description="{ info, originNode }">
        <Flex align="center" justify="space-between">
          <Typography.Text type="secondary">{{ originNode }}</Typography.Text>
          <Button type="text" size="small">
            <template #icon>
              <DownloadOutlined />
            </template>
            下载
          </Button>
        </Flex>
      </template>

      <template #mask="{ info }">
        <span>预览 {{ info.name }}</span>
      </template>
    </FileCard>

    <FileCardList :items="listItems">
      <template #iconRender="{ item, index }">
        <Tag :color="index === 0 ? 'red' : 'blue'">{{ item.name }}</Tag>
      </template>

      <template #description="{ item, info }">
        <span>{{ item.name }} · {{ info.size }}</span>
      </template>

      <template #extension="{ items }">
        <Typography.Text type="secondary">
          共 {{ items.length }} 个文件
        </Typography.Text>
      </template>
    </FileCardList>
  </Flex>
</template>

<docs lang="zh-CN">
通过插槽自定义 FileCard 与 FileCardList 的图标、描述、遮罩和扩展区域。
</docs>

<docs lang="en-US">
Customize FileCard and FileCardList with slots for icon, description, mask, and extension areas.
</docs>
