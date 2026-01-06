# 🛍️ XÂY DỰNG WEBSITE BÁN HÀNG UTESHOP

## 👥 Thành viên nhóm
- Trần Xuân Bảo - 22110113
- Bùi Bảo Châu - 22110114
- Nguyễn Ngô Ngọc Vân - 22110265


---

## 🧰 Công nghệ & Công cụ

| Phần | Công nghệ |
|------|-----------|
| Frontend người dùng | Next.js + React + TypeScript + Tailwind CSS |
| Frontend admin | ReactJS + NestJS + TypeScript + Tailwind CSS |
| Backend người dùng | ExpressJS + Node.js + TypeScript |
| Backend admin | NestJS + Node.js + TypeScript |
| Database | MongoDB |
| Công cụ phát triển | VSCode, MongoDB Compass, Postman, Git |

---

## 📁 Cấu trúc dự án

### Admin

admin/
├─ admin-nestjs/ # Backend admin (NestJS)
│ ├─ src/
│ │ ├─ admins/ # Module quản lý admin
│ │ ├─ auth/ # Xác thực admin
│ │ ├─ common/interceptors/
│ │ ├─ dashboard/
│ │ ├─ filters/
│ │ ├─ genres/
│ │ ├─ orders/
│ │ ├─ products/
│ │ ├─ users/
│ │ ├─ app.controller.ts
│ │ ├─ app.module.ts
│ │ ├─ app.service.ts
│ │ └─ main.ts
│ ├─ test/
│ ├─ package.json
│ ├─ tsconfig.json
│ └─ README.md
├─ admin-reactjs/ # Frontend admin (React + Vite)
│ ├─ public/
│ ├─ src/
│ │ ├─ api/
│ │ ├─ assets/
│ │ ├─ auth/
│ │ ├─ components/ui/
│ │ ├─ layout/
│ │ ├─ pages/
│ │ ├─ routes/
│ │ ├─ services/
│ │ ├─ types/
│ │ ├─ utils/
│ │ ├─ App.tsx
│ │ ├─ index.css
│ │ └─ main.tsx
│ ├─ package.json
│ ├─ tailwind.config.js
│ ├─ vite.config.ts
│ └─ README.md


### User

user/
├─ uteshop-nextjs/ # Frontend user (Next.js)
│ ├─ app/ # App router
│ ├─ components/
│ ├─ hooks/
│ ├─ public/
│ ├─ services/
│ ├─ types/
│ ├─ utils/
│ ├─ layout.tsx
│ ├─ globals.css
│ └─ README.md
├─ uteshop-nodejs/ # Backend API (ExpressJS)
│ ├─ src/
│ │ ├─ config/
│ │ ├─ controllers/
│ │ ├─ middlewares/
│ │ ├─ models/
│ │ ├─ routes/
│ │ ├─ services/
│ │ └─ utils/
│ ├─ uploads/
│ ├─ server.js
│ ├─ package.json
│ └─ README.md


---

## ⚙️ Yêu cầu môi trường

- Node.js >= 16  
- NPM hoặc Yarn  
- MongoDB (local hoặc Atlas)  
- VSCode (hoặc IDE khác)  
- Postman / Insomnia (tuỳ chọn để test API)  

---

## 💻 Cài đặt & chạy dự án

###  Frontend người dùng (Next.js)
cd user/uteshop-nextjs
cp .env.example .env
npm install
npm run dev

###  Backend người dùng (Node.js)
cd user/uteshop-nodejs
cp .env.example .env
npm install
npm run dev

###  Frontend admin (React.js + Vite)
cd admin/admin-reactjs
cp .env.example .env
npm install
npm run dev

###  Backend admin (Nest.js)

cd admin/admin-nestjs
cp .env.example .env
npm install
npm run start:dev
