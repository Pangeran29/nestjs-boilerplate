FROM node:22-alpine

WORKDIR /app

# Install Chromium and its dependencies
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    freetype-dev \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    nodejs \
    yarn \
    openssl

# Create a non-root user
RUN addgroup -S appuser && adduser -S -g appuser appuser \
    && mkdir -p /home/appuser/Downloads \
    && chown -R appuser:appuser /home/appuser \
    && chown -R appuser:appuser /app

# Set environment variables for Puppeteer
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Copy project files
COPY package*.json ./
COPY prisma ./prisma/
COPY tsconfig.json ./
COPY . .
COPY .env ./.env

# Install dependencies
RUN npm install

# Generate Prisma client
RUN npx prisma generate

# Change ownership of the app directory
RUN chown -R appuser:appuser /app

# Switch to non-root user
USER appuser

EXPOSE 3000

CMD npm start