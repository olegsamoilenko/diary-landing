export default function HowItWorksSection() {
  return (
    <section
      className="relative h-[300px] overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/assets/images/backgrounds/how-it-work-bg.png')",
      }}
    >
      <div className="mx-auto max-w-7xl px-6 py-24">
        <h1 className="max-w-4xl text-2xl leading-tight font-semibold text-slate-700 md:text-6xl">
          How It Works Section
        </h1>
      </div>
    </section>
  )
}
