export function  getDependantCompanyIds(dependantCompanies:  Record<string, unknown>) {

    const result: string[] = [];
    function iterate(input: Record<string, unknown>) {
        const deps = input['dep'];
        if (Array.isArray(deps) && deps.length) {
            for (const dep of deps) {
                if (typeof dep['id'] === 'string') {
                    result.push(dep['id']);
                    iterate(dep);
                }
            }
        } else {
            return;
        }
    }

    iterate(dependantCompanies);

    return result;
}
