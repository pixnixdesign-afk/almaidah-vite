import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import logo from "@/assets/logo.png";

export function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const seen = sessionStorage.getItem("almaidah.splash");
    if (seen) {
      setVisible(false);
      return;
    }
    const t = setTimeout(() => {
      sessionStorage.setItem("almaidah.splash", "1");
      setVisible(false);
    }, 1100);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[100] grid place-items-center bg-brand"
          aria-hidden
        >
          <div className="text-center">
            <motion.img
              src={logo}
              alt=""
              width={112}
              height={112}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mx-auto size-28 rounded-xl object-cover"
            />
            <p className="mt-6 font-display text-lg tracking-[0.2em] text-ink">
              PREPARING SOMETHING DELICIOUS
            </p>
            <div className="mt-3 flex justify-center gap-1.5">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="size-2 rounded-full bg-ink"
                  animate={{ y: [0, -6, 0], opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
