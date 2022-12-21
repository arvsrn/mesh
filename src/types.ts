export interface Blob {
    position: number[];
    color: string;
    blending: string;
    radius: number;
}

export interface Gradient {
    blur: number,
    background: string,
    blobs: Blob[],
}