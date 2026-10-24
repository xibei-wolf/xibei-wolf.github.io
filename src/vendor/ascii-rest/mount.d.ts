import type { Options, Piece } from "./types";
/**
 * The piece's option overrides, `fps` to override its frame rate, and `motion`
 * to play even when the reader prefers reduced motion: only for a page that
 * offers its own control, such as a play button the reader presses.
 */
export type MountOptions = Options & {
    fps?: number;
    motion?: boolean;
};
/**
 * The piece in a module a page imported, as <ascii-art src> imports one: its default export when that is a piece, as a
 * kit file's `export default sea()` is, or else the module itself when it exports meta and a default function, as the
 * library's pieces do. Throws, saying so, for a module with neither.
 */
export declare function pieceIn(mod: unknown, from: string): Piece;
export declare function mount(el: HTMLElement, piece: Piece | Piece["default"], options?: MountOptions): () => void;
