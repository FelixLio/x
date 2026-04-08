<template>
  <a-flex vertical gap="middle">
    <a-flex gap="middle" align="center">
      <a-segmented
        v-model:value="overflow"
        :options="[
          { value: 'wrap', label: 'Wrap' },
          { value: 'scrollX', label: 'Scroll X' },
          { value: 'scrollY', label: 'Scroll Y' },
        ]"
        :style="{ marginInlineEnd: 'auto' }"
      />
      <a-switch
        v-model:checked="hasData"
        checked-children="Data"
        un-checked-children="Data"
      />
      <a-switch
        v-model:checked="disabled"
        checked-children="Disabled"
        un-checked-children="Disabled"
      />
    </a-flex>

    <ax-attachments
      :overflow="overflow"
      :items="items"
      @change="onChange"
      :before-upload="() => false"
      :placeholder="placeholder"
      :disabled="disabled"
    >
      <template #placeholder-icon>
        <CloudUploadOutlined />
      </template>
    </ax-attachments>
  </a-flex>
</template>

<script setup lang="ts">
import { CloudUploadOutlined } from "@antdv-next/icons";
import { computed, ref } from "vue";

interface Attachment {
  uid: string;
  name: string;
  status?: "uploading" | "done" | "error" | "removed";
  url?: string;
  thumbUrl?: string;
  percent?: number;
  response?: any;
  size?: number;
}

const presetFiles: Attachment[] = Array.from({ length: 30 }).map(
  (_, index) => ({
    uid: String(index),
    name: `file-${index}.jpg`,
    status: "done" as const,
    thumbUrl:
      "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
  }),
);

const placeholder = {
  title: "Click or Drop files here",
  description: "Support file type: image, video, audio, document, etc.",
};

const overflow = ref<"wrap" | "scrollX" | "scrollY">("wrap");
const disabled = ref(false);
const items = ref<Attachment[]>([...presetFiles]);

const hasData = computed({
  get: () => items.value.length !== 0,
  set: checked => {
    items.value = checked ? [...presetFiles] : [];
  },
});

const onChange = ({ fileList }: { fileList: Attachment[] }) => {
  items.value = fileList;
};
</script>

<docs lang="zh-CN">
控制附件超出区域长度时的展示方式。
</docs>

<docs lang="en-US">
Controls the layout of attachments when they exceed the area.
</docs>
