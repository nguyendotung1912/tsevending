import type { SubCategory } from "@/content/categories";

const tierStyles: Record<SubCategory["investmentTier"], string> = {
  "Thấp": "bg-emerald-100 text-emerald-700",
  "Trung bình": "bg-amber-100 text-amber-700",
  "Cao": "bg-rose-100 text-rose-700",
};

export default function ComparisonTable({ subcategories }: { subcategories: SubCategory[] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead className="bg-slate-50 text-slate-700">
          <tr>
            <th className="px-4 py-3 font-bold">Dòng sản phẩm</th>
            <th className="px-4 py-3 font-bold">Phù hợp nhất với</th>
            <th className="px-4 py-3 font-bold">Tính năng nổi bật</th>
            <th className="px-4 py-3 font-bold">Mức đầu tư tham khảo</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {subcategories.map((sub) => (
            <tr key={sub.slug}>
              <td className="px-4 py-3 font-semibold text-slate-900">
                <span className="mr-2">{sub.icon}</span>
                {sub.shortTitle}
              </td>
              <td className="px-4 py-3 text-slate-600">{sub.idealFor}</td>
              <td className="px-4 py-3 text-slate-600">{sub.features[0]}</td>
              <td className="px-4 py-3">
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${tierStyles[sub.investmentTier]}`}>
                  {sub.investmentTier}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
