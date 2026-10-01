/* Easing, taken from airfieldlacaminera.com's stylesheet. The CSS twins are --ease-* in app/globals.css. */

// Their large moves (menu curtain, slide insets, image reveals): transition .6s cubic-bezier(.625,.05,0,1).
export const EASE_MOVE = "0.625,0.05,0,1";
// Their button hovers: background/colour .4s cubic-bezier(.125,.425,.27,1).
export const EASE_HOVER = "0.125,0.425,0.27,1";
// Text and card reveals: a plain ease-out, as their "transition: all .4s ease-out" fades.
export const EASE_OUT = "0.22,0.61,0.36,1";
