build:
	docker build --pull -t freeindex-scraper-express .

run:
	docker run -d -p 80:80 freeindex-scraper-express
