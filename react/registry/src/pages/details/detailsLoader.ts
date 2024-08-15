import type { PackageDetails } from '../../api/types/packageDetail'
import type { Params } from 'react-router-dom'
import { getPackage } from '../../api/queries/getPackage'

interface LoaderArgs {
    params: Params
}

export interface DeatailsLoaderResult {
    details: PackageDetails
}

export async function detailsLoader({ params }: LoaderArgs): Promise<DeatailsLoaderResult> {
    const { name } = params;

    if (!name) {
        throw new Error('Name must be provided')
    }

    const details = await getPackage(name)    

    return {
        details
    }
}