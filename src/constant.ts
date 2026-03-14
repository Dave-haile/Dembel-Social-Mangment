import {
    Instagram,
    Twitter,
    Youtube,
    Send,
    Globe,
    Github,
    ExternalLink
} from "lucide-vue-next"

export const ICON_MAP: Record<string, any> = {
    instagram: Instagram,
    twitter: Twitter,
    youtube: Youtube,
    telegram: Send,
    github: Github,
    web: Globe,
    default: ExternalLink
}

export const STATIC_LINKS = [
    {
        id: 1,
        title: "Facebook",
        subtitle: "Follow us for updates",
        url: "https://facebook.com",
        icon: "web",
        active: true,
        clicks: 0
    },
    {
        id: 2,
        title: "Instagram",
        subtitle: "Latest events & shops",
        url: "https://instagram.com",
        icon: "instagram",
        active: true,
        clicks: 0
    },
    {
        id: 3,
        title: "Telegram",
        subtitle: "Join our channel",
        url: "https://t.me",
        icon: "telegram",
        active: true,
        clicks: 0
    },
    {
        id: 4,
        title: "Website",
        subtitle: "Visit our official site",
        url: "https://example.com",
        icon: "web",
        active: true,
        clicks: 0
    }
]

export const STATIC_SETTINGS = {
    profile_name: "Dembel City Center",
    profile_username: "@dembelcitycenter",
    profile_image: "https://pub-f30882b481294faa997a4d11ff77ce65.r2.dev/company-logo/10932099/photo_2025-08-20_16-16-37.jpg",
    bg_color: "#ffffff",
    button_color: "#1e40af",
    text_color: "#ffffff"
}