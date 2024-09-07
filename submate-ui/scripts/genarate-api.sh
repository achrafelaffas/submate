SWAGGER_FILE=http://localhost:8080/api/v1/v3/api-docs
npx @openapitools/openapi-generator-cli generate -i $SWAGGER_FILE -g typescript-axios -o ./src/api