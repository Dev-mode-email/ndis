import { memo } from 'react'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectLabel, SelectSeparator, SelectGroup } from '@/core/components/ui/inputs/select'

interface ImageSelectProps {
  value?: string
  onChange: (value?: string) => void
  placeholder?: string
  isOpen?: boolean
  className?: string
  images?: Array<{ id: number; name: string; s3Url: string; image_group?: string }>
}

export const ImageSelect = memo(({ value, onChange, placeholder = "Select image", isOpen = true, className, images = [] }: ImageSelectProps) => {
  const grouped = images.reduce((acc, img) => {
    if (img.image_group === 'logos') return acc;
    const key = img.image_group || 'other'
    if (!acc[key]) acc[key] = []
    acc[key].push({ id: img.id, name: img.name, s3Url: img.s3Url })
    return acc
  }, {} as Record<string, { id: number; name: string; s3Url: string }[]>)

  const order = ['photoanswers', 'forms', 'other']

  return (
    <Select value={value || ''} onValueChange={(v) => onChange(v || undefined)}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder}>
          {(() => {
            const selected = images.find(img => img.s3Url === value)
            return selected ? (
              <div className="flex items-center gap-3 truncate">
                <img
                  src={selected.s3Url}
                  alt={selected.name}
                  className="w-[48px] h-[36px] object-cover rounded-lg border border-gray-200 bg-white"
                />
                <span className="truncate max-w-[160px]">{selected.name}</span>
              </div>
            ) : null
          })()}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {order.map((groupKey, idx) => {
          const items = grouped[groupKey] || []
          if (items.length === 0) return null
          const labels: Record<string, string> = {
            photoanswers: 'Photo Answers',
            forms: 'Forms',
            other: 'Other'
          }
          const label = labels[groupKey] || 'Other'
          return (
            <SelectGroup key={groupKey}>
              <SelectLabel>{label}</SelectLabel>
              {items.map(img => (
                <SelectItem key={img.s3Url} value={img.s3Url}>
                  <div className="flex items-center gap-3">
                    <img
                      src={img.s3Url}
                      alt={img.name}
                      className="w-[72px] h-[48px] object-cover rounded-lg border border-gray-200 bg-white"
                    />
                    <span className="truncate max-w-[200px]">{img.name}</span>
                  </div>
                </SelectItem>
              ))}
              {idx < order.length - 1 && <SelectSeparator />}
            </SelectGroup>
          )
        })}
      </SelectContent>
    </Select>
  )
})
