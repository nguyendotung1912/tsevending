"use client";

import { useState } from "react";

type ProductType = "vending" | "locker";
type LocationType = "factory" | "office" | "apartment" | "school" | "hospital";

interface RoiResult {
  revenuePerMonth: number;
  operatingCost: number;
  netProfit: number;
  investmentEstimate: number;
  roiMonths: number;
}

const VENDING_RATES: Record<LocationType, { txPerDay: number; avgPrice: number }> = {
  factory:   { txPerDay: 35, avgPrice: 14000 },
  office:    { txPerDay: 22, avgPrice: 17000 },
  apartment: { txPerDay: 15, avgPrice: 13000 },
  school:    { txPerDay: 28, avgPrice: 12000 },
  hospital:  { txPerDay: 18, avgPrice: 16000 },
};

const VENDING_MACHINE_PRICE: Record<LocationType, number> = {
  factory:   85_000_000,
  office:    90_000_000,
  apartment: 70_000_000,
  school:    75_000_000,
  hospital:  100_000_000,
};

const LOCKER_RATES: Record<LocationType, { usesPerCellPerMonth: number; feePerUse: number }> = {
  factory:   { usesPerCellPerMonth: 12, feePerUse: 5000 },
  office:    { usesPerCellPerMonth: 8,  feePerUse: 0    },
  apartment: { usesPerCellPerMonth: 18, feePerUse: 0    },
  school:    { usesPerCellPerMonth: 10, feePerUse: 3000 },
  hospital:  { usesPerCellPerMonth: 6,  feePerUse: 0    },
};

const LOCKER_CELL_PRICE = 2_500_000;

const LOCATION_LABELS: Record<LocationType, string> = {
  factory:   "Khu công nghiệp / Nhà máy",
  office:    "Tòa nhà văn phòng",
  apartment: "Chung cư",
  school:    "Trường học / Đại học",
  hospital:  "Bệnh viện / Y tế",
};

function fmt(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)} triệu`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)} nghìn`;
  return `${n.toLocaleString("vi-VN")}`;
}

function calcVending(machines: number, location: LocationType): RoiResult {
  const { txPerDay, avgPrice } = VENDING_RATES[location];
  const revenuePerMonth = machines * txPerDay * avgPrice * 30;
  const operatingCost = machines * (avgPrice * txPerDay * 30 * 0.6); // 60% is COGS
  const netProfit = revenuePerMonth - operatingCost;
  const investmentEstimate = machines * VENDING_MACHINE_PRICE[location];
  const roiMonths = netProfit > 0 ? Math.ceil(investmentEstimate / netProfit) : 0;
  return { revenuePerMonth, operatingCost, netProfit, investmentEstimate, roiMonths };
}

function calcLocker(cells: number, location: LocationType): RoiResult {
  const { usesPerCellPerMonth, feePerUse } = LOCKER_RATES[location];
  const revenuePerMonth = cells * usesPerCellPerMonth * feePerUse;
  const operatingCost = 500_000; // fixed monthly software/maintenance fee
  const netProfit = revenuePerMonth - operatingCost;
  const investmentEstimate = cells * LOCKER_CELL_PRICE + 10_000_000; // hardware + software
  const roiMonths = netProfit > 0 ? Math.ceil(investmentEstimate / netProfit) : 0;
  return { revenuePerMonth, operatingCost, netProfit, investmentEstimate, roiMonths };
}

