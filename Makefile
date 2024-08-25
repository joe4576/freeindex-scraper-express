build:
	docker build --pull -t freeindex-scraper-express .

run:
	docker run -d -p 3000:3000 freeindex-scraper-express
