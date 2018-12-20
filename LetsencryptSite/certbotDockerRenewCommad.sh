# Run this command to renew certificates
sudo docker run -it --rm \
      -v ~/docker-volumes/ATC/LetsencryptSite/certbot/etc/letsencrypt:/etc/letsencrypt \
      -v ~/docker-volumes/ATC/LetsencryptSite/certbot/var/lib/letsencrypt:/var/lib/letsencrypt \
      -v ~/docker-volumes/ATC/LetsencryptSite/certbot/var/log/letsencrypt:/var/log/letsencrypt \
      -v ~/docker-volumes/ATC/LetsencryptSite/html:/data/letsencrypt \
certbot/certbot \
renew --webroot \
--webroot-path=/data/letsencrypt \
--quiet