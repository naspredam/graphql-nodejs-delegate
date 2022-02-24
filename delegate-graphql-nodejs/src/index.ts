import { preparedAppObserver } from '@core/server';

const port = 4000;
const remoteGraphQL = 'http://localhost:3000/graphql';

preparedAppObserver(remoteGraphQL)
    .subscribe(app => app.listen(port, () => console.info(`Server listening on http://localhost:${port}`)));