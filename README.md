# FreeIndex Scraper

This project scrapes the review count from [FreeIndex](https://www.freeindex.co.uk/).

```
GET {base_url}/freeindex/{profile}
```

# Deployment

Docker is used to ensure this project can be built and run in any environment.

I opted to deploy this project using a Digital Ocean Droplet - a cheap VPS. I originally tried to deploy this using AWS Lambda, but the public IP addresses have been blacklisted by FreeIndex.

1. [Configure Docker](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-22-04)

2. Install `make`

   ```
   apt install make
   ```

3. Clone this repo using HTTPS

   ```
   git clone https://github.com/joe4576/freeindex-scraper-express.git
   ```

4. Build the Docker image

   ```
   make build
   ```

5. Spin up a Docker container
   ```
   make run
   ```

## Updates

1. Kill all running containers

   ```
   docker kill $(docker ps -a -q)
   ```

2. Pull the most recent changes

   ```
   git pull
   ```

3. Build a new Docker image

   ```
   make build
   ```

4. Spin up a Docker container
   ```
   make run
   ```

# HTTPS Configuration

Follow the guides on DigitalOcean to set up Nginx:

- [Initial Server Setup with Ubuntu](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu)
- [Install Nginx on Ubuntu](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-22-04)
- [Set up SSL with Let's Encrypt](https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-22-04)

Once setup, modify Nginx config to proxy requests to the docker container:

```
sudo vim /etc/nginx/sites-available/domain.com
```

```
location / {
   proxy_pass http://localhost:3000;
   proxy_set_header Host $host;
   proxy_set_header X-Real-IP $remote_addr;
   proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
   proxy_set_header X-Forwarded-Proto $scheme;
}
```

Check for syntax errors:

```
sudo nginx -t
```

Restart Nginx:

```
sudo systemctl reload nginx
```
