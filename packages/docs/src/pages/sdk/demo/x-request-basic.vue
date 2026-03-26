<script setup lang="ts">
import type { ThoughtChainItemType } from "@antdv-next/x";

import { LoadingOutlined, TagsOutlined } from "@antdv-next/icons";
import { ThoughtChain } from "@antdv-next/x";
import { XRequest } from "@antdv-next/x-sdk";
import { Button, Descriptions, Splitter } from "antdv-next";
import { computed, h, ref } from "vue";

import { useLocale } from "@/composables/use-locale";

const QUERY_URL = "https://api.x.ant.design/api/default_chat_provider_stream";

const useXRequestLocale = () => {
  const { locale: docsLocale } = useLocale();
  const isCN = docsLocale.value === "zh-CN";
  return {
    request: isCN ? "请求" : "Request",
    requestLog: isCN ? "请求日志" : "Request Log",
    status: isCN ? "状态" : "Status",
    updateTimes: isCN ? "更新次数" : "Update Times",
    replaceNotice: isCN
      ? "请替换 BASE_URL、PATH 为您自己的值"
      : "Please replace the BASE_URL, PATH, with your own values.",
    sendRequest: isCN
      ? "发送请求：使用 XRequest 进行 API 调用"
      : "Send request: use XRequest for API call",
  };
};

const status = ref<ThoughtChainItemType["status"]>();
const lines = ref<Record<string, string>[]>([]);
const locale = useXRequestLocale();

// 发送请求：使用 XRequest 进行 API 调用
const request = () => {
  status.value = "loading";
  XRequest(QUERY_URL, {
    params: {
      query: "X",
    },
    callbacks: {
      onSuccess: messages => {
        status.value = "success";
        console.log("onSuccess", messages);
      },
      onError: error => {
        status.value = "error";
        console.error("onError", error);
      },
      onUpdate: msg => {
        lines.value = [...lines.value, msg];
        console.log("onUpdate", msg);
      },
    },
  });
};
</script>

<template>
  <Splitter>
    <Splitter.Panel>
      <Button type="primary" :disabled="status === 'loading'" @click="request">
        {{ locale.request }} - {{ QUERY_URL }}
      </Button>
    </Splitter.Panel>
    <Splitter.Panel :style="{ marginLeft: '16px' }">
      <ThoughtChain
        :items="[
          {
            title: locale.requestLog,
            status: status,
            icon: status === 'loading' ? h(LoadingOutlined) : h(TagsOutlined),
            description: status === 'error' ? locale.replaceNotice : undefined,
            content: h(Descriptions, { column: 1 }, () => [
              h(
                Descriptions.Item,
                { label: locale.status },
                () => status || '-',
              ),
              h(
                Descriptions.Item,
                { label: locale.updateTimes },
                () => lines.length,
              ),
            ]),
          },
        ]"
      />
    </Splitter.Panel>
  </Splitter>
</template>

<docs lang="zh-CN">
基础请求示例，展示 XRequest 基本用法。
</docs>

<docs lang="en-US">
Basic request example showing XRequest fundamental usage.
</docs>
