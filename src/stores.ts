import type { Httpgd } from 'httpgd';
import { writable } from 'svelte/store';
import type { HttpgdPlotsResponse, HttpgdPlotId } from "httpgd/lib/types";

export const httpgd = writable<Httpgd>(null);
export const plots = writable<HttpgdPlotsResponse>(null);
export const selected_plot = writable<HttpgdPlotId>(null);