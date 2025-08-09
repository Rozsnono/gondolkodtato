import { Icon } from "@/icons/Icon";

export default function Navbar() {
    return (

        <nav className="bg-white border-b border-gray-200 px-4 py-3">

            <div className="max-w-7xl mx-auto flex items-center justify-between">

                <div className="flex items-center space-x-4">

                    <div className="flex items-center space-x-2">
                        <Icon.Brain size={36} />

                        <span className="text-2xl font-bold text-gray-900">Gondoltató
                        </span>
                    </div>
                    <div className="hidden md:flex items-center space-x-6 ml-10">
                        <button className="justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 flex items-center space-x-2">

                            <span>Home
                            </span>
                        </button>
                        <button className="justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 flex items-center space-x-2">

                            <span>Quizzes
                            </span>
                        </button>
                        <button className="justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 flex items-center space-x-2">

                            <span>Materials
                            </span>
                        </button>
                        <button className="justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 flex items-center space-x-2">

                            <span>Manage
                            </span>
                        </button>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">
                        Sign In
                    </button>
                    <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                        <span className="flex h-full w-full items-center justify-center rounded-full bg-muted">JD
                        </span>
                    </span>
                </div>
            </div>
        </nav>
    )
}