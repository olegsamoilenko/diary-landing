type AdminPageHeaderProps = {
  section: string
  title: string
}

export default function AdminPageHeader({
  section,
  title,
}: AdminPageHeaderProps) {
  return (
    <header className="border-border border-b pb-7">
      <p className="text-muted-foreground mb-2 text-xs font-medium">
        {section}
      </p>
      <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
    </header>
  )
}
