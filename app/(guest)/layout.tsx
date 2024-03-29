export default function AuthLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {
    return <main className="flex min-h-screen flex-col justify-between items-center pb-22 px-4 lg:px-0 fondo z-[1]">{children}</main>
}
