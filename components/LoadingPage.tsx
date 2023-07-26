import { Cog6ToothIcon } from "@heroicons/react/24/outline"

export default function LoadingPage() {
  return (
    <div
      className={`fixed bottom-0 left-0 right-0 top-0 z-40 flex h-screen w-full touch-none items-center justify-center bg-slate-100/60 `}
    >
      <Cog6ToothIcon className='h-12 w-12 animate-spin text-slate-600' />
    </div>
  )
}
