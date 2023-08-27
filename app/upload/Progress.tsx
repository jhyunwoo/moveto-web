"use client"

export default function Progress({
  progress,
  message,
}: {
  progress: number
  message: string | undefined
}) {
  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-50 flex h-screen w-full touch-none items-center justify-center bg-slate-100/80 p-8 backdrop-blur-sm dark:bg-slate-950/80 dark:text-white">
      <div className="w-full max-w-xl rounded-xl bg-white p-4 shadow-lg dark:bg-slate-900">
        <div className="my-2 flex w-full flex-col items-end justify-center">
          <div className="mr-auto">파일 업로드 중...</div>
          <progress
            value={progress}
            max="100"
            className="w-full rounded-full [&::-moz-progress-bar]:bg-green-400 [&::-webkit-progress-bar]:rounded-full   [&::-webkit-progress-bar]:bg-slate-200 dark:[&::-webkit-progress-bar]:bg-slate-700 [&::-webkit-progress-value]:rounded-lg [&::-webkit-progress-value]:bg-green-400"
          />
          {message ? (
            <div className="text-sm font-semibold">{message}</div>
          ) : (
            <div className="text-sm">{progress}%</div>
          )}
        </div>
      </div>
    </div>
  )
}
