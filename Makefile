install:
	npm ci

start-frontend:
	make -C frontend start

start-backend:
	npx start-server -p 5001

lint:
	npx eslint .
