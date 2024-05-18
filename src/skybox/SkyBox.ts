import { BackSide, BoxGeometry, Mesh, MeshBasicMaterial, TextureLoader } from "three";
import back from "../../assets/skybox/Daylight Box_Back.bmp";
import front from "../../assets/skybox/Daylight Box_Front.bmp";
import top from "../../assets/skybox/Daylight Box_Top.bmp";
import bottom from "../../assets/skybox/Daylight Box_Bottom.bmp";
import left from "../../assets/skybox/Daylight Box_Left.bmp";
import right from "../../assets/skybox/Daylight Box_Right.bmp";

export class SkyBox extends Mesh<BoxGeometry, MeshBasicMaterial[]> {
  constructor() {
    const materials = createMaterialArray();
    const geometry = new BoxGeometry(1000, 1000, 1000);

    super(geometry, materials);
  }
}

const createMaterialArray = () => {
  const skyboxImagePaths = [
    left,
    right,
    top,
    bottom,
    back,
    front,
  ];

  return skyboxImagePaths.map(image => {
    const texture = new TextureLoader().load(image);

    return new MeshBasicMaterial({ map: texture, side: BackSide });
  });
};
