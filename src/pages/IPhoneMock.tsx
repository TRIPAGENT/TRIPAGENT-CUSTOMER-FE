import type { PhoneData } from "../types/iphone-mock";

// Shared WhatsApp-mockup widget for how-it-works.html and how-we-work.html
// (2 instances per page). Markup mirrors the source 1:1 — .iphone/.screen/
// .app/.wa-body/.bub/.optcard classes are all global (site.css), no
// page-scoped CSS needed here.
export default function IPhoneMock({ phone }: { phone: PhoneData }) {
  return (
    <div className="iphone">
      <div className="island" />
      <div className="screen">
        <div className="statusbar">
          <span>{phone.time}</span>
          <span>
            ● ● ● &nbsp;5G&nbsp; ▮
          </span>
        </div>
        <div className="app">
          <div className="wa-top">
            <div className="wa-av">T</div>
            <div className="wa-id">
              <div className="nm">
                {phone.headerName} <span className="tick">✓</span>
              </div>
              <div className="st">{phone.headerStatus}</div>
            </div>
          </div>
          <div className="wa-body">
            {phone.messages.map((m, i) => {
              if (m.type === "out") {
                return (
                  <div className="bub out" style={m.faded ? { opacity: 0.92 } : undefined} key={i}>
                    {m.text}
                  </div>
                );
              }
              if (m.type === "in") {
                return (
                  <div className="bub in" key={i}>
                    <div className={`who ${m.whoKind}`}>
                      {m.whoAvatar && <span className="av">{m.whoAvatar}</span>}
                      {m.whoLabel}
                    </div>
                    {m.text}
                  </div>
                );
              }
              return (
                <div className="optcard" key={i}>
                  <div className="oh">{m.heading}</div>
                  {m.rows.map((r, j) => (
                    <div className="optrow" key={j}>
                      <span className="ot">{r.label}</span>
                      <span className="op">{r.value}</span>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
        <div className="homebar" />
      </div>
    </div>
  );
}
