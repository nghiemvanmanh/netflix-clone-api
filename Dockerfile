# Sử dụng image node LTS với Alpine
FROM node:lts-alpine

# Thiết lập thư mục làm việc
WORKDIR /usr/src/app

# Copy file cấu hình
COPY package.json package-lock.json* ./

# Cài đặt tất cả dependencies (bao gồm devDependencies) để build
RUN npm ci --force

# Copy mã nguồn
COPY . .

# Build ứng dụng
RUN npm run build

# Xóa devDependencies để tối ưu container
RUN npm ci --production --force
# Kiểm tra thư mục dist
RUN ls -la dist || exit 1
RUN ls -la dist/src/main.js || exit 1

# Expose cổng
EXPOSE 5000

# Phân quyền
RUN chown -R node:node /usr/src/app
USER node

# Chạy ứng dụng
CMD ["node", "dist/src/main.js"]