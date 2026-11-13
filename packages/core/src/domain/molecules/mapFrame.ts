export interface MapFrameProps {
  /** Optional DOM element `id` on `<figure>`. */
  id?: string;
  /** Map title shown in the header. */
  title?: string;
  /** Scale label shown beside the title (e.g. `'1 ruutu = 5 jalkaa'`). */
  scale?: string;
  /** Trusted inline SVG markup for the map. Takes precedence over `src`. */
  svgHtml?: string;
  /** Raster/vector image URL used when `svgHtml` is omitted. */
  src?: string;
  /** Alt text for `src`; also the accessible name of inline SVG maps. */
  alt?: string;
  /** Plain caption. */
  caption?: string;
  /** Trusted inline HTML caption. Takes precedence over `caption`. */
  captionHtml?: string;
}

export const mapFrameClassNames = (): string => 'eevenkoto-map-frame';
