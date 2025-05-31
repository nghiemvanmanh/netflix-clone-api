FROM node:lts-alpine

# Thiết lập môi trường
ENV NODE_ENV=production
# Tạo thư mục làm việc
WORKDIR /usr/src/app

# Copy file cấu hình trước
COPY ["package.json", "package-lock.json*", "./"]

# Xoá cache và cài đặt lại gói
RUN npm ci --force

RUN npm i --force
# Copy toàn bộ mã nguồn
COPY . .

# Build NestJS (nếu bạn dùng TypeScript và chưa build sẵn)
RUN npm run build
# Expose cổng cho app chạy
EXPOSE 5000

# Phân quyền cho user node
RUN chown -R node /usr/src/app
USER node

# # Chạy app
# CMD ["npm", "start"]
# Chạy app đã build
CMD ["node", "dist/main"]
