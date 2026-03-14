<!-- <script setup lang="ts">
import { motion } from "motion-v"
import { Share2, Layout, MapPin, Clock } from "lucide-vue-next"
import { ICON_MAP } from "../constant"
import type { Link, Settings } from "../types"

const props = defineProps<{
  links: Link[]
  settings: Settings
  isAuthenticated: boolean
  onAdminClick: () => void
}>()

function handleLinkClick(link: Link) {
  window.open(link.url, "_blank")
}

function shareHub() {
  if (navigator.share) {
    navigator.share({
      title: props.settings.profile_name,
      text: `Check out ${props.settings.profile_name}'s links!`,
      url: window.location.href
    })
  } else {
    navigator.clipboard.writeText(window.location.href)
    alert("Link copied to clipboard!")
  }
}
</script>

<template>
  <div class="min-h-screen flex flex-col items-center py-16 px-4 transition-colors duration-500 font-sans"
    :style="{ backgroundColor: settings.bg_color }">
    <div class="fixed top-0 left-0 w-full h-2 bg-[#facc15] z-50"></div>

    <div class="fixed top-6 right-6 flex gap-2 z-40">
      <button @click="shareHub"
        class="p-3 bg-white/80 hover:bg-white rounded-full shadow-lg backdrop-blur-sm transition-all border border-stone-100">
        <Share2 class="w-5 h-5 text-blue-800" />
      </button>
    </div>

    <motion.div :initial="{ opacity: 0, y: 30 }" :animate="{ opacity: 1, y: 0 }"
      class="flex flex-col items-center mb-12 text-center max-w-2xl">
      <div
        className="w-32 h-32 rounded-full border-4 border-white shadow-[0_20px_50px_rgba(30,64,175,0.3)] overflow-hidden mb-6 transition-all duration-500 hover:scale-105 relative group">
        <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-transparent transition-colors duration-500">
        </div>
        <img :src="settings.profile_image || '../assets/dembel.jpg'" :alt="settings.profile_name"
          class="w-full h-full object-cover" />
      </div>

      <h1 class="text-5xl font-display font-bold mb-2 tracking-tight text-blue-900 leading-none">
        {{ settings.profile_name }}
      </h1>

      <div class="flex items-center gap-2 mb-4">
        <span class="h-px w-8 bg-[#facc15]"></span>

        <p class="font-display text-lg font-medium text-blue-700 uppercase tracking-widest">
          {{ settings.profile_username }}
        </p>

        <span class="h-px w-8 bg-[#facc15]"></span>
      </div>

      <div class="flex flex-wrap justify-center gap-4 text-stone-500 text-sm font-medium">
        <div class="flex items-center gap-1.5">
          <MapPin class="w-4 h-4 text-[#facc15]" />
          <span>Addis Ababa, Ethiopia</span>
        </div>

        <div class="flex items-center gap-1.5">
          <Clock class="w-4 h-4 text-[#facc15]" />
          <span>Open Daily: 8AM - 10PM</span>
        </div>
      </div>
    </motion.div>

    <div class="w-full max-w-lg space-y-4">
      <motion.button v-for="(link, index) in links" :key="link.id" :initial="{ opacity: 0, x: -20 }"
        :animate="{ opacity: 1, x: 0 }" :transition="{ delay: index * 0.1 }" @click="handleLinkClick(link)"
        class="w-full group relative flex items-center p-5 rounded-2xl transition-all hover:translate-x-2 active:scale-[0.98] shadow-md border border-stone-100 overflow-hidden"
        :style="{
          backgroundColor: settings.button_color,
          color: settings.text_color
        }">
        <div
          class="absolute top-0 left-0 w-1.5 h-full bg-[#facc15] opacity-0 group-hover:opacity-100 transition-opacity">
        </div>

        <div
          class="w-12 h-12 flex items-center justify-center rounded-xl bg-white/10 mr-5 group-hover:bg-white/20 transition-colors shadow-inner">
          <component :is="ICON_MAP[link.icon?.toLowerCase()] || ICON_MAP.default" />
        </div>

        <div class="grow text-left">
          <h2 class="font-display font-bold text-xl leading-tight tracking-tight">
            {{ link.title }}
          </h2>

          <p v-if="link.subtitle" class="text-sm opacity-80 font-medium mt-0.5">
            {{ link.subtitle }}
          </p>
        </div>

        <div class="opacity-0 group-hover:opacity-100 transition-opacity pr-2">
          <div class="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
            <Layout class="w-4 h-4" />
          </div>
        </div>
      </motion.button>
    </div>

    <div class="mt-auto pt-16 pb-8">
      <p class="text-center text-stone-400 text-xs font-medium uppercase tracking-widest">
        © 2026 Dembel City Center
      </p>
    </div>
  </div>
