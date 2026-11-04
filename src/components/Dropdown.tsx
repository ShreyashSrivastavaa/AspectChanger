"use client";

import React, { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Check, ChevronDown } from "lucide-react";

export interface DropdownOption {
  value: string;
  label: string;
  /** Secondary text shown at the end of the row, e.g. a ratio. */
  hint?: string;
}

interface DropdownProps {
  label: string;
  value: string | null;
  options: DropdownOption[];
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

const MENU_GAP = 6;
const MENU_MAX_HEIGHT = 288;
const VIEWPORT_MARGIN = 12;
const MIN_MENU_WIDTH = 220;

export default function Dropdown({ label, value, options, onChange, placeholder, disabled }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [menuStyle, setMenuStyle] = useState<React.CSSProperties>({ visibility: "hidden" });
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const listId = useId();

  const selected = options.find((option) => option.value === value);

  // The menu is portalled and fixed so glass panels (backdrop-filter) can't clip it.
  const positionMenu = useCallback(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;
    const rect = trigger.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom - MENU_GAP - VIEWPORT_MARGIN;
    const spaceAbove = rect.top - MENU_GAP - VIEWPORT_MARGIN;
    const openUp = spaceBelow < Math.min(MENU_MAX_HEIGHT, 200) && spaceAbove > spaceBelow;
    const width = Math.max(rect.width, MIN_MENU_WIDTH);
    const left = Math.max(
      VIEWPORT_MARGIN,
      Math.min(rect.left, window.innerWidth - width - VIEWPORT_MARGIN)
    );
    setMenuStyle({
      left,
      width,
      maxHeight: Math.min(MENU_MAX_HEIGHT, openUp ? spaceAbove : spaceBelow),
      ...(openUp
        ? { bottom: window.innerHeight - rect.top + MENU_GAP }
        : { top: rect.bottom + MENU_GAP }),
    });
  }, []);

  useLayoutEffect(() => {
    if (open) positionMenu();
  }, [open, positionMenu]);

  useEffect(() => {
    if (!open) return;
    const handlePointerDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (!triggerRef.current?.contains(target) && !menuRef.current?.contains(target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("resize", positionMenu);
    window.addEventListener("scroll", positionMenu, true);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("resize", positionMenu);
      window.removeEventListener("scroll", positionMenu, true);
    };
  }, [open, positionMenu]);

  useEffect(() => {
    if (!open) return;
    menuRef.current?.querySelector(`[data-index="${activeIndex}"]`)?.scrollIntoView({ block: "nearest" });
  }, [open, activeIndex]);

  const openMenu = () => {
    setActiveIndex(Math.max(0, options.findIndex((option) => option.value === value)));
    setOpen(true);
  };

  const choose = (option: DropdownOption) => {
    onChange(option.value);
    setOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
        e.preventDefault();
        openMenu();
      }
      return;
    }
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((i) => Math.min(options.length - 1, i + 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((i) => Math.max(0, i - 1));
        break;
      case "Home":
        e.preventDefault();
        setActiveIndex(0);
        break;
      case "End":
        e.preventDefault();
        setActiveIndex(options.length - 1);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (options[activeIndex]) choose(options[activeIndex]);
        break;
      case "Escape":
        e.preventDefault();
        setOpen(false);
        break;
      case "Tab":
        setOpen(false);
        break;
    }
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        role="combobox"
        aria-label={label}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        aria-activedescendant={open ? `${listId}-${activeIndex}` : undefined}
        disabled={disabled}
        onClick={() => (open ? setOpen(false) : openMenu())}
        onKeyDown={handleKeyDown}
        className={`w-full min-w-0 flex items-center justify-between gap-2 px-3 py-2 rounded-xl glass-pill text-xs text-start text-[var(--text-main)] outline-none focus-visible:ring-2 focus-visible:ring-[#c89c6e]/60 disabled:opacity-50 disabled:cursor-not-allowed ${
          open ? "ring-2 ring-[#c89c6e]/40" : ""
        }`}
      >
        <span className={`truncate font-medium ${selected ? "" : "text-[var(--text-muted)]"}`}>
          {selected?.label ?? placeholder ?? label}
        </span>
        <span className="flex items-center gap-1.5 flex-shrink-0">
          {selected?.hint && (
            <span className="font-mono text-[10px] text-[var(--text-muted)]">{selected.hint}</span>
          )}
          <ChevronDown
            className={`w-3.5 h-3.5 text-[var(--text-muted)] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </span>
      </button>

      {open &&
        createPortal(
          <div
            ref={menuRef}
            id={listId}
            role="listbox"
            aria-label={label}
            style={menuStyle}
            onMouseDown={(e) => e.preventDefault()}
            className="fixed z-[60] overflow-y-auto overscroll-contain p-1.5 rounded-2xl border border-[var(--color-glass-border)] bg-[rgba(255,255,255,0.97)] dark:bg-[rgba(24,21,19,0.98)] backdrop-blur-xl shadow-[0_20px_50px_-12px_rgba(60,45,30,0.35)] dark:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.75)]"
          >
            {options.map((option, index) => {
              const isSelected = option.value === value;
              return (
                <div
                  key={option.value}
                  id={`${listId}-${index}`}
                  data-index={index}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => choose(option)}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={`flex items-center justify-between gap-3 px-3 py-2 rounded-xl text-xs cursor-pointer transition-colors ${
                    isSelected ? "text-[var(--accent-text)] font-semibold" : "text-[var(--text-main)]"
                  } ${
                    index === activeIndex
                      ? isSelected
                        ? "bg-[#c89c6e]/20"
                        : "bg-black/5 dark:bg-white/10"
                      : isSelected
                        ? "bg-[#c89c6e]/10"
                        : ""
                  }`}
                >
                  <span className="truncate">{option.label}</span>
                  <span className="flex items-center gap-2 flex-shrink-0">
                    {option.hint && (
                      <span className="font-mono text-[10px] font-normal text-[var(--text-muted)]">{option.hint}</span>
                    )}
                    {isSelected && <Check className="w-3.5 h-3.5" />}
                  </span>
                </div>
              );
            })}
          </div>,
          document.body
        )}
    </>
  );
}
