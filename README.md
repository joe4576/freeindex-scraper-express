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

# Updates

1. Get the container ID

   ```
   docker ps
   ```

2. Kill the Docker container

   ```
   docker kill {container ID}
   ```

3. Pull the most recent changes

   ```
   git pull
   ```

4. Build a new Docker image

   ```
   make build
   ```

5. Spin up a Docker container
   ```
   make run
   ```
