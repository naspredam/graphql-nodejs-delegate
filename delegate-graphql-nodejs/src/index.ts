import { preparedAppObserver } from '@core/server';

const port = 4000;
preparedAppObserver
    .subscribe(app => app.listen(port, () => console.info(`Server listening on http://localhost:${port}`)));