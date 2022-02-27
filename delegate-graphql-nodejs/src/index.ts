import { preparedAppObserver } from '@core/server';

const port = process.env.PORT || 4000;
const remoteGraphQL = process.env.REMOTE_GRAPHQL || 'http://localhost:3000/graphql';

preparedAppObserver(remoteGraphQL)
    .subscribe(app => app.listen(port, () => console.info(`Server listening on http://localhost:${port}`)));