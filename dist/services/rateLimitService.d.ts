export declare const hit: (id: string, windowSeconds?: number, maxHits?: number) => Promise<"OK" | "BLOCKED">;
export declare const reset: (id: string) => Promise<number>;
