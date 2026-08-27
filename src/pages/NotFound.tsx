import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404: user attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-tx-bg px-6 text-center text-tx-fg">
      <span className="font-display text-[11px] tx-tracking text-tx-muted">
        ERROR / 404
      </span>
      <h1 className="font-display mt-4 text-6xl uppercase sm:text-8xl">
        Off course
      </h1>
      <p className="mt-4 max-w-sm text-sm text-tx-muted">
        That trajectory doesn&rsquo;t exist. Head back to the performance
        field.
      </p>
      <a
        href="/"
        className="group relative mt-10 overflow-hidden border border-tx-fg/30 px-10 py-3 font-display text-xs tx-tracking uppercase text-tx-fg transition-colors hover:border-tx-accent"
      >
        <span className="relative z-10 transition-colors group-hover:text-tx-bg">
          Return to TempoX
        </span>
        <span className="absolute inset-0 origin-bottom scale-y-0 bg-tx-accent transition-transform duration-300 ease-out group-hover:scale-y-100" />
      </a>
    </div>
  );
};

export default NotFound;
