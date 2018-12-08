FROM certbot/certbot

WORKDIR /data/letsencrypt

RUN certbot certonly --webroot \
    --register-unsafely-without-email --agree-tos \
    --webroot-path=/data/letsencrypt \
    --staging \
    -d aroundthecorner.store