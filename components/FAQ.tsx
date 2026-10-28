export default function FAQ({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-brown/10 border-y border-brown/10">
      {items.map((it) => (
        <details key={it.q} className="group py-1">
          <summary className="flex cursor-pointer items-center justify-between gap-6 py-5 text-[16px] font-semibold text-brown-dark md:text-[17px]">
            {it.q}
            <span className="faq-icon grid h-8 w-8 shrink-0 place-items-center rounded-full bg-butter-pale text-xl text-brown transition-transform duration-300">+</span>
          </summary>
          <p className="pb-6 pr-12 text-[15px] leading-relaxed text-brown/75">{it.a}</p>
        </details>
      ))}
    </div>
  );
}
