<script setup lang="ts">
import type { ActionsItemProps, ActionsProps } from "@antdv-next/x";

import {
  CheckOutlined,
  CopyOutlined,
  LoadingOutlined,
  RedoOutlined,
  ShareAltOutlined,
} from "@antdv-next/icons";
import { ref } from "vue";

const shareStatus = ref<ActionsItemProps["status"]>("default");

const iconItems: ActionsProps["items"] = [
  {
    key: "retry",
    label: "Retry",
    icon: "retry",
  },
  {
    key: "copy",
    label: "Copy",
    icon: "copy",
  },
];

const actionItems: ActionsProps["items"] = [
  {
    key: "share",
    label: "Share",
  },
  {
    key: "custom",
    label: "Custom",
  },
];

const toggleShare = () => {
  shareStatus.value = shareStatus.value === "running" ? "default" : "running";
};
</script>

<template>
  <a-flex vertical gap="middle">
    <div>
      <a-typography-text type="secondary">`iconRender`</a-typography-text>
    </div>

    <ax-actions :items="iconItems">
      <template #iconRender="{ item, index }">
        <a-tag color="processing">#{{ index + 1 }} {{ item.key }}</a-tag>
      </template>
    </ax-actions>

    <a-divider style="margin: 0" />

    <div>
      <a-typography-text type="secondary">`actionRender`</a-typography-text>
    </div>

    <ax-actions :items="actionItems">
      <template #actionRender="{ item }">
        <ax-actions-item
          v-if="item.key === 'share'"
          :status="shareStatus"
          label="Share"
          default-icon="share"
          running-icon="running"
          @click="toggleShare"
        >
          <template #defaultIcon>
            <ShareAltOutlined />
          </template>

          <template #runningIcon>
            <CheckOutlined />
          </template>
        </ax-actions-item>
      </template>
    </ax-actions>

    <a-divider style="margin: 0" />

    <div>
      <a-typography-text type="secondary">
        `ActionsCopy.icon` / `ActionsItem` slots
      </a-typography-text>
    </div>

    <a-flex gap="middle">
      <ax-actions-copy text="antdv next x">
        <template #icon="{ status }">
          <span
            :style="{
              display: 'inline-flex',
              color: status === 'copied' ? '#52c41a' : '#1677ff',
            }"
          >
            <CheckOutlined v-if="status === 'copied'" />
            <CopyOutlined v-else />
          </span>
        </template>
      </ax-actions-copy>

      <ax-actions-item
        :status="shareStatus"
        label="Independent antdv next x action"
        default-icon="default"
        running-icon="running"
        @click="toggleShare"
      >
        <template #defaultIcon>
          <RedoOutlined />
        </template>

        <template #runningIcon>
          <LoadingOutlined />
        </template>
      </ax-actions-item>
    </a-flex>
  </a-flex>
</template>

<docs lang="zh-CN">
通过插槽自定义 Actions、ActionsCopy 与 ActionsItem 的图标和操作渲染。`ActionsCopy.icon` 会额外提供 `status`，可区分默认态与复制成功态。
</docs>

<docs lang="en-US">
Customize icon and action rendering for Actions, ActionsCopy, and ActionsItem with slots. `ActionsCopy.icon` also receives `status` so you can render different icons for the default and copied states.
</docs>
