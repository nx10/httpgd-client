import type { Httpgd } from 'httpgd';
import { writable, derived } from 'svelte/store';
import type { HttpgdPlotsResponse, HttpgdPlotId, HttpgdRendererResponse } from "httpgd/lib/types";

export const httpgd = writable<Httpgd>(null);
export const httpgd_plots = writable<HttpgdPlotsResponse>(null);
export const httpgd_selected_plot = writable<HttpgdPlotId>(null);
export const httpgd_connected = writable(false);

export const httpgd_renderers = writable<HttpgdRendererResponse[]>(null);

export const show_sidebar = writable<boolean>(true);


export const plot_width = writable<number>(600);
export const plot_height = writable<number>(400);

export const zoom_level = writable<number>(0);

const SCALE_DEFAULT: number = 1.25;
const SCALE_STEP: number = SCALE_DEFAULT / 12.0;
const SCALE_MIN: number = 0.5;

export function zoom(amount: number) {
    zoom_level.update((value) => {
        const new_level = value + amount;
        if (SCALE_DEFAULT + (new_level * SCALE_STEP) > SCALE_MIN) {
            return new_level;
        }
        return value;
    });
}

export const zoom_factor = derived(zoom_level, $zoom_level => SCALE_DEFAULT + ($zoom_level * SCALE_STEP), 0);
export const zoom_percent = derived(zoom_factor, $zoom_factor => `${Math.round(($zoom_factor / SCALE_DEFAULT) * 100)}%`, '100%');
