import {MutableRefObject, useRef, useState, useCallback} from "react";

interface PopoverController<T> {
  anchorRef: MutableRefObject<T | null>
  handleOpen: () => void
  handleClose: () => void
  handleToggle: () => void
  open: boolean
}

export function usePopover<T = HTMLElement>(): PopoverController<T> {
  const anchorRef = useRef<T>(null)
  const [open, setOpen] = useState<boolean>(false)

  const handleOpen = useCallback(() => {
    setOpen(true)
  }, [])

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [])

  const handleToggle = useCallback(() => {
    setOpen(prevState => !prevState)
  }, [])

  return {
    anchorRef,
    handleOpen,
    handleClose,
    handleToggle,
    open
  }
}
