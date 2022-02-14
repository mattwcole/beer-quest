# Beer Quest

Demo .NET 5 API with React static front end that displays a list of pubs in Leeds.

## Running

Apps may be run natively or in production mode with Docker.

### Docker

Run `docker-compose up` from the root of the repository. Browse the web app at http://localhost:8080. The API has a single endpoint at http://localhost:8081/pubs.

### API

Requires .NET 5 SDK. Navigate to the `api` directory and run commands as required.

- `dotnet run -p BeerQuestApi` - run API
- `dotnet test` - run integration tests

Minimal API with source in a single file. Example integration tests spin up the API in memory. Test data currently coupled to csv file used by the API.

Libraries/tools:

- CsvHelper

### Web

Requires NodeJS 16. Navigate to the `web` directory and run npm scripts as required.

- `npm install` - install deps
- `npm run start` - run app in dev mode
- `npm run test` - run jest tests
- `npm run build` - build production bundle

Simply fetches list of pubs and renders entire list with text filter. Images are lazy loaded and fetched as they scroll into view. Minimal test example includes testing user interaction. Libraries/tools:

- Create React App
- React Bootstrap
- React Lazyload
- Axios
- NGINX - hosts the static site in Docker
