install:
	npm ci

start-frontend:
	make -C frontend start

start-backend:
	npx start-server -p 5001

deploy:
	git push heroku main

lint:
	make -C frontend lint