</template> -->

<script setup lang="ts">
import { ref, computed } from "vue"
import { motion, AnimatePresence } from "motion-v"
import {
  Share2,
  Layout,
  MapPin,
  Clock,
  X,
  Copy,
  Check
} from "lucide-vue-next"
import { QrcodeSvg } from "qrcode.vue"

import type { Link, Settings } from "../types"
import { ICON_MAP } from "../constant"

const props = defineProps<{
  links: Link[]
  settings: Settings
  isAuthenticated: boolean
  onAdminClick: () => void
}>()

const isShareModalOpen = ref(false)
const showCopiedToast = ref(false)

const currentUrl = computed(() => {
  if (typeof window !== 'undefined') {
    return window.location.href
  }
  return ''
})

function handleLinkClick(link: Link) {
  window.open(link.url, "_blank")
}

async function handleShare() {
  const shareData = {
    title: props.settings.profile_name,
    text: `Check out ${props.settings.profile_name}'s links!`,
    url: currentUrl.value
  }

  try {
    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      await navigator.share(shareData)
    } else {
      isShareModalOpen.value = true
    }
  } catch (err) {
    console.error("Error sharing:", err)
    isShareModalOpen.value = true
  }
}

function copyToClipboard() {
  navigator.clipboard.writeText(currentUrl.value)

  showCopiedToast.value = true

  setTimeout(() => {
    showCopiedToast.value = false
  }, 2000)
}
</script>

