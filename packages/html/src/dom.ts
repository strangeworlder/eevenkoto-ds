import {
  resolveToastAria,
  type ToastIntent,
} from '@eevenkoto/core';

const TOAST_INTENTS: ToastIntent[] = ['neutral', 'info', 'success', 'caution', 'critical', 'admin'];
const toastTimers = new WeakMap<HTMLElement, ReturnType<typeof setTimeout>>();

export interface ShowToastOptions {
  text?: string;
  intent?: ToastIntent;
  durationMs?: number;
}

/**
 * Show a rendered `.eevenkoto-toast` element, optionally updating its text, intent, and auto-hide timer.
 */
export function showToast(el: HTMLElement | null | undefined, options: ShowToastOptions = {}): void {
  if (!el) return;

  const existingTimer = toastTimers.get(el);
  if (existingTimer !== undefined) {
    clearTimeout(existingTimer);
    toastTimers.delete(el);
  }

  if (options.text !== undefined) {
    const textEl = el.querySelector<HTMLElement>('.eevenkoto-toast__text');
    if (textEl) {
      textEl.textContent = options.text;
    } else {
      el.textContent = options.text;
    }
  }

  if (options.intent) {
    for (const intent of TOAST_INTENTS) {
      el.classList.toggle(`eevenkoto-toast--${intent}`, intent === options.intent);
    }
    const aria = resolveToastAria(options.intent);
    el.setAttribute('role', aria.role);
    el.setAttribute('aria-live', aria.ariaLive);
  }

  el.hidden = false;
  el.classList.remove('eevenkoto-toast--hidden');
  el.classList.add('eevenkoto-toast--visible');

  if (options.durationMs && options.durationMs > 0) {
    const timer = setTimeout(() => {
      hideToast(el);
    }, options.durationMs);
    toastTimers.set(el, timer);
  }
}

/**
 * Hide a rendered `.eevenkoto-toast` element and cancel any pending auto-hide timer.
 */
export function hideToast(el: HTMLElement | null | undefined): void {
  if (!el) return;

  const existingTimer = toastTimers.get(el);
  if (existingTimer !== undefined) {
    clearTimeout(existingTimer);
    toastTimers.delete(el);
  }

  el.classList.remove('eevenkoto-toast--visible');
  el.classList.add('eevenkoto-toast--hidden');
}

export interface SyncChipGroupState {
  /** Selected value (`single` mode) or values (`multiple` mode). */
  value?: string | string[] | null;
  /** Option values that should be marked disabled (`disabled` / `aria-disabled`). */
  disabledValues?: Iterable<string>;
}

/**
 * Synchronize selection and disabled state across chips inside a `.eevenkoto-chip-group`.
 */
export function syncChipGroup(
  el: HTMLElement | null | undefined,
  state: SyncChipGroupState,
): void {
  if (!el) return;

  const mode = el.getAttribute('data-selection-mode') ?? 'single';
  const selectedSet = new Set(
    Array.isArray(state.value)
      ? state.value
      : state.value !== undefined && state.value !== null
        ? [state.value]
        : [],
  );
  const disabledSet = new Set(state.disabledValues ?? []);

  const chips = el.querySelectorAll<HTMLElement>('.eevenkoto-chip[data-value]');
  chips.forEach((chip) => {
    const val = chip.getAttribute('data-value') ?? '';
    const isSelected = mode !== 'action' && selectedSet.has(val);
    const isDisabled = disabledSet.has(val);

    chip.classList.toggle('eevenkoto-chip--selected', isSelected);
    if (mode === 'action') {
      chip.removeAttribute('aria-pressed');
    } else if (isSelected) {
      chip.setAttribute('aria-pressed', 'true');
    } else {
      chip.removeAttribute('aria-pressed');
    }

    if (chip instanceof HTMLButtonElement) {
      chip.disabled = isDisabled;
    } else if (isDisabled) {
      chip.setAttribute('aria-disabled', 'true');
    } else {
      chip.removeAttribute('aria-disabled');
    }
  });
}

export interface SyncStepperState {
  value: number;
  min?: number;
  max?: number;
  disabled?: boolean;
}

/**
 * Synchronize displayed value and decrease/increase button disabled states on a `.eevenkoto-stepper`.
 */
export function syncStepper(el: HTMLElement | null | undefined, state: SyncStepperState): void {
  if (!el) return;

  const min = state.min ?? 0;
  const isDisabled = Boolean(state.disabled);

  el.classList.toggle('eevenkoto-stepper--disabled', isDisabled);
  if (isDisabled) {
    el.setAttribute('aria-disabled', 'true');
  } else {
    el.removeAttribute('aria-disabled');
  }

  const valueEl = el.querySelector<HTMLElement>('.eevenkoto-stepper__value');
  if (valueEl) {
    valueEl.textContent = String(state.value);
  }

  const decBtn = el.querySelector<HTMLButtonElement>('[data-role="stepper-btn"][data-dir="-1"]');
  if (decBtn) {
    decBtn.disabled = isDisabled || state.value <= min;
  }

  const incBtn = el.querySelector<HTMLButtonElement>('[data-role="stepper-btn"][data-dir="1"]');
  if (incBtn) {
    incBtn.disabled = isDisabled || (state.max !== undefined && state.value >= state.max);
  }
}

/**
 * Update the secondary description text inside a `Radio` or `Checkbox` choice control.
 */
export function updateChoiceDescription(
  inputOrWrapperEl: Element | null | undefined,
  text: string,
): void {
  if (!inputOrWrapperEl) return;

  const wrapper = inputOrWrapperEl.closest('.eevenkoto-radio, .eevenkoto-checkbox') ?? inputOrWrapperEl;
  const isCheckbox = wrapper.classList.contains('eevenkoto-checkbox');
  const descClass = isCheckbox ? 'eevenkoto-checkbox__description' : 'eevenkoto-radio__description';
  const contentClass = isCheckbox ? 'eevenkoto-checkbox__content' : 'eevenkoto-radio__content';

  let descEl = wrapper.querySelector<HTMLElement>(`.${descClass}`);
  if (!text) {
    descEl?.remove();
    return;
  }

  if (!descEl) {
    const contentEl = wrapper.querySelector<HTMLElement>(`.${contentClass}`);
    if (!contentEl) return;
    descEl = wrapper.ownerDocument.createElement('span');
    descEl.className = descClass;
    contentEl.appendChild(descEl);
  }
  descEl.textContent = text;
}
