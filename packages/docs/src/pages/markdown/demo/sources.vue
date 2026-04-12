<script setup lang="ts">
import type { SourcesProps } from "@antdv-next/x";

import { Bubble, Sources } from "@antdv-next/x";
import { XMarkdown } from "@antdv-next/x-markdown";
import { Button, Flex } from "antdv-next";
import {
  computed,
  defineComponent,
  h,
  onBeforeUnmount,
  ref,
  watch,
  type VNode,
} from "vue";

const text = `Antdv Next X serves AI-native scenarios with reusable interaction components and patterns.<sup>1</sup> In rapidly evolving product cycles, designers and developers need to iterate quickly while maintaining consistency.<sup>2</sup> Through abstraction and composability, teams can build stable, reusable pages and workflows faster.<sup>3</sup>`;

function extractText(nodes: VNode[]): string {
  return nodes
    .map(node => {
      const children = node.children;
      if (typeof children === "string") return children;
      if (Array.isArray(children)) return extractText(children as VNode[]);
      return "";
    })
    .join("");
}

const items: SourcesProps["items"] = [
  {
    title: "1. Data source",
    key: 1,
    url: "https://x.antdv-next.com/components/introduce/",
    description:
      "Artificial Intelligence, often abbreviated as AI, is a broad branch of computer science concerned with building smart machines capable of performing tasks that typically require human intelligence.",
  },
  {
    title: "2. Data source",
    key: 2,
    url: "https://x.antdv-next.com/markdown",
  },
  {
    title: "3. Data source",
    key: 3,
    url: "https://github.com/antdv-next/x",
  },
];

const SupComponent = defineComponent({
  name: "SupComponent",
  setup(_, { slots }) {
    const title = computed(() => extractText(slots.default?.() ?? []));
    const activeKey = computed(() => {
      return Number.parseInt(`${title.value || "0"}`, 10);
    });

    return () =>
      h(Sources, {
        activeKey: activeKey.value,
        title: title.value || 0,
        items,
        inline: true,
      });
  },
});

const components = {
  sup: SupComponent,
};

const index = ref(0);
const contentRef = ref<HTMLElement | null>(null);
let timerRef: ReturnType<typeof setTimeout> | null = null;

const clearTimer = () => {
  if (timerRef !== null) {
    clearTimeout(timerRef);
    timerRef = null;
  }
};

watch(
  index,
  () => {
    clearTimer();

    if (index.value >= text.length) {
      return;
    }

    timerRef = setTimeout(() => {
      index.value = Math.min(index.value + 5, text.length);
    }, 20);
  },
  { immediate: true },
);

watch(index, () => {
  if (!contentRef.value || index.value <= 0 || index.value >= text.length) {
    return;
  }

  const { scrollHeight, clientHeight } = contentRef.value;
  if (scrollHeight > clientHeight) {
    contentRef.value.scrollTo({
      top: scrollHeight,
      behavior: "smooth",
    });
  }
});

onBeforeUnmount(clearTimer);

const rerender = () => {
  clearTimer();
  index.value = 0;
};
</script>

<template>
  <Flex
    vertical
    :gap="8"
    style="height: 240px; overflow: auto"
    ref="contentRef"
  >
    <Flex justify="flex-end">
      <Button @click="rerender">Re-Render</Button>
    </Flex>

    <Bubble :content="text.slice(0, index)" variant="outlined">
      <template #content="{ content }">
        <XMarkdown
          :content="content"
          :components="components"
          paragraph-tag="div"
          :streaming="{ hasNextChunk: index < text.length }"
        />
      </template>
    </Bubble>
  </Flex>
</template>

<docs lang="zh-CN">
Sources 示例，在 Markdown 内将脚注标记映射为 Sources 内联组件。
</docs>

<docs lang="en-US">
Sources demo mapping Markdown footnote markers to inline Sources components.
</docs>
