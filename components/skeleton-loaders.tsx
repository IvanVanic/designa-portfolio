import { Card, CardContent } from "@/components/ui/card"

export function GallerySkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} className="overflow-hidden border-0 shadow-lg bg-white">
          <CardContent className="p-0">
            <div className="relative">
              <div className="w-full h-64 bg-gradient-to-r from-[#E7E5DF] via-[#D3D0CB] to-[#E7E5DF] animate-pulse bg-[length:200%_100%] animate-shimmer" />
            </div>
            <div className="p-6">
              <div className="w-20 h-5 bg-gradient-to-r from-[#E7E5DF] via-[#D3D0CB] to-[#E7E5DF] rounded animate-pulse bg-[length:200%_100%] animate-shimmer mb-2" />
              <div className="w-32 h-6 bg-gradient-to-r from-[#E7E5DF] via-[#D3D0CB] to-[#E7E5DF] rounded animate-pulse bg-[length:200%_100%] animate-shimmer" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export function PageLoader() {
  return (
    <div className="fixed inset-0 bg-[#E7E5DF] z-50 flex items-center justify-center">
      <div className="text-center">
        <div className="text-4xl font-bold tracking-[0.2em] text-[#393E41] mb-4 animate-pulse">DESIGNA</div>
        <div className="w-16 h-1 bg-gradient-to-r from-[#393E41] to-[#44BBA4] rounded-full mx-auto animate-pulse" />
      </div>
    </div>
  )
}

export function ContactFormSkeleton() {
  return (
    <div className="space-y-6">
      <div>
        <div className="w-12 h-4 bg-gradient-to-r from-[#E7E5DF] via-[#D3D0CB] to-[#E7E5DF] rounded animate-pulse bg-[length:200%_100%] animate-shimmer mb-2" />
        <div className="w-full h-12 bg-gradient-to-r from-[#E7E5DF] via-[#D3D0CB] to-[#E7E5DF] rounded animate-pulse bg-[length:200%_100%] animate-shimmer" />
      </div>
      <div>
        <div className="w-16 h-4 bg-gradient-to-r from-[#E7E5DF] via-[#D3D0CB] to-[#E7E5DF] rounded animate-pulse bg-[length:200%_100%] animate-shimmer mb-2" />
        <div className="w-full h-12 bg-gradient-to-r from-[#E7E5DF] via-[#D3D0CB] to-[#E7E5DF] rounded animate-pulse bg-[length:200%_100%] animate-shimmer" />
      </div>
      <div>
        <div className="w-20 h-4 bg-gradient-to-r from-[#E7E5DF] via-[#D3D0CB] to-[#E7E5DF] rounded animate-pulse bg-[length:200%_100%] animate-shimmer mb-2" />
        <div className="w-full h-32 bg-gradient-to-r from-[#E7E5DF] via-[#D3D0CB] to-[#E7E5DF] rounded animate-pulse bg-[length:200%_100%] animate-shimmer" />
      </div>
      <div className="w-full h-12 bg-gradient-to-r from-[#E7E5DF] via-[#D3D0CB] to-[#E7E5DF] rounded animate-pulse bg-[length:200%_100%] animate-shimmer" />
    </div>
  )
}
