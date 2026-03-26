<script setup lang="ts">
import type { ThoughtChainItemType } from "@antdv-next/x";

import { TagsOutlined } from "@antdv-next/icons";
import { ThoughtChain } from "@antdv-next/x";
import { XRequest } from "@antdv-next/x-sdk";
import { Button, Splitter } from "antdv-next";
import { computed, h, ref } from "vue";

import { useLocale } from "@/composables/use-locale";

const BASE_URL = "https://api.example.com";
const PATH = "/chat";

const ND_JSON_SEPARATOR = "\r\n";

async function mockFetch(): Promise<Response> {
  const sseData = `data: {"id":"0","choices":[{"index":0,"delta":{"content":"Hello","role":"assistant"}}],"created":1733129200,"model":"gpt-4o"}${ND_JSON_SEPARATOR}data: {"id":"1","choices":[{"index":1,"delta":{"content":"world!","role":"assistant"}}],"created":1733129300,"model":"gpt-4o"}${ND_JSON_SEPARATOR}data: {"id":"2","choices":[{"index":2,"delta":{"content":"I","role":"assistant"}}],"created":1733129400,"model":"gpt-4o"}${ND_JSON_SEPARATOR}data: {"id":"3","choices":[{"index":3,"delta":{"content":"am","role":"assistant"}}],"created":1733129500,"model":"gpt-4o"}${ND_JSON_SEPARATOR}data: {"id":"4","choices":[{"index":4,"delta":{"content":"Ant Design X!","role":"assistant"}}],"created":1733129600,"model":"gpt-4o"}`;
  const chunks = sseData.split(ND_JSON_SEPARATOR);
  const response = new Response(
    new ReadableStream({
      async start(controller) {
        for (const chunk of chunks) {
          if (chunk.trim()) {
            // 确保不是空字符串
            await new Promise(resolve => setTimeout(resolve, 500));
            // 添加正确的 SSE 格式，确保每个 chunk 都有 data: 前缀
            const formattedChunk = chunk.startsWith("data:")
              ? chunk
              : `data: ${chunk}`;
            controller.enqueue(
              new TextEncoder().encode(formattedChunk + ND_JSON_SEPARATOR),
            );
          }
        }
        controller.close();
      },
    }),
    {
      headers: {
        "Content-Type": "text/event-stream",
      },
    },
  );

  return response;
}

const useXRequestLocale = () => {
  const { locale: docsLocale } = useLocale();
  const isCN = docsLocale.value === "zh-CN";
  return {
    request: isCN ? "请求" : "Request",
    mockCustomProtocolLog: isCN
      ? "模拟自定义协议 - 日志"
      : "Mock Custom Protocol - Log",
    sendRequest: isCN
      ? "发送请求：使用自定义转换器和模拟数据"
      : "Send request: use custom transformer and mock data",
    customStreamTransformer: isCN
      ? "自定义流转换器"
      : "Custom stream transformer",
  };
};

const status = ref<ThoughtChainItemType["status"]>();
const lines = ref<string[]>([]);
const locale = computed(() => useXRequestLocale());

const request = () => {
  status.value = "loading";
  lines.value = []; // 清空之前的日志
  XRequest(BASE_URL + PATH, {
    params: {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: "hello, who are u?" }],
      stream: true,
      agentId: 111,
    },
    streamSeparator: ND_JSON_SEPARATOR,
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
        console.log("onUpdate", msg);
        // 更新状态以显示接收到的数据
        lines.value = [...lines.value, JSON.stringify(msg)];
      },
    },

    fetch: mockFetch,
  });
};

const clearLogs = () => {
  lines.value = [];
};
</script>

<template>
  <Splitter>
    <Splitter.Panel>
      <Button type="primary" :disabled="status === 'loading'" @click="request">
        {{ locale.request }} - {{ BASE_URL }}{{ PATH }}
      </Button>
      <Button
        :style="{ marginLeft: '8px' }"
        @click="clearLogs"
        :disabled="lines.length === 0"
      >
        清除日志
      </Button>
    </Splitter.Panel>
    <Splitter.Panel :style="{ marginLeft: '16px' }">
      <ThoughtChain
        :items="[
          {
            title: locale.mockCustomProtocolLog,
            status: status,
            icon: h(TagsOutlined),
            content: h('pre', { style: { overflow: 'scroll' } }, [
              h('code', {}, lines.join(ND_JSON_SEPARATOR)),
            ]),
          },
        ]"
      />
    </Splitter.Panel>
  </Splitter>
</template>

<docs lang="zh-CN">
为 `XRequest` 配置流解析的分隔符 `streamSeparator` 用于自定义数据流分割方式。
</docs>

<docs lang="en-US">
Configure the stream parsing separator `streamSeparator` for `XRequest` to customize data stream splitting.
</docs>
