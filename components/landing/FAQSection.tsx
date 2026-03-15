export default function FAQSection() {
  return (
    <section
      className="relative h-[300px] overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/assets/images/backgrounds/faq-bg.png')",
      }}
    >
      <div className="mx-auto max-w-7xl px-6 py-24">
        <h1 className="max-w-4xl text-2xl leading-tight font-semibold text-slate-700 md:text-6xl">
          FAQ Section
        </h1>
      </div>
    </section>
  )
}
