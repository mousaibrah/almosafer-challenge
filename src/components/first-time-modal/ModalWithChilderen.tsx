import clsx from "clsx";
import { AnimatePresence, motion, Variants } from "framer-motion";
import React, { createContext } from "react";

// Context
const ModalContext = createContext<{ onClose: () => void } | null>(null);

// Variants
const overlayVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalVariants: Variants = {
  initial: { scale: 0.95, opacity: 0, y: 50 },
  animate: { scale: 1, opacity: 1, y: 0 },
  exit: { scale: 0.95, opacity: 0, y: 50 },
};

// Sizes
const sizeClasses: Record<
  "extraSmall" | "small" | "medium" | "large" | "fit",
  string
> = {
  extraSmall:
    "max-w-[90vw] sm:max-w-[70vw] md:max-w-[55vw] lg:max-w-[40vw] xl:max-w-[30vw] max-h-[70vh] min-h-[20vh]",
  small:
    "max-w-[90vw] sm:max-w-[70vw] md:max-w-[55vw] lg:max-w-[40vw] xl:max-w-[30vw] max-h-[70vh] min-h-[30vh]",
  medium: "sm:max-w-[40vw] max-h-[50vh] min-h-[80vh]",
  large: "max-w-[85vw] max-h-[85vh] min-h-[85vh]",
  fit: "w-32 max-w-fit",
};

// border radius
const borderRadiusClasses: Record<
  "none" | "sm" | "md" | "lg" | "xl" | "full",
  string
> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
};

// Modal root
const Modal = ({
  open,
  onClose,
  children,
  size = "small",
  borderRadius = "none",
  showOverlay = true,
  showCloseButton = true,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: keyof typeof sizeClasses;
  showOverlay?: boolean;
  showCloseButton?: boolean;
  borderRadius?: keyof typeof borderRadiusClasses;
}) => {
  const handleClickOutside = () => {
    onClose();
  };

  const handleClickInside = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <AnimatePresence>
      {open && (
        <ModalContext.Provider value={{ onClose }}>
          <motion.div
            className="fixed inset-0 z-[75] flex items-center justify-center p-4 overflow-y-auto no-scrollbar"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={overlayVariants}
            onClick={handleClickOutside}
          >
            {showOverlay && (
              <motion.div
                className="fixed inset-0 bg-navyBlue-100/10 backdrop-blur-xs"
                variants={overlayVariants}
                transition={{ duration: 1 }}
              />
            )}

            <motion.div
              className={clsx(
                "relative w-full mx-auto bg-white  shadow-lg overflow-scroll scroll-smooth no-scrollbar text-primary flex flex-col justify-between",
                sizeClasses[size],
                borderRadiusClasses[borderRadius]
              )}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={modalVariants}
              transition={{ type: "spring", duration: 1.5 }}
              onClick={handleClickInside}
            >
              {showCloseButton && (
                <button
                  onClick={onClose}
                  className="absolute top-4 end-4 text-primary hover:text-primary/50 transition-colors  rounded-full p-2 duration-300"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
              {children}
            </motion.div>
          </motion.div>
        </ModalContext.Provider>
      )}
    </AnimatePresence>
  );
};

// Compound parts
const ModalHeader = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={clsx(
      "px-6 pt-6 pb-2 border-b dark:border-gray-700 text-primary font-bold",
      className
    )}
  >
    {children}
  </div>
);
ModalHeader.displayName = "Modal.Header";
Modal.Header = ModalHeader;

const ModalContent = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={clsx("px-6 py-4", className)}>{children}</div>;
ModalContent.displayName = "Modal.Content";
Modal.Content = ModalContent;

const ModalFooter = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={clsx(
      "px-6 pt-2 pb-6 border-t dark:border-gray-700 flex justify-end gap-2",
      className
    )}
  >
    {children}
  </div>
);
ModalFooter.displayName = "Modal.Footer";
Modal.Footer = ModalFooter;

export { Modal };
