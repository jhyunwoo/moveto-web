import { ReactNode } from "react"

export default function PopUpLayout({ children }: { children: ReactNode }) {
  return (
    <div className='fixed bottom-0 left-0 right-0 top-0 z-50 flex h-screen w-full touch-none items-center justify-center bg-slate-100/70 p-8 dark:bg-slate-900/70'>
      {children}
    </div>
  )
}
