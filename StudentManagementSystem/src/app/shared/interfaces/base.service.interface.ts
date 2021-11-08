export interface BaseServiceInterface {
    /**
     * get paged records
     */
    getPaged(credentials: any): any;

    /**
     * get all records
     */
    getAll(credentials: any): any;

    /**
     * get selected record
     */
    get(credentials: any): any;

    /**
     * save record
     */
    save(credentials: any): void;

    /**
     * update record
     */
    update(credentials: any): void;

    /**
     * delete selected records from database
     */
    delete(credentials: any): void;

    /**
     * delete all records from database
     */
    deleteAll(credentials: any): void;
}