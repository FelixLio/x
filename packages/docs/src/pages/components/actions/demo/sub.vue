<script setup lang="ts">
import type { ActionsProps } from "@antdv-next/x";

import {
  DeleteOutlined,
  EditOutlined,
  RedoOutlined,
  ShareAltOutlined,
} from "@antdv-next/icons";
import { message, Modal } from "antdv-next";

const items: ActionsProps["items"] = [
  {
    key: "retry",
    label: "Retry",
  },
  {
    key: "edit",
    label: "Edit",
  },
  {
    key: "more",
    subItems: [
      {
        key: "share",
        label: "Share",
      },
      {
        key: "import",
        label: "Import Data",
      },
      {
        key: "delete",
        label: "Delete",
        danger: true,
        onItemClick: () => {
          Modal.confirm({
            title: "Are you sure want to delete?",
            content: "Some descriptions",
            onOk() {
              message.success("Delete successfully");
            },
            onCancel() {
              message.info("Cancel");
            },
          });
        },
      },
    ],
  },
  {
    key: "clear",
    label: "Clear",
    danger: true,
  },
];

const onClick: ActionsProps["onClick"] = ({ keyPath }) => {
  message.success(`you clicked ${keyPath.join(",")}`);
};
</script>

<template>
  <ax-actions :items="items" :on-click="onClick">
    <template #iconRender="{ item }">
      <RedoOutlined v-if="item.key === 'retry'" />
      <EditOutlined v-else-if="item.key === 'edit'" />
      <ShareAltOutlined v-else-if="item.key === 'share'" />
      <DeleteOutlined
        v-else-if="item.key === 'delete' || item.key === 'clear'"
      />
    </template>
  </ax-actions>
</template>

<docs lang="zh-CN">
通过设置 `subItems` 属性来展示更多菜单项，含有 `subItems` 的项可以不配置 icon，会默认使用 `<EllipsisOutlined />`
</docs>

<docs lang="en-US">
Display more menu items by setting the `subItems` property. Items with `subItems` don't need to configure an icon; `<EllipsisOutlined />` will be used by default.
</docs>