export default function RoiCalculator() {
  const [type, setType] = useState<ProductType>("vending");
  const [location, setLocation] = useState<LocationType>("factory");
  const [quantity, setQuantity] = useState(3);

  const result = type === "vending"
    ? calcVending(quantity, location)
    : calcLocker(quantity, location);

  const isLockerNoFee = type === "locker" && LOCKER_RATES[location].feePerUse === 0;

  return (
    <div id="roi-calculator" className="scroll-mt-20 rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="border-b border-slate-100 bg-slate-50 px-4 py-4 sm:px-6 sm:py-5">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-600">
          Công cụ tính toán
        </p>
        <h2 className="mt-1 text-xl font-extrabold text-slate-900">
          Ước tính ROI — Doanh thu & Hoàn vốn
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Nhập thông số của bạn để xem ước tính doanh thu và thời gian hoàn vốn.
        </p>
      </div>

      <div className="grid gap-5 p-4 sm:gap-6 sm:p-6 lg:grid-cols-2">
        {/* Inputs */}
        <div className="space-y-5">
          {/* Product type */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Loại sản phẩm
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(["vending", "locker"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                    type === t
                      ? "border-brand-500 bg-brand-50 text-brand-700"
                      : "border-slate-200 text-slate-600 hover:border-slate-300"
                  }`}
                >
                  {t === "vending" ? "🥤 Máy bán hàng tự động" : "🔐 Tủ locker thông minh"}
                </button>
              ))}
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Loại vị trí
            </label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value as LocationType)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 focus:border-brand-400 focus:outline-none focus:ring-1 focus:ring-brand-300"
            >
              {Object.entries(LOCATION_LABELS).map(([k, v]) => (
                <option key={k} value={k}>{v}</option>
              ))}
            </select>
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              {type === "vending"
                ? `Số lượng máy: ${quantity} máy`
                : `Số ô tủ: ${quantity} ô`}
            </label>
            <input
              type="range"
              min={type === "vending" ? 1 : 10}
              max={type === "vending" ? 20 : 100}
              step={type === "vending" ? 1 : 5}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full accent-brand-600"
            />
            <div className="mt-1 flex justify-between text-xs text-slate-400">
              <span>{type === "vending" ? "1 máy" : "10 ô"}</span>
              <span>{type === "vending" ? "20 máy" : "100 ô"}</span>
            </div>
          </div>

          {/* Disclaimer */}
          <p className="text-xs text-slate-400 leading-relaxed">
            * Ước tính dựa trên số liệu trung bình từ các công trình TSE Vending đã triển
            khai. Kết quả thực tế phụ thuộc vào vị trí, loại sản phẩm, giá bán và hiệu
            suất vận hành thực tế.
          </p>
        </div>

        {/* Results */}
        <div className="rounded-2xl bg-slate-900 p-4 sm:p-6 text-white">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-4">
            Kết quả ước tính / tháng
          </p>

          {isLockerNoFee ? (
            <div className="rounded-xl bg-white/10 p-4 text-sm text-slate-300 leading-relaxed">
              Tủ locker tại <strong className="text-white">{LOCATION_LABELS[location]}</strong> thường
              triển khai <strong className="text-white">miễn phí cho người dùng</strong> như một tiện
              ích dịch vụ (không thu phí gửi đồ). Giá trị mang lại là nâng cao trải nghiệm và giảm
              tải cho nhân viên — không phải doanh thu trực tiếp.
              <br /><br />
              Liên hệ TSE Vending để tính toán ROI theo mô hình hợp tác chia sẻ doanh thu hoặc gói
              thuê dịch vụ phù hợp.
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-end border-b border-white/10 pb-4">
                <div>
                  <p className="text-xs text-slate-400">Doanh thu dự kiến</p>
                  <p className="text-2xl font-extrabold text-white">
                    {fmt(result.revenuePerMonth)} VND
                  </p>
                </div>
                <span className="text-xs text-slate-400">/tháng</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-white/[0.06] p-3">
                  <p className="text-xs text-slate-400">Chi phí hàng hóa/vận hành</p>
                  <p className="mt-1 text-base font-bold text-slate-200">
                    {fmt(result.operatingCost)} VND
                  </p>
                </div>
                <div className="rounded-xl bg-white/[0.06] p-3">
                  <p className="text-xs text-slate-400">Lợi nhuận gộp</p>
                  <p className={`mt-1 text-base font-bold ${result.netProfit > 0 ? "text-emerald-400" : "text-rose-400"}`}>
                    {fmt(result.netProfit)} VND
                  </p>
                </div>
              </div>

              <div className="rounded-xl bg-white/[0.06] p-3">
                <p className="text-xs text-slate-400">Vốn đầu tư ước tính</p>
                <p className="mt-1 text-base font-bold text-slate-200">
                  {fmt(result.investmentEstimate)} VND
                </p>
              </div>

              {result.roiMonths > 0 ? (
                <div className="rounded-xl border border-brand-500/50 bg-brand-600/20 p-4 text-center">
                  <p className="text-xs text-brand-300 mb-1">Thời gian hoàn vốn ước tính</p>
                  <p className="text-3xl font-extrabold text-brand-300">
                    {result.roiMonths} tháng
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    (~{Math.ceil(result.roiMonths / 12)} năm)
                  </p>
                </div>
              ) : (
                <div className="rounded-xl bg-white/10 p-4 text-center text-sm text-slate-300">
                  Cần thêm thông tin để tính ROI — liên hệ TSE Vending.
                </div>
              )}
            </div>
          )}

          <a
            href="tel:0837375757"
            className="mt-5 block w-full rounded-xl bg-brand-600 px-4 py-3 text-center text-sm font-bold text-white transition hover:bg-brand-500"
          >
            Tư vấn chi tiết — Gọi 08.3737.5757
          </a>
        </div>
      </div>
    </div>
  );
}
