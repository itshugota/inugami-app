// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

import { expressApp } from './App';

const PORT = process.env.PORT || 8080;

expressApp.listen(PORT, () => console.log(`Server running on port ${PORT}.`));
