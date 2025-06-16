import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Eepmon',
        short_name: 'Eepmon',
        description: 'Log your sleep pattern',
        start_url: '/',
        display: 'fullscreen',
        background_color: '#0d1126',
        theme_color: '#0d1126',
        lang: "En-en",
        orientation: "portrait",
        display_override: ["fullscreen", "minimal-ui", "standalone"],
    }
}