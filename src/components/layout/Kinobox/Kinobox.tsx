import { useEffect, useRef } from "react";

const KinoboxPlayer = ({ kinopoiskId }: { kinopoiskId: string }) => {
  const kinoboxContainerRef = useRef(null);

  useEffect(() => {
    if (kinoboxContainerRef.current) {
      new window.Kinobox(kinoboxContainerRef.current, {
        search: {
          kinopoisk: kinopoiskId,
        },
        players: {},
      }).init();
    }
  }, [kinopoiskId]);

  return <div ref={kinoboxContainerRef} className="kinobox_player rounded-md mx-auto mt-4 max-w-[1440px]"></div>;
};

export default KinoboxPlayer;
