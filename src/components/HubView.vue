<script setup lang="ts">
import { ref } from "vue"
import { motion, AnimatePresence } from "motion-v"
import {
  Share2,
  Layout,
  MapPin,
  Clock,
  X,
  Copy,
  Check,
  Send
} from "lucide-vue-next"

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

function handleLinkClick(link: Link) {
  window.open(link.url, "_blank")
}

async function handleShare() {
  const shareData = {
    title: props.settings.profile_name,
    text: `Check out ${props.settings.profile_name}'s links!`,
    url: window.location.href
  }

  try {
    if (navigator.share) {
      await navigator.share(shareData)
      return
    }

    // Desktop fallback
    isShareModalOpen.value = true
  } catch (err) {
    console.log("Share cancelled or failed:", err)
    isShareModalOpen.value = true
  }
}

function copyLink() {
  navigator.clipboard.writeText(window.location.href)

  showCopiedToast.value = true

  setTimeout(() => {
    showCopiedToast.value = false
  }, 2000)
}

function shareTelegram() {
  const url = encodeURIComponent(window.location.href)
  window.open(`https://t.me/share/url?url=${url}`, "_blank")
}

function shareWhatsApp() {
  const url = encodeURIComponent(window.location.href)
  window.open(`https://wa.me/?text=${url}`, "_blank")
}
</script>

<template>
<div
  class="min-h-screen flex flex-col items-center py-16 px-4 transition-colors duration-500 font-sans"
  :style="{ backgroundColor: settings.bg_color }"
>

<!-- top accent -->
<div class="fixed top-0 left-0 w-full h-2 bg-yellow-400"></div>

<!-- SHARE BUTTON -->
<div class="fixed top-6 right-6 z-40">
<button
  @click="handleShare"
  class="p-3 bg-white/80 hover:bg-white rounded-full shadow-lg border border-stone-100 group"
>
<Share2 class="w-5 h-5 text-blue-800 group-hover:scale-110 transition"/>
</button>
</div>

<!-- SHARE MODAL (DESKTOP) -->
<AnimatePresence>
<div
  v-if="isShareModalOpen"
  class="fixed inset-0 z-50 flex items-center justify-center"
>

<motion.div
  :initial="{opacity:0}"
  :animate="{opacity:1}"
  :exit="{opacity:0}"
  class="absolute inset-0 bg-black/50"
  @click="isShareModalOpen=false"
/>

<motion.div
  :initial="{opacity:0,scale:0.9}"
  :animate="{opacity:1,scale:1}"
  :exit="{opacity:0,scale:0.9}"
  class="relative bg-white rounded-3xl p-6 w-[350px] shadow-xl"
>

<div class="flex justify-between items-center mb-6">
<h3 class="text-xl font-bold text-blue-900">Share Hub</h3>

<button
  @click="isShareModalOpen=false"
  class="p-2 hover:bg-gray-100 rounded-full"
>
<X class="w-5 h-5"/>
</button>
</div>

<div class="space-y-3">

<button
  @click="copyLink"
  class="w-full flex items-center gap-3 p-4 rounded-xl bg-gray-100 hover:bg-gray-200"
>
<Copy class="w-5 h-5"/>
<span>Copy Link</span>
</button>

<button
  @click="shareTelegram"
  class="w-full flex items-center gap-3 p-4 rounded-xl bg-gray-100 hover:bg-gray-200"
>
<Send class="w-5 h-5"/>
<span>Share on Telegram</span>
</button>

<button
  @click="shareWhatsApp"
  class="w-full flex items-center gap-3 p-4 rounded-xl bg-gray-100 hover:bg-gray-200"
>
<Send class="w-5 h-5"/>
<span>Share on WhatsApp</span>
</button>

</div>

</motion.div>
</div>
</AnimatePresence>

<!-- HEADER -->
<motion.div
  :initial="{opacity:0,y:30}"
  :animate="{opacity:1,y:0}"
  class="flex flex-col items-center mb-12 text-center"
>

<div class="w-32 h-32 rounded-full overflow-hidden mb-6 border-4 border-white shadow-lg">
<img
  :src="settings.profile_image"
  class="w-full h-full object-cover"
/>
</div>

<h1 class="text-5xl font-bold text-blue-900">
{{ settings.profile_name }}
</h1>

<p class="text-blue-700 uppercase tracking-widest">
{{ settings.profile_username }}
</p>

<div class="flex gap-4 mt-4 text-gray-500 text-sm">

<div class="flex items-center gap-1">
<MapPin class="w-4 h-4 text-yellow-400"/>
<span>Addis Ababa, Ethiopia</span>
</div>

<div class="flex items-center gap-1">
<Clock class="w-4 h-4 text-yellow-400"/>
<span>Open Daily: 8AM - 10PM</span>
</div>

</div>

</motion.div>

<!-- LINKS -->
<div class="w-full max-w-lg space-y-4">

<motion.button
  v-for="(link,index) in links"
  :key="link.id"
  :initial="{opacity:0,x:-20}"
  :animate="{opacity:1,x:0}"
  :transition="{delay:index*0.1}"
  @click="handleLinkClick(link)"
  class="w-full flex items-center p-5 rounded-2xl shadow border border-gray-100"
  :style="{
    backgroundColor: settings.button_color,
    color: settings.text_color
  }"
>

<div class="w-12 h-12 flex items-center justify-center mr-5 bg-white/10 rounded-xl">
<component
:is="ICON_MAP[link.icon?.toLowerCase()] || ICON_MAP.default"
/>
</div>

<div class="flex-grow text-left">
<h2 class="font-bold text-xl">
{{ link.title }}
</h2>

<p
v-if="link.subtitle"
class="text-sm opacity-80"
>
{{ link.subtitle }}
</p>
</div>

<Layout class="w-4 h-4 opacity-0 group-hover:opacity-100"/>

</motion.button>

</div>

<!-- FOOTER -->
<div class="mt-auto pt-16 pb-8">
<p class="text-xs text-gray-400 uppercase tracking-widest">
© 2026 Dembel City Center
</p>
</div>

<!-- COPY TOAST -->
<motion.div
v-if="showCopiedToast"
:initial="{opacity:0,y:50}"
:animate="{opacity:1,y:0}"
class="fixed bottom-10 left-1/2 -translate-x-1/2 bg-blue-900 text-white px-6 py-3 rounded-full flex gap-2 items-center"
>
<Check class="w-4 h-4 text-yellow-400"/>
<span>Link copied to clipboard!</span>
</motion.div>

</div>
</template>