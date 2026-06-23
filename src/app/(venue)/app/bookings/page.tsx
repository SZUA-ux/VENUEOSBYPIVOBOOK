import Link from "next/link";

const bookingRows = [
  { id: "bk-2031", ref: "BK-2031", title: "Khan Wedding", status: "Confirmed" },
  { id: "bk-2038", ref: "BK-2038", title: "Corporate Gala", status: "Quote Sent" },
];

export default function VenueBookingsPage() {
  return (
    <section>
      <h1 className="text-3xl font-semibold tracking-tight">Bookings</h1>
      <p className="muted mt-2">
        Manage enquiries, provisional holds, confirmations and event-day handover.
      </p>
      <div className="card mt-6 overflow-x-auto">
        <table className="w-full min-w-[560px] text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-left text-slate-600">
            <tr>
              <th className="p-3">Reference</th>
              <th className="p-3">Title</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookingRows.map((row) => (
              <tr key={row.id} className="border-b border-slate-100">
                <td className="p-3">
                  <Link href={`/app/bookings/${row.id}`} className="font-medium text-teal-700">
                    {row.ref}
                  </Link>
                </td>
                <td className="p-3">{row.title}</td>
                <td className="p-3">{row.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
