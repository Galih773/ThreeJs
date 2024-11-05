import { Stage, Layer, Image } from "react-konva";
import useImage from "use-image";
import { useSnapshot } from "valtio";
import state from "../store";

const LogoPositioner = () => {
  const snap = useSnapshot(state);
  const [image] = useImage(snap.logoDecal);

  // Tentukan ukuran dari stage
  const stageWidth = 300;
  const stageHeight = 300;

  // Faktor skala untuk menghubungkan ukuran `Konva` dan model 3D
  const scaleFactor = 0.01; // Ini bisa diubah sesuai dengan skala antara `Stage` di Konva dan model 3D

  const handleDragEnd = (e) => {
    console.log(e.target.x(), e.target.y());
    // Normalisasi posisi untuk diterapkan ke model 3D
    let normalizedX = (e.target.x() - stageWidth / 2) * scaleFactor; // Geser titik tengah dan kalikan dengan faktor skala
    let normalizedY = -(e.target.y() - stageHeight / 2) * scaleFactor; // Invers y agar sesuai dengan koordinat Three.js
    const normalizedZ = -0.09; // Tetapkan Z sebagai nilai tetap agar tetap menempel di permukaan kaos

    // Batasan maksimum dan minimum untuk X dan Y
    const maxCoordinate = 0.25;
    const minCoordinate = -0.25;

    // Membatasi nilai normalizedX dan normalizedY agar tetap di dalam rentang -0.2 hingga 0.2
    normalizedX = Math.max(minCoordinate, Math.min(maxCoordinate, normalizedX));
    normalizedY = Math.max(minCoordinate, Math.min(maxCoordinate, normalizedY));

    console.log(normalizedX, normalizedY);
    // Update posisi logo di state dengan nilai yang sudah dinormalisasi
    state.logoPosition = {
      x: normalizedX,
      y: normalizedY,
      z: normalizedZ,
    };
  };

  const imageX = stageWidth / 2 + snap.logoPosition.x / scaleFactor;
  const imageY = stageHeight / 2 - snap.logoPosition.y / scaleFactor;

  return (
    <div className="absolute left-full ml-3 glassmorphism rounded-md">
      <Stage width={stageWidth} height={stageHeight}>
        <Layer>
          <Image
            image={image}
            x={imageX}
            y={imageY}
            width={stageWidth * 0.1} // Membuat gambar lebih kecil dari stage
            height={stageHeight * 0.1} // Membuat gambar lebih kecil dari stage
            draggable
            onDragEnd={handleDragEnd}
          />
        </Layer>
      </Stage>
    </div>
  );
};

export default LogoPositioner;
