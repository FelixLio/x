<script setup lang="ts">
import type { MenuEmits } from 'antdv-next'
import { GlobalOutlined } from '@antdv-next/icons'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import logoUrl from '@/assets/x.png'
import { useLocale } from '@/composables/use-locale'
import { headerItems, headerLocales } from '@/config/header'
import { resolveDocRoutePath } from '@/router/docs'
import { useAppStore } from '@/stores/app'
import 'antdv-next/dist/antd.css'

const route = useRoute()
const router = useRouter()
const appStore = useAppStore()
const { locale } = useLocale()

const itemKeys = headerItems.map(item => item.key).filter(Boolean) as string[]
const headerPrefixes = itemKeys.toSorted((a, b) => b.length - a.length)

function normalizeHeaderMatchPath(path: string) {
  if (path.endsWith('-en'))
    return path.slice(0, -3) || '/'
  if (path.endsWith('-cn'))
    return path.slice(0, -3) || '/'
  return path
}

const selectedKeys = computed(() => {
  const normalizedPath = normalizeHeaderMatchPath(route.path)
  const matchedHeaderPrefix = headerPrefixes.find(prefix =>
    normalizedPath === prefix || normalizedPath.startsWith(`${prefix}/`),
  )
  return matchedHeaderPrefix ? [matchedHeaderPrefix] : []
})

const handleHeaderChange: MenuEmits['click'] = (info) => {
  router.push(String(info.key))
}

function toggleLocale() {
  const nextLocale = appStore.locale === 'zh-CN' ? 'en-US' : 'zh-CN'
  appStore.setLocale(nextLocale)

  const localizedPath = resolveDocRoutePath(route.path, nextLocale)
  if (!localizedPath || localizedPath === route.path)
    return

  router.replace({
    path: localizedPath,
    query: route.query,
    hash: route.hash,
  })
}
</script>

<template>
  <header class="antdx-doc-header">
    <div class="antdx-doc-header-inner">
      <router-link class="antdx-doc-header-logo" to="/">
        <img class="antdx-doc-header-logo-img" :src="logoUrl" draggable="false" alt="logo">
        <span class="antdx-doc-header-logo-text">Antd Next X</span>
      </router-link>

      <div class="antdx-doc-header-right">
        <a-menu
          class="antdx-doc-header-menu"
          mode="horizontal"
          :items="headerItems"
          :selected-keys="selectedKeys"
          :disabled-overflow="true"
          @click="handleHeaderChange"
        >
          <template #labelRender="{ key, label }">
            {{ headerLocales?.[key]?.[locale as 'zh-CN' | 'en-US'] ?? label }}
          </template>
        </a-menu>

        <a-button class="antdx-doc-header-locale" type="text" @click="toggleLocale">
          <template #icon>
            <GlobalOutlined />
          </template>
          {{ locale === 'zh-CN' ? '中' : 'En' }}
        </a-button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.antdx-doc-header {
  position: sticky;
  top: 0;
  z-index: 1000;
  height: 64px;
  width: 100%;
  background-color: color-mix(in srgb, var(--ant-color-bg-container), transparent 20%);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid color-mix(in srgb, var(--ant-color-border), transparent 30%);
}

.antdx-doc-header-inner {
  height: 64px;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.antdx-doc-header-logo {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: var(--ant-color-text);
  text-decoration: none;
  font-weight: 700;
  font-size: 18px;
  white-space: nowrap;
}

.antdx-doc-header-logo-img {
  width: 32px;
  height: 32px;
  display: inline-block;
}

.antdx-doc-header-right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
  flex-shrink: 0;
}

.antdx-doc-header-menu {
  background: transparent !important;
  border-bottom: none !important;
  flex-shrink: 0;
  width: max-content;
}

.antdx-doc-header-menu :deep(.ant-menu-item) {
  height: 64px;
  line-height: 64px;
}

.antdx-doc-header-locale {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
}

@media (max-width: 768px) {
  .antdx-doc-header-inner {
    padding: 0 16px;
  }

  .antdx-doc-header-logo-text {
    display: none;
  }
}
</style>
