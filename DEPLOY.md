# Cập nhật web tsevending.com (deploy tay)

Web chạy trên **Cloudflare Workers**. Khi GitHub Actions còn bị khóa, dùng cách tay
dưới đây mỗi khi muốn đưa thay đổi lên `https://tsevending.com`.

## Cách deploy (1 lệnh)

1. Mở **File Explorer**, vào thư mục `d:\vba\tsevending`
2. Bấm vào **thanh địa chỉ** (chỗ hiện đường dẫn), gõ `powershell` rồi Enter
   → cửa sổ PowerShell mở sẵn đúng thư mục
3. Gõ lệnh:

   ```powershell
   ./scripts/deploy.ps1
   ```

4. Chờ ~1–2 phút. Thành công khi thấy dòng:

   ```
   Deployed tsevending triggers
   Current Version ID: xxxxxxxx-....
   ```

Xong — web đã cập nhật.

## Lệnh đó tự làm gì

- Nạp token Cloudflare từ `scripts/.env.local` (không cần gõ tay)
- Tạo WebP cho ảnh mới (`npm run images:webp`)
- Build (OpenNext + webpack) và deploy lên Cloudflare

## Kiểm tra đã lên chưa

Mở **trình duyệt ẩn danh** (Ctrl+Shift+N) vào `https://tsevending.com` để tránh cache.

## Quy trình thường gặp

- **Sửa nội dung / thêm bài** trong `src/content/blog/` → chạy `./scripts/deploy.ps1`
- **Đổi code / giao diện** → chạy `./scripts/deploy.ps1`
- Không cần commit GitHub trước; nhưng nên `git add . && git commit && git push`
  để lưu lịch sử (và để sẵn cho auto-deploy khi GitHub mở khóa Actions).

## Khi GitHub bật lại Actions

Workflow `.github/workflows/deploy.yml` đã cài sẵn: chỉ cần `git push` là Cloudflare
tự build + deploy, không cần chạy tay nữa.
