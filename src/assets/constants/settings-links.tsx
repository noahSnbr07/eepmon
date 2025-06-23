import { Clock, Mail, Settings2, User } from "lucide-react";

interface SettingsEntry {
    id: number;
    icon: React.JSX.Element;
    name: string;
    href: string;
}

const settingsEntries: SettingsEntry[] = [
    { id: 0, icon: <User />, href: "account", name: "Account" },
    { id: 1, icon: <Settings2 />, href: "preferences", name: "Preferences" },
    { id: 2, icon: <Clock />, href: "monitor", name: "My Monitor" },
    { id: 3, icon: <Mail />, href: "contact", name: "Contact" },
];

export { type SettingsEntry, settingsEntries }