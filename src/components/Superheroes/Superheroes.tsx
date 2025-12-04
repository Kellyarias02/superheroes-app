import * as React from "react";
import s from "./Superheroes.module.css";
import { useAuth } from "../../contexts/authContext";

interface Superhero {
  id: number;
  name: string;
  slug: string;
  powerstats: {
    intelligence: number;
    strength: number;
    speed: number;
    durability: number;
    power: number;
    combat: number;
  };
  appearance: {
    gender: string;
    race: string;
    height: string[];
    weight: string[];
    eyeColor: string;
    hairColor: string;
  };
  biography: {
    fullName: string;
    alterEgos: string;
    aliases: string[];
    placeOfBirth: string;
    firstAppearance: string;
    publisher: string;
    alignment: string;
  };
  work: {
    occupation: string;
    base: string;
  };
  connections: {
    groupAffiliation: string;
    relatives: string;
  };
  images: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
  };
}

const Superheroes: React.FC = () => {
  const { token, logout } = useAuth();
  const [heroes, setHeroes] = React.useState<Superhero[]>([]);
  const [status, setStatus] = React.useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = React.useState<string | null>(null);

  const [selectedHero, setSelectedHero] = React.useState<Superhero | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [loadingModal, setLoadingModal] = React.useState(false);

  const [page, setPage] = React.useState(1);
  const [size, setSize] = React.useState(10);

  const [pagination, setPagination] = React.useState({
    length: 0,
    size: 10,
    page: 1,
    firstPage: 1,
    lastPage: 1,
  });

  React.useEffect(() => {
    const fetchHeroes = async () => {
      setStatus("loading");
      setError(null);

      try {
        const response = await fetch(
          `https://ea1w717ym2.execute-api.us-east-1.amazonaws.com/api/heroes?page=${page}&size=${size}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          if (response.status === 401) {
            // Si el token es inválido, cerramos la sesión.
            logout();
            return;
          }
          throw new Error(`Error al obtener superhéroes: ${response.statusText}`);
          setStatus("error");
          return;
        }

        const data = await response.json();

        if (Array.isArray(data.items)) {
          setHeroes(data.items);
        } else {
          setHeroes([]);
        }

        setPagination({
          length: data.length,
          size: data.size,
          page: data.page,
          firstPage: data.firstPage,
          lastPage: data.lastPage,
        });

        setStatus("idle");
      } catch (err) {
        setError(
          `Error en la solicitud: ${
            err instanceof Error ? err.message : "Error desconocido"
          }`
        );
        setStatus("error");
      }
    };

    fetchHeroes();
  }, [page, token, logout]);

  //Modales para detalles del héroe
  const openHeroModal = async (id: number) => {
    setLoadingModal(true);
    setIsModalOpen(true);

    try {
      const res = await fetch(
        `https://ea1w717ym2.execute-api.us-east-1.amazonaws.com/api/hero?id=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.ok) {
        throw new Error(`Error al cargar los detalles del héroe: ${res.statusText}`);
      }
      const data = await res.json();
      setSelectedHero(data);
    } catch (error) {
      console.error("Error cargando detalles:", error);
    } finally {
      setLoadingModal(false);
    }
  };

  if (status === "loading")
    return <div className={s.loading}>Cargando superhéroes...</div>;

  if (status === "error")
    return <div className={s.error}>Error: {error}</div>;

  return (
    <div className={s.wrapper}>
      <h1 className={s.title}>Lista de Superhéroes</h1>

      <div className={s.grid}>
  {heroes.map((hero) => {
    // Calculo del poder que sobresale
    const powerStats = hero.powerstats;
    const maxPowerValue = Math.max(...Object.values(powerStats));
    const maxPowerKey = Object.keys(powerStats).find(
      (key) => (powerStats as any)[key] === maxPowerValue
    );

    return (
      <div
        key={hero.id}
        className={s.card}
        onClick={() => openHeroModal(hero.id)}
      >
        <img src={hero.images.md} alt={hero.name} className={s.image} />
        <h2 className={s.name}>{hero.name}</h2>

        <p className={s.appearance}>Género: {hero.appearance.gender}</p>

        <p className={s.publisher}>
          Editorial: {hero.biography.publisher || "Desconocida"}
        </p>

        <p className={s.powerstats}>
          Poder sobresaliente: {maxPowerKey} ({maxPowerValue})
        </p>
      </div>
    );
  })}
</div>


  
      <div className={s.pagination}>
        <button
          disabled={page === pagination.firstPage}
          onClick={() => setPage(page - 1)}
        >
          ⬅ Anterior
        </button>

        <span>
          Página {pagination.page} de {pagination.lastPage}
        </span>

        <button
          disabled={page === pagination.lastPage}
          onClick={() => setPage(page + 1)}
        >
          Siguiente ➜
        </button>
      </div>

   
      {isModalOpen && (
        <div className={s.modalOverlay}>
          <div className={s.modal}>
            {loadingModal ? (
              <p>Cargando detalles...</p>
            ) : selectedHero ? (
              <>
                <button
                  className={s.closeBtn}
                  onClick={() => setIsModalOpen(false)}
                >
                  ✖
                </button>

                <h2>{selectedHero.name}</h2>
                <img
                  src={selectedHero.images.lg}
                  className={s.modalImage}
                  alt={selectedHero.name}
                />

                <div className={s.detailItem}>
                  <strong>Nombre completo:</strong> {selectedHero.biography.fullName || "No disponible"}
                </div>
                <div className={s.detailItem}>
                  <strong>Editorial:</strong> {selectedHero.biography.publisher}
                </div>
                <div className={s.detailItem}>
                  <strong>Primera aparición:</strong> {selectedHero.biography.firstAppearance}
                </div>
                <div className={s.detailItem}>
                  <strong>Lugar de nacimiento:</strong> {selectedHero.biography.placeOfBirth}
                </div>
                <div className={s.detailItem}>
                  <strong>Altura:</strong> {selectedHero.appearance.height.join(" / ")}
                </div>
                <div className={s.detailItem}>
                  <strong>Peso:</strong> {selectedHero.appearance.weight.join(" / ")}
                </div>
                <div className={s.detailItem}>
                  <strong>Color de ojos:</strong> {selectedHero.appearance.eyeColor}
                </div>
                <div className={s.detailItem}>
                  <strong>Color de cabello:</strong> {selectedHero.appearance.hairColor}
                </div>
                <div className={s.detailItem}>
                  <strong>Ocupación:</strong> {selectedHero.work.occupation}
                </div>
              </>
            ) : (
              <p>No se encontraron detalles.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Superheroes;
