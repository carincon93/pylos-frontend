import { Loading } from '@/components/ui/loading'

export default function LoadingOverlay() {
    return (
        <div className="absolute bg-pylos-800 w-full h-[100vh] z-[99] text-white flex items-center justify-center text-4xl font-medium">
            <Loading />
        </div>
    )
}
