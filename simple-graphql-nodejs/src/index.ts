import { prepareApp } from '@core/server';

const port = 3000;
prepareApp()
    .listen(port,
        () => console.info(`Server listening on http://localhost:${port}`));
