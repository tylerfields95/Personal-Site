import { Component, Input, Output, EventEmitter, computed, inject, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgxsmkDatepickerComponent } from 'ngxsmk-datepicker';
import { Theme } from '../../services/theme';

@Component({
  selector: 'app-date-picker',
  imports: [NgxsmkDatepickerComponent],
  template: `
    <ngxsmk-datepicker
      [mode]="mode"
      [value]="value"
      (valueChange)="onValueChange($event)"
      [classes]="datePickerClasses"
      [placeholder]="placeholder"
    ></ngxsmk-datepicker>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePicker),
      multi: true,
    },
  ],
})
export class DatePicker implements ControlValueAccessor {
  private readonly themeService = inject(Theme);

  @Input() mode: 'single' | 'range' | 'multiple' = 'single';
  @Input() placeholder = 'Select date';
  @Input() value: Date | { start: Date; end: Date } | Date[] | null = null;
  @Output() valueChange = new EventEmitter<Date | { start: Date; end: Date } | Date[] | null>();

  // Compute datepicker theme from app theme
  datePickerTheme = computed(() => (this.themeService.isDarkTheme() ? 'dark' : 'light'));

  datePickerClasses = {
    inputGroup: 'rounded-lg border border-theme-tertiary bg-theme-secondary',
    input:
      'px-3 py-2 text-sm text-theme-primary-text bg-theme-secondary placeholder:text-theme-secondary-text',
    popover: 'bg-theme-secondary border border-theme-tertiary rounded-lg shadow-lg z-[9999]',
    dayCell: 'hover:bg-theme-tertiary text-theme-primary-text',
    todayCell: 'border border-accent',
    selectedCell: 'bg-accent text-white',
    footer: 'flex justify-end gap-2 px-4 py-3 border-t border-theme-tertiary',
    clearBtn:
      'px-3 py-2 text-sm text-theme-secondary-text hover:bg-theme-tertiary rounded transition-all',
    closeBtn: 'px-3 py-2 text-sm bg-accent text-white hover:bg-accent-muted rounded transition-all',
  };

  // ControlValueAccessor implementation
  private onChange: (value: Date | { start: Date; end: Date } | Date[] | null) => void = () => {};
  private onTouched: () => void = () => {};

  onValueChange(value: Date | { start: Date; end: Date } | Date[] | null): void {
    this.value = value;
    this.valueChange.emit(value);
    this.onChange(value);
    this.onTouched();
  }

  writeValue(value: Date | { start: Date; end: Date } | Date[] | null): void {
    this.value = value;
  }

  registerOnChange(fn: (value: Date | { start: Date; end: Date } | Date[] | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Handle disabled state if needed
  }
}
