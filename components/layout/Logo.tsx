import * as React from "react"
import { Terminal } from "lucide-react"

const Logo = () => {

  return (
    <div className="flex items-center w-fit px-1.5 gap-x-2 pb-2">
      <div className="flex aspect-square size-5 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
        <Terminal className="size-4" />
      </div>
      <span className="truncate font-semibold text-lg">Snipz</span>
    </div>
  )
}

export default Logo;
