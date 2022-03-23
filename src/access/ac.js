import { AccessControl } from 'accesscontrol';

// Import Own Modules
import * as roles     from "./roles";
import * as resources from "./resources";

const ac = new AccessControl();

ac
    .grant(roles.ADMIN)
        .create(resources.FLIGHTS)
        .delete(resources.FLIGHTS)

    .lock();

export default ac;
