import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import Timer from "./ui/molecules/Timer";

interface FormData {
  firstName: string;
  lastName: string;
  image: FileList;
}

interface CauseOfDeathFormData {
  causeOfDeath: string;
}

interface DeathDetailsFormData {
  deathDetails: string;
}

const App = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const {
    register: registerCauseOfDeath,
    handleSubmit: handleSubmitCauseOfDeath,
  } = useForm<CauseOfDeathFormData>();
  const {
    register: registerDeathDetails,
    handleSubmit: handleSubmitDeathDetails,
  } = useForm<DeathDetailsFormData>();

  const [showCauseOfDeathForm, setShowCauseOfDeathForm] = useState(false);
  const [showDeathDetailsForm, setShowDeathDetailsForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log("🚀 ~ App ~ data:", data);
    setIsLoading(true);
    setTimeout(() => {
      setShowCauseOfDeathForm(true);
      setIsLoading(false);
    }, 1000);
  };

  const onSubmitCauseOfDeath: SubmitHandler<CauseOfDeathFormData> = (data) => {
    console.log("🚀 ~ App ~ data:", data);

    setTimeout(() => {
      setShowCauseOfDeathForm(false);
      setShowDeathDetailsForm(true);
    }, 1000);
  };

  const onSubmitDeathDetails: SubmitHandler<DeathDetailsFormData> = (data) => {
    console.log("🚀 ~ App ~ data:", data);

    setTimeout(() => {
      setShowDeathDetailsForm(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 h-screen">
      {showCauseOfDeathForm && (
        <Timer
          initialMinutes={0}
          initialSeconds={40}
          onTimerEnd={handleSubmitCauseOfDeath(onSubmitCauseOfDeath)}
        />
      )}

      {showDeathDetailsForm && (
        <Timer
          initialMinutes={6}
          initialSeconds={40}
          onTimerEnd={handleSubmitDeathDetails(onSubmitDeathDetails)}
        />
      )}

      {!showCauseOfDeathForm && !showDeathDetailsForm && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="md:w-[450px] bg-dnGray p-4 flex flex-col gap-4 rounded-xl"
        >
          <label htmlFor="firstName">Nombre</label>
          <input
            type="text"
            id="firstName"
            className="bg-dnBlack text-dnWhite p-2 rounded-md focus:outline-none"
            {...register("firstName", { required: true })}
            placeholder="Nombre de la victima..."
            aria-invalid={!!errors.firstName}
          />
          {errors.firstName && (
            <p className="text-dnRed text-sm">*Este campo es requerido</p>
          )}
          <label htmlFor="lastName">Apellido</label>
          <input
            type="text"
            id="lastName"
            className="bg-dnBlack text-dnWhite p-2 rounded-md focus:outline-none"
            {...register("lastName", { required: true })}
            placeholder="Apellido de la victima..."
            aria-invalid={!!errors.lastName}
          />
          {errors.lastName && (
            <p className="text-dnRed text-sm">*Este campo es requerido</p>
          )}
          <label htmlFor="image">Imagen</label>
          <input
            type="file"
            multiple={false}
            className="bg-dnBlack text-dnWhite p-2 rounded-md focus:outline-none cursor-pointer"
            {...register("image", {
              required: true,
              validate: (value: FileList) => {
                if (!value) return "Este campo es requerido";

                const acceptedTypes = ["image/jpeg", "image/png"];
                const fileType = value[0].type;
                return !acceptedTypes.includes(fileType)
                  ? "Solo se aceptan formatos JPG y PNG"
                  : true;
              },
            })}
            accept="image/*"
            aria-invalid={!!errors.image}
            id="image"
          />
          {errors.image && (
            <p className="text-dnRed text-sm" id="image-error">
              {errors.image.message}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="bg-dnRed hover:bg-dnDarkRed text-dnWhite p-2 rounded-md cursor-pointer"
          >
            {isLoading ? "Cargando..." : "Registrar"}
          </button>
        </form>
      )}

      {showCauseOfDeathForm && (
        <form
          onSubmit={handleSubmitCauseOfDeath(onSubmitCauseOfDeath)}
          className="md:w-[450px] bg-dnGray p-4 flex flex-col gap-4 rounded-xl"
        >
          <label htmlFor="causeOfDeath">Causa de muerte</label>
          <textarea
            id="causeOfDeath"
            className="bg-dnBlack text-dnWhite p-2 rounded-md focus:outline-none"
            placeholder="Causa de muerte..."
            {...registerCauseOfDeath("causeOfDeath", {
              value: "Ataque al corazón",
            })}
          />

          <button
            type="submit"
            className="bg-dnRed hover:bg-dnDarkRed text-dnWhite p-2 rounded-md cursor-pointer"
          >
            Registrar
          </button>
        </form>
      )}

      {showDeathDetailsForm && (
        <form
          onSubmit={handleSubmitDeathDetails(onSubmitDeathDetails)}
          className="md:w-[450px] bg-dnGray p-4 flex flex-col gap-4 rounded-xl"
        >
          <label htmlFor="deathDetails">Detalles de la muerte</label>
          <textarea
            id="deathDetails"
            className="bg-dnBlack text-dnWhite p-2 rounded-md focus:outline-none"
            placeholder="Detalles de la muerte..."
            {...registerDeathDetails("deathDetails")}
          />

          <button
            type="submit"
            className="bg-dnRed hover:bg-dnDarkRed text-dnWhite p-2 rounded-md cursor-pointer"
          >
            Registrar
          </button>
        </form>
      )}
    </div>
  );
};

export default App;
