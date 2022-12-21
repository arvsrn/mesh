// Generating and parsing blob data

import type { Gradient } from './types';

export namespace BlobDataFrom {
    export const blobs = (gradient: Gradient): string => 
        btoa(JSON.stringify(gradient));

    export const string = (text: string): Gradient => 
        JSON.parse(atob(text));
}
