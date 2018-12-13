# Run this command to get certificates. Do this after the lesencrypt container is run
sudo docker run -it --rm \
      -v ~/docker-volumes/ATC/LetsencryptSite/certbot/etc/letsencrypt:/etc/letsencrypt \
      -v ~/docker-volumes/ATC/LetsencryptSite/certbot/var/lib/letsencrypt:/var/lib/letsencrypt \
      -v ~/docker-volumes/ATC/LetsencryptSite/certbot/var/log/letsencrypt:/var/log/letsencrypt \
      -v ~/docker-volumes/ATC/LetsencryptSite/html:/data/letsencrypt \
certbot/certbot \
certonly --webroot \
--email sherwyn@enqos.com --agree-tos --no-eff-email \
--webroot-path=/data/letsencrypt \
-d aroundthecorner.store -d www.aroundthecorner.store -d api.roundthecorner.store -d app.roundthecorner.store