yarn typeorm migration:run -d src/data-source.ts
yarn test
yarn typeorm schema:drop -d src/data-source.ts