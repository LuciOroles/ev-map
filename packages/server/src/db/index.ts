import { Sequelize } from "sequelize";
import path from "path";
export *  from "./controllers";

export function createDbInstance() {
    const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: path.resolve('../../database/ev.db'),
    });

    return sequelize;
}

export const getDbInstance = (() => {
    let instance: Sequelize; 

    return () => {
        if (instance) {
            return instance;
        } else {
            instance = createDbInstance();
            return instance;
        }
    }
})();


 