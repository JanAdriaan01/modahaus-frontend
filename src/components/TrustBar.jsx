import React from 'react';

function TrustBar() {
  const items = [
    { title: "SANS-aligned", text: "Glazing & wind load checks inline with local standards." },
    { title: "Site-measured", text: "We verify openings before fabrication." },
    { title: "Warranty-backed", text: "Finish & workmanship warranties available." },
    { title: "Nationwide", text: "Install teams across major metros." },
  ];
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((x, i) => (
        <div key={i} className="rounded-2xl border border-zinc-200 p-4 bg-white">
          <div className="font-semibold">{x.title}</div>
          <div className="text-sm text-zinc-600">{x.text}</div>
        </div>
      ))}
    </div>
  );
}

export default TrustBar;