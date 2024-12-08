build:
	npx tsm index.ts

watch:
	npx nodemon --exec yarn build -e ts
