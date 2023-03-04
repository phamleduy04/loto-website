FROM node:alpine as compiler

WORKDIR /home/container
COPY . .
RUN yarn install --production

FROM gcr.io/distroless/nodejs:16

WORKDIR /home/container
COPY --from=compiler /home/container ./
USER 1000
CMD ["bin/www"]