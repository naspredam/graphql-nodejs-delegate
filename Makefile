build-images:
	sh ./build-images.sh

start: build-images
	docker-compose up -d

down:
	docker-compose down