<script setup lang="ts">
import { XMarkdown } from "@antdv-next/x-markdown";
import { computed } from "vue";

const source = `
### Use [marked extensions](https://marked.js.org/using_advanced#extensions)

I :heart: XMarkdown! :tada:
`;

const transformed = computed(() =>
  source.replace(/:heart:/g, "❤️").replace(/:tada:/g, "🎉"),
);
</script>

<template>
  <XMarkdown :content="transformed" />
</template>

<docs lang="zh-CN">
Marked 风格插件示例，演示预处理后的内容渲染。
</docs>

<docs lang="en-US">
Marked-style plugin demo rendering transformed content after preprocessing.
</docs>
