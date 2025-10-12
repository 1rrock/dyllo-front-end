import * as React from "react"

import { cn } from "@/shared/lib/utils"

// Auth Card variant (for login/signup pages)
function Card({ className, variant, ...props }: React.ComponentProps<"div"> & { variant?: "default" | "auth" }) {
  return (
    <div
      data-slot="card"
      className={cn(
        variant === "auth"
          ? "overflow-hidden rounded-3xl shadow-none md:shadow-[0_20px_60px_rgba(0,0,0,0.3)] animate-[slideUp_0.5s_ease]"
          : "bg-card text-card-foreground flex flex-col gap-6 rounded-xl py-6 shadow-sm",
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, variant, ...props }: React.ComponentProps<"div"> & { variant?: "default" | "auth" }) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        variant === "auth"
          ? "bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white text-center py-10 px-8"
          : "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, variant, ...props }: React.ComponentProps<"div"> & { variant?: "default" | "auth" }) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        variant === "auth"
          ? "text-4xl font-extrabold tracking-tight mb-2"
          : "leading-none font-semibold",
        className
      )}
      {...props}
    />
  )
}

function CardDescription({ className, variant, ...props }: React.ComponentProps<"div"> & { variant?: "default" | "auth" }) {
  return (
    <div
      data-slot="card-description"
      className={cn(
        variant === "auth"
          ? "text-white/90 text-sm font-medium"
          : "text-muted-foreground text-sm",
        className
      )}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, variant, ...props }: React.ComponentProps<"div"> & { variant?: "default" | "auth" }) {
  return (
    <div
      data-slot="card-content"
      className={cn(
        variant === "auth" ? "py-10 px-8" : "px-6",
        className
      )}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
