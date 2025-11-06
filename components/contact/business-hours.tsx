"use client"

interface BusinessHoursProps {
  title: string
  hours: string | Array<{ day: string; time: string }>
}

export function BusinessHours({ title, hours }: BusinessHoursProps) {
  const isString = typeof hours === "string"

  return (
    <div className="rounded-lg border border-border bg-card/50 p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">{title}</h3>
      <div className="space-y-2 text-foreground/70">
        {isString ? (
          <p>{hours}</p>
        ) : (
          Array.isArray(hours) &&
          hours.map((item, idx) => (
            <div key={idx} className="flex justify-between">
              <span>{item.day}:</span>
              <span>{item.time}</span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
