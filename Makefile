all:
	browserify src/main.ts -p [ tsify --noImplicitAny ] > dist/bundle.js