import { Loading } from '@/components/ui/loading'

interface Props {
    className?: string
}

export default function LoadingOverlay({ className }: Props) {
    return (
        <div className={`${className} absolute left-0 top-0 right-0 w-full h-[100vh] z-[9999] text-white flex items-center justify-center text-4xl font-medium`}>
            <Loading />
        </div>
    )
}
