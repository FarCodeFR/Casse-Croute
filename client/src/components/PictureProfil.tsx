import { type ChangeEvent, useState } from "react";
import type { PictureProfilType } from "../types/UserData";

const imageProfil = [
  {
    name: "Image 1",
    image: "/assets/images/profil-images/profil.png",
  },
  {
    name: "Image 2",
    image: "/assets/images/profil-images/profil-two.png",
  },
  {
    name: "Image 3",
    image: "/assets/images/profil-images/profil-three.png",
  },
  {
    name: "Image 4",
    image: "/assets/images/profil-images/profil-four.png",
  },
];

function PictureProfil({ selectPicture, pictureChange }: PictureProfilType) {
  const [isPicture, setIsPicture] = useState(
    selectPicture || imageProfil[0].image,
  );

  const handlePictureChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newPicture = e.target.value;
    setIsPicture(newPicture);
    pictureChange(newPicture);
  };
  return (
    <section className="container-picture-profil">
      <img src={isPicture} alt="photo_profil" />
      <label htmlFor="photo_profil">Photo de profil</label>
      <select
        name="photo_profil"
        onChange={handlePictureChange}
        value={selectPicture}
      >
        {imageProfil.map((el) => {
          return (
            <option key={el.image} value={el.image}>
              {el.name}
            </option>
          );
        })}
      </select>
    </section>
  );
}

export default PictureProfil;
