import React from 'react'
import { Skeleton } from '../ui/skeleton'

export default function SkeletonLoader() {
  return (
    <div>
      <Skeleton className="h-[20px] w-[100px] rounded-full bg-red-500" />
    </div>
  )
}
