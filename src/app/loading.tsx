import { Icon } from "@/icons/Icon";

export default function Loading() {
    return (
        <main className="w-screen h-screen bg-black/30 flex items-center justify-center fixed top-0 left-0">
            <Icon.Loader size={96} className="animate-spin"/>
        </main>
    )
}