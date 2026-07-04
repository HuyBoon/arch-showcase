FROM node:20-alpine

WORKDIR /app

# Copy package lists
COPY package*.json ./

# Install packages
RUN npm install

# Copy all source files
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build the NestJS app
RUN npm run build

EXPOSE 3000

# Start command overridden in docker-compose.yml for migrations and seeding
CMD ["node", "dist/main"]
