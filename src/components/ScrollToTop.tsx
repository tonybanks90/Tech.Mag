import { useEffect } from "react";
import { useLocation } from "wouter";

export default function ScrollToTop() {
    const [pathname] = useLocation();

    useEffect(() => {
        // Retrieve the current history state
        const state = window.history.state;
        // If this navigation was triggered by infinite scroll, do NOT scroll to top
        if (state && state.isInfiniteScroll) {
            return;
        }
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}