<template>
  <div class="min-h-screen flex flex-col items-center py-16 px-4 transition-colors duration-500 font-sans"
    :style="{ backgroundColor: settings.bg_color }">
    <!-- accent bar -->
    <div class="fixed top-0 left-0 w-full h-2 bg-[#facc15] z-50"></div>

    <!-- share button -->
    <div class="fixed top-6 right-6 flex gap-2 z-40">
      <button @click="handleShare"
        class="p-3 bg-white/80 hover:bg-white rounded-full shadow-lg backdrop-blur-sm transition-all border border-stone-100 group">
        <Share2 class="w-5 h-5 text-blue-800 group-hover:scale-110 transition-transform" />
      </button>
    </div>

    <!-- SHARE MODAL -->
    <AnimatePresence>
      <div v-if="isShareModalOpen" class="fixed inset-0 z-[60] flex items-center justify-center p-4">
        <!-- backdrop -->
        <motion.div :initial="{ opacity: 0 }" :animate="{ opacity: 1 }" :exit="{ opacity: 0 }"
          @click="isShareModalOpen = false" class="absolute inset-0 bg-stone-900/60 backdrop-blur-sm" />

        <!-- modal -->
        <motion.div :initial="{ opacity: 0, scale: 0.9, y: 20 }" :animate="{ opacity: 1, scale: 1, y: 0 }"
          :exit="{ opacity: 0, scale: 0.9, y: 20 }"
          class="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div class="p-6">

            <div class="flex justify-between items-center mb-6">
              <h3 class="text-xl font-display font-bold text-blue-900">
                Share Hub
              </h3>

              <button @click="isShareModalOpen = false" class="p-2 hover:bg-stone-100 rounded-full">
                <X class="w-5 h-5 text-stone-400" />
              </button>
            </div>

            <div class="flex flex-col items-center gap-6">

              <!-- QR -->
              <div class="p-4 bg-stone-50 rounded-2xl border border-stone-100">
                <QrcodeSvg :value="currentUrl" :size="160" level="H" />
              </div>

              <div class="w-full space-y-3">

                <!-- COPY BUTTON -->
                <button @click="copyToClipboard"
                  class="w-full flex items-center justify-between p-4 bg-stone-50 hover:bg-stone-100 rounded-2xl border border-stone-100 group">
                  <div class="flex items-center gap-3">

                    <div class="w-10 h-10 flex items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <Copy class="w-5 h-5" />
                    </div>

                    <span class="font-medium text-stone-700">
                      Copy Link
                    </span>
                  </div>

                  <div class="text-blue-600 opacity-0 group-hover:opacity-100">
                    <Check class="w-4 h-4" />
                  </div>
                </button>

                <p class="text-center text-stone-400 text-xs font-medium uppercase tracking-widest pt-2">
                  Scan QR code to visit
                </p>

              </div>

            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>

    <!-- TOAST -->
    <AnimatePresence>
      <motion.div v-if="showCopiedToast" :initial="{ opacity: 0, y: 50 }" :animate="{ opacity: 1, y: 0 }"
        :exit="{ opacity: 0, y: 50 }"
        class="fixed bottom-10 left-1/2 -translate-x-1/2 z-[70] bg-blue-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3">
        <Check class="w-4 h-4 text-[#facc15]" />
        <span>Link copied to clipboard!</span>
      </motion.div>
    </AnimatePresence>

    <!-- HEADER -->
    <motion.div :initial="{ opacity: 0, y: 30 }" :animate="{ opacity: 1, y: 0 }"
      class="flex flex-col items-center mb-12 text-center max-w-2xl">

      <div
        class="w-32 h-32 rounded-full border-4 border-white shadow-[0_20px_50px_rgba(30,64,175,0.3)] overflow-hidden mb-6">
        <img :src="settings.profile_image || '../assets/dembel.jpg'" :alt="settings.profile_name"
          class="w-full h-full object-cover" />
      </div>

      <h1 class="text-5xl font-display font-bold mb-2 tracking-tight text-blue-900">
        {{ settings.profile_name }}
      </h1>

      <p class="text-blue-700 uppercase tracking-widest">
        {{ settings.profile_username }}
      </p>

      <div class="flex gap-4 mt-4 text-stone-500 text-sm">
        <div class="flex items-center gap-1">
          <MapPin class="w-4 h-4 text-[#facc15]" />
          <span>Addis Ababa, Ethiopia</span>
        </div>

        <div class="flex items-center gap-1">
          <Clock class="w-4 h-4 text-[#facc15]" />
          <span>Open Daily: 8AM - 10PM</span>
        </div>
      </div>

    </motion.div>

    <!-- LINKS -->
    <div class="w-full max-w-lg space-y-4">

      <motion.button v-for="(link, index) in links" :key="link.id" :initial="{ opacity: 0, x: -20 }"
        :animate="{ opacity: 1, x: 0 }" :transition="{ delay: index * 0.1 }" @click="handleLinkClick(link)"
        class="w-full group flex items-center p-5 rounded-2xl shadow-md border border-stone-100" :style="{
          backgroundColor: settings.button_color,
          color: settings.text_color
        }">

        <div class="w-12 h-12 flex items-center justify-center rounded-xl bg-white/10 mr-5">
          <component :is="ICON_MAP[link.icon?.toLowerCase()] || ICON_MAP.default" />
        </div>

        <div class="flex-grow text-left">
          <h2 class="font-bold text-xl">{{ link.title }}</h2>
          <p v-if="link.subtitle" class="text-sm opacity-80">
            {{ link.subtitle }}
          </p>
        </div>

        <Layout class="w-4 h-4 opacity-0 group-hover:opacity-100" />

      </motion.button>

    </div>

    <div class="mt-auto pt-16 pb-8">
      <p class="text-center text-stone-400 text-xs uppercase tracking-widest">
        © 2026 Dembel City Center
      </p>
    </div>

  </div>
</template>