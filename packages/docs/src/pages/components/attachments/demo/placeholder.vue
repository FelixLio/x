<template>
  <a-app>
    <a-flex
      vertical
      gap="middle"
      :style="{
        padding: token.padding,
        background: token.colorBgContainerDisabled,
      }"
    >
      <div :style="sharedBorderStyle">
        <ax-attachments
          :before-upload="() => false"
          :items="items"
          @change="onChange"
          :placeholder="getPlaceholderFn(defaultInlinePlaceholder)"
        />
      </div>

      <div :style="sharedBorderStyle">
        <ax-attachments
          :before-upload="() => false"
          :items="items"
          @change="onChange"
          :placeholder="getPlaceholderFn(customPlaceholderNode)"
        >
          <template #placeholder="{ type }">
            <a-result
              v-if="type === 'inline'"
              title="Custom Placeholder Node"
              :style="{ padding: 0 }"
            >
              <template #icon>
                <CloudUploadOutlined />
              </template>
              <template #extra>
                <a-button type="primary">Do Upload</a-button>
              </template>
            </a-result>
            <template v-else>Drop file here</template>
          </template>
        </ax-attachments>
      </div>

      <div :style="sharedBorderStyle">
        <ax-attachments
          :before-upload="() => false"
          :items="items"
          @change="onChange"
          :placeholder="getPlaceholderFn(defaultInlinePlaceholder)"
        >
          <template #placeholder-icon="{ originNode }">
            <CloudUploadOutlined style="color: #1677ff" />
            <template v-if="!originNode" />
          </template>
          <template #placeholder-title="{ type, originNode }">
            {{ type === "drop" ? "Drop file here" : originNode }}
          </template>
          <template #placeholder-description="{ type, originNode }">
            {{
              type === "drop"
                ? "Release the mouse to start selecting files."
                : originNode
            }}
          </template>
        </ax-attachments>
      </div>

      <a-flex gap="middle">
        <a-button
          :style="{ flex: '1 1 50%' }"
          :disabled="!!items.length"
          type="primary"
          @click="fillFiles"
        >
          Fill Files
        </a-button>
        <a-button
          :style="{ flex: '1 1 50%' }"
          :disabled="!items.length"
          @click="resetFiles"
        >
          Reset Files
        </a-button>
      </a-flex>
    </a-flex>
  </a-app>
</template>

<script setup lang="ts">
import type { VNodeChild } from "vue";

import { CloudUploadOutlined } from "@antdv-next/icons";
import { Button, Result, theme } from "antdv-next";
import { h, ref } from "vue";

const { token } = theme.useToken();

interface Attachment {
  uid: string;
  name: string;
  status?: "uploading" | "done" | "error" | "removed";
  url?: string;
  thumbUrl?: string;
  percent?: number;
  response?: any;
  size?: number;
  description?: VNodeChild;
}

const presetFiles: Attachment[] = [
  {
    uid: "1",
    name: "uploading file.xlsx",
    status: "uploading",
    url: "http://www.baidu.com/xxx.png",
    percent: 93,
  },
  {
    uid: "2",
    name: "uploaded file.docx",
    status: "done",
    size: 123456,
    description: "Customize description",
    url: "http://www.baidu.com/yyy.png",
  },
  {
    uid: "3",
    name: "upload error with long text file name.zip",
    status: "error",
    response: "Server Error 500",
    url: "http://www.baidu.com/zzz.png",
  },
  {
    uid: "4",
    name: "image uploading preview.png",
    status: "uploading",
    percent: 33,
    thumbUrl:
      "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
  },
  {
    uid: "5",
    name: "image done preview.png",
    status: "done",
    size: 123456,
    thumbUrl:
      "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
  },
  {
    uid: "6",
    name: "image error preview.png",
    status: "error",
    response: "Server Error 500",
    thumbUrl:
      "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
  },
];

const items = ref<Attachment[]>([]);

const sharedBorderStyle = {
  borderRadius: token.value.borderRadius,
  overflow: "hidden",
  background: token.value.colorBgContainer,
};

const defaultInlinePlaceholder = {
  icon: h(CloudUploadOutlined),
  title: "Click or Drop files here",
  description: "Support file type: image, video, audio, document, etc.",
};

const customPlaceholderNode = h(
  Result,
  {
    title: "Custom Placeholder Node",
    icon: h(CloudUploadOutlined),
    style: { padding: 0 },
  },
  {
    extra: () =>
      h(
        Button,
        {
          type: "primary",
        },
        {
          default: () => "Do Upload",
        },
      ),
  },
);

const onChange = ({ fileList }: { fileList: Attachment[] }) => {
  items.value = fileList;
};

type PlaceholderType =
  | VNodeChild
  | {
      icon?: VNodeChild;
      title?: VNodeChild;
      description?: VNodeChild;
    };

const getPlaceholderFn = (inlinePlaceholder: PlaceholderType) => {
  return (type: "inline" | "drop") =>
    type === "drop"
      ? {
          title: "Drop file here",
        }
      : inlinePlaceholder;
};

const fillFiles = () => {
  items.value = [...presetFiles];
};

const resetFiles = () => {
  items.value = [];
};
</script>

<docs lang="zh-CN">
修改占位信息。
</docs>

<docs lang="en-US">
Modify placeholder information.
</docs>
