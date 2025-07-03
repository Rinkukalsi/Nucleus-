"use client"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <main className="container mx-auto p-6">
        <div className="grid grid-cols-3 gap-6">
          {children}
        </div>
      </main>
    </div>
  )
}