build:
	cp -R lib src
	node_modules/.bin/babel src --out-dir lib

unbuild:
	rm -rf lib
	mv src lib

publish:
	make build
	npm publish .
	make unbuild
