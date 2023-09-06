export default function CenterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center p-8 pb-24 dark:text-white sm:pb-8">
      {children}
    </div>
  )
}
