import { ref, onMounted } from "vue";

export function useResponsive() {
    // Responsive state
    const isMobile = ref(false);
    const isDesktop = ref(false);

    // Setup responsive detection
    onMounted(() => {
        const updateMedia = () => {
            isMobile.value = window.innerWidth < 640;
            isDesktop.value = window.innerWidth >= 640;
        };

        // Initialize on mount
        updateMedia();

        // Add resize listener
        window.addEventListener("resize", updateMedia);

        // Clean up event listener when component unmounts
        return () => {
            window.removeEventListener("resize", updateMedia);
        };
    });

    return {
        isMobile,
        isDesktop
    };
